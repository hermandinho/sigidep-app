import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParagraphModel } from '@models/paragraph.model';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { TranslateService } from '@ngx-translate/core';
import { GetParagraphs, GetReferencePhysicalUnits } from '@store/actions';
import { ReferencePhysicalUnitModel } from '@models/reference-physical-unit.model';
import { getDataSelector as paragraphsSelector } from '@reducers/paragraphs.reducer';

@Component({
  selector: 'app-create-reference-physical-units-form',
  templateUrl: './create-reference-physical-units-form.component.html',
  styleUrls: ['./create-reference-physical-units-form.component.scss'],
})
export class CreateReferencePhysicalUnitsFormComponent
  extends BaseComponent
  implements OnInit
{
  public form!: FormGroup;
  public paragraphs!: ParagraphModel[];
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
        {
          value: undefined,
          disabled: true,
        },
        [],
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      id: [undefined, []],
      paragraphId: [undefined, [Validators.required]],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this._store.dispatch(GetParagraphs());
    if (this.config.data?.item) {
      const { id, labelFr, labelEn, paragraph, code } = this.config.data
        ?.item as ReferencePhysicalUnitModel;
      this.form.patchValue({
        id,
        labelFr,
        labelEn,
        paragraphId: paragraph && paragraph.id,
        code,
      });

      this.form
        .get('paragraphId')
        ?.valueChanges?.pipe(this.takeUntilDestroy)
        ?.subscribe((id) => {
          const paragraph = this.paragraphs?.find((p) => +p.id === +id);
          if (paragraph) {
            const code = this.form?.get('code')?.value;
            const start = code?.slice(0, code?.length - 2);
            // const end = code?.slice(-2);
            this.form?.patchValue({
              code: code?.replace(start, paragraph.code),
            });
          }
        });
    }

    this._store
      .pipe(this.takeUntilDestroy, select(paragraphsSelector))
      .subscribe((data) => {
        this.paragraphs = (data ?? [])
          .filter(
            (p) =>
              p.nature.abbreviationFr?.toLowerCase()?.includes('bip') ||
              p.nature.abbreviationEn?.toLowerCase()?.includes('pib')
          )
          .map((item) => new ParagraphModel(item));
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
      .post<ParagraphModel>('/reference-physical-units', {
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetReferencePhysicalUnits());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.referencePhysicalUnits.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.referencePhysicalUnits.conflict';
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
