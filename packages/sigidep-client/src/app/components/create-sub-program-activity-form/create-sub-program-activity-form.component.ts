import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseComponent } from '@components/base.component';
import { IFormFiledElt } from '@components/create-sub-program-form/create-sub-program-form.component';
import { measurementUnits } from '@components/create-sub-program-objective-indicator-form/create-sub-program-objective-indicator-form.component';
import { ApisService } from '@services/apis.service';
import { SubProgramActivityModel } from '@models/sub-program.model';
import { AppService } from '@services/app.service';
import { GetSubPrograms } from '@store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';

@Component({
  selector: 'app-create-sub-program-activity-form',
  templateUrl: './create-sub-program-activity-form.component.html',
  styleUrls: ['./create-sub-program-activity-form.component.scss'],
})
export class CreateSubProgramActivityFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public formElements: IFormFiledElt[] = [];

  public measurementUnits = measurementUnits;
  public busy = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _apisService: ApisService,
    private _appService: AppService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined, []],
      code: [
        undefined,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      presentationFr: [undefined, [Validators.required]],
      presentationEn: [undefined, [Validators.required]],
      objectivesFr: [undefined, [Validators.required]],
      objectivesEn: [undefined, [Validators.required]],
      resultsFr: [undefined, [Validators.required]],
      resultsEn: [undefined, [Validators.required]],
      indicatorsFr: [undefined, [Validators.required]],
      indicatorsEn: [undefined, [Validators.required]],
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
      referenceValue: [undefined, [Validators.required]],
      referenceYear: [
        undefined,
        [Validators.required, Validators.maxLength(4), Validators.maxLength(4)],
      ],
      targetValue: [undefined, [Validators.required]],
      targetYear: [
        undefined,
        [Validators.required, Validators.maxLength(4), Validators.maxLength(4)],
      ],
      measurementUnit: [undefined, [Validators.required]],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // En réalité quand on parle des Valeurs de référence et cible, on se réfère aux indicateurs...
    // Or on ne peut parler d'indicateurs que si on a au préalable énoncé des Objectifs🙏
    // Donc logiquement, les
    // Unités des mesure,  valeurs de référence, valeurs cibles, année de référence et Année cible n'interviennent qu'en-dessous des indicateurs.
    // Et les indicateurs eux-mêmes n'interviennent que sous des objectifs🙏
    this.formElements = [
      { label: 'code', formControl: 'code', type: 'mask', mask: '99', size: 6 },
      {
        label: 'label',
        formControl: 'label',
        type: 'text',
        i18n: true,
        size: 6,
      },
      { label: 'startDate', formControl: 'startDate', type: 'date', size: 6 },
      { label: 'endDate', formControl: 'endDate', type: 'date', size: 6 },
      {
        label: 'objectives',
        formControl: 'objectives',
        type: 'editor',
        i18n: true,
        size: 12,
      },
      {
        label: 'indicators',
        formControl: 'indicators',
        type: 'editor',
        i18n: true,
        size: 12,
      },
      {
        label: 'measurementUnit',
        formControl: 'measurementUnit',
        type: 'dropdown',
        size: 6,
        dropdownOptions: measurementUnits,
        dropdownOptionsLabel: 'label',
        dropdownValueKey: 'value',
      },
      {
        label: 'referenceValue',
        formControl: 'referenceValue',
        type: 'number',
        size: 6,
      },
      {
        label: 'referenceYear',
        formControl: 'referenceYear',
        type: 'date',
        size: 6,
      },
      {
        label: 'targetValue',
        formControl: 'targetValue',
        type: 'number',
        size: 6,
      },
      { label: 'targetYear', formControl: 'targetYear', type: 'date', size: 6 },
      {
        label: 'presentation',
        formControl: 'presentation',
        type: 'editor',
        i18n: true,
        size: 12,
      },
      {
        label: 'verificationSource',
        formControl: 'verificationSource',
        type: 'editor',
        i18n: true,
        size: 12,
      },
      {
        label: 'results',
        formControl: 'results',
        type: 'editor',
        i18n: true,
        size: 12,
      },
    ];
  }

  public get isUpdateForm() {
    return !!this.form?.value?.id;
  }

  close() {
    this.ref.close();
  }

  submit() {
    if (!this.form.valid || !this.config.data?.subProgram?.id) return;
    this.busy = true;

    this._apisService
      .post<SubProgramActivityModel>(
        `/sub-programs/${this.config.data?.subProgram?.id}/activity`,
        {
          ...this.form.value,
        }
      )
      .subscribe(
        (res) => {
          this.busy = false;
          this._store.dispatch(GetSubPrograms());
          this.ref.close(res);

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.subPrograms.createActivitySuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.subPrograms.activityConflict';
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
