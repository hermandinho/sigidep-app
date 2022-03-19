import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { GetPiecesJointes } from '@actions/piece-jointe.actions';
import { PieceJointeModel } from '@models/piece-jointe.model';

@Component({
  selector: 'app-create-piece-jointe-form',
  templateUrl: './create-piece-jointe-form.component.html',
  styleUrls: ['./create-piece-jointe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePieceJointeFormComponent
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
      code: [undefined, Validators.required],
      order: [undefined, [Validators.required, Validators.min(1)]],
      label: [undefined, Validators.required],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, order, label } = this.config.data
        ?.item as PieceJointeModel;
      this.form.patchValue({
        id,
        code,
        order,
        label,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedPieceJointe = {
      ...this.form.value,
    } as PieceJointeModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<PieceJointeModel>('/pieces-jointes', editedPieceJointe)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetPiecesJointes());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.piecesJointes.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.piecesJointes.notfound';
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
        .post<PieceJointeModel>('/pieces-jointes', editedPieceJointe)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetPiecesJointes());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.piecesJointes.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.piecesJointes.conflict';
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
