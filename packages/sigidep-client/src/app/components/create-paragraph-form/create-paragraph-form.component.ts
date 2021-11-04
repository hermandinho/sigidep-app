import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { getDataSelector as financialSourcesSelector } from '@reducers/financial-sources.reducer';
import { GetFinancialSources, GetParagraphs } from '@store/actions';
import { BaseComponent } from '@components/base.component';
import { ParagraphModel } from '@models/paragraph.model';
import { FinancialSourceModel } from '@models/financial-source.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-paragraph-form',
  templateUrl: './create-paragraph-form.component.html',
  styleUrls: ['./create-paragraph-form.component.scss'],
})
export class CreateParagraphFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public natures!: FinancialSourceModel[];
  public busy = false;

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    public _translateService: TranslateService
  ) {
    super();
    this.form = this._fb.group({
      code: [
        undefined,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      abbreviationFr: [undefined, [Validators.required]],
      abbreviationEn: [undefined, [Validators.required]],
      id: [undefined, []],
      financialSourceId: [undefined, [Validators.required]],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this._store.dispatch(GetFinancialSources());
    if (this.config.data?.item) {
      const {
        id,
        labelFr,
        labelEn,
        abbreviationFr,
        abbreviationEn,
        nature,
        code,
      } = this.config.data?.item as ParagraphModel;
      this.form.patchValue({
        id,
        labelFr,
        labelEn,
        abbreviationFr,
        abbreviationEn,
        financialSourceId: nature && nature.id,
        code,
      });
    }

    this._store
      .pipe(this.takeUntilDestroy, select(financialSourcesSelector))
      .subscribe((data) => {
        this.natures = (data ?? []).map(
          (item) => new FinancialSourceModel(item)
        );
      });
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;

    if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    }
    this._apisService
      .post<ParagraphModel>('/paragraphs', {
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetParagraphs());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.paragraphs.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.paragraphs.conflict';
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
