import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';

import { CategorieAgentModel } from '@models/categorie-agent.model';
import { GetCategoriesAgents } from '@actions/categorie-agent.actions';

@Component({
  selector: 'app-categorie-agent-form',
  templateUrl: './categorie-agent-form.component.html',
  styleUrls: ['./categorie-agent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorieAgentFormComponent
  extends BaseComponent
  implements OnInit
{
  loading$: Observable<boolean> = of(true);
  public form: FormGroup;

  public busy = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      id: [],
      code: [
        undefined,
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
      description: [undefined],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, description } = this.config.data
        ?.item as CategorieAgentModel;
      this.form.patchValue({
        id,
        code,
        description,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedCategorie = {
      ...this.form.value,
    } as CategorieAgentModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<CategorieAgentModel>('/categories-agents', editedCategorie)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetCategoriesAgents());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.categories.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.categories.notfound';
            } else {
              err = 'errors.unknown';
            }
            this.busy = false;
            this._appService.showToast({
              detail: err,
              summary: 'errors.error',
              severity: 'error',
              life: 5000,
              closable: true,
            });
          }
        );
    } else {
      this._apisService
        .post<CategorieAgentModel>('/categories-agents', editedCategorie)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetCategoriesAgents());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.categories.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.categories.conflict';
            } else {
              err = 'errors.unknown';
            }
            this.busy = false;
            this._appService.showToast({
              detail: err,
              summary: 'errors.error',
              severity: 'error',
              life: 5000,
              closable: true,
            });
          }
        );
    }
  }
}
