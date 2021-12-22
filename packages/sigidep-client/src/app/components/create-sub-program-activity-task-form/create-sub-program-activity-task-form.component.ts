import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { BaseComponent } from '@components/base.component';
import { IFormFiledElt } from '@components/create-sub-program-form/create-sub-program-form.component';
import { measurementUnits } from '@components/create-sub-program-objective-indicator-form/create-sub-program-objective-indicator-form.component';
import { SubProgramActivityTaskModel } from '@models/sub-program.model';
import { GetSubPrograms } from '@store/actions';
import { getDataSelector as getFinancialSources } from '@store/reducers/financial-sources.reducer';
import { FinancialSourceModel } from '@models/financial-source.model';
import { TranslateService } from '@ngx-translate/core';
import { getDataSelector as getAdministrativeUnitesSelector } from '@reducers/administrative-units.reducer';
import { AdministrativeUnitModel } from '@models/administrative-unit.model';

@Component({
  selector: 'app-create-sub-program-activity-task-form',
  templateUrl: './create-sub-program-activity-task-form.component.html',
  styleUrls: ['./create-sub-program-activity-task-form.component.scss'],
})
export class CreateSubProgramActivityTaskFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public formElements: IFormFiledElt[] = [];
  public busy = false;
  public financialSources: FinancialSourceModel[] = [];
  public administrativeUnits: AdministrativeUnitModel[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _apisService: ApisService,
    private _appService: AppService,
    private _store: Store<AppState>,
    public translate: TranslateService
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined, []],
      // code: [
      //   undefined,
      //   [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      // ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      stakeHoldersFr: [undefined, [Validators.required]],
      stakeHoldersEn: [undefined, [Validators.required]],
      objectivesFr: [undefined, [Validators.required]],
      objectivesEn: [undefined, [Validators.required]],
      resultsFr: [undefined, [Validators.required]],
      resultsEn: [undefined, [Validators.required]],
      indicatorsFr: [undefined, [Validators.required]],
      indicatorsEn: [undefined, [Validators.required]],
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
      referenceValue: [undefined, [Validators.required]],
      financialSourceId: [undefined, [Validators.required]],
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
      isMultiYear: [false, []],
      engagementAuthorization: [undefined, []],
      administrativeUnitId: [undefined, [Validators.required]],
    });

    this._store
      .pipe(select(getFinancialSources), this.takeUntilDestroy)
      .subscribe(
        (data) =>
          (this.financialSources = (data || []).map(
            (item) => new FinancialSourceModel(item)
          ))
      );

    this._store
      .pipe(select(getAdministrativeUnitesSelector), this.takeUntilDestroy)
      .subscribe(
        (data) =>
          (this.administrativeUnits = (data || []).map(
            (item) => new AdministrativeUnitModel(item)
          ))
      );
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  ngOnInit(): void {
    /*
    * Donc logiquement,
    * les Unités des mesure,  valeurs de référence, valeurs cibles, année de référence et Année cible n'interviennent qu'en-dessous des indicateurs.
    * Et les indicateurs eux-mêmes n'interviennent que sous des objectifs🙏
    *
    * Libellé
Unité Administrative
Présentation
Parties prenantes
Objectifs
Indicateurs
Unité de mesure
Valeurs de référence
Année de référence
Valeur cible
Année cible.
Résultats attendus
    * **/
    // console.log(this.config.data);
    this.formElements = [
      // { label: 'code', formControl: 'code', type: 'mask', mask: '99', size: 6 },
      {
        label: 'label',
        formControl: 'label',
        type: 'text',
        i18n: true,
        size: 6,
      },
      {
        label: 'administrativeUnit',
        formControl: 'administrativeUnitId',
        type: 'dropdown',
        size: 6,
        dropdownOptions: this.administrativeUnits,
        dropdownOptionsLabel:
          this.currentLang === 'fr' ? 'formattedLabelFr' : 'formattedLabelEn',
        dropdownValueKey: 'id',
        required: true,
      },
      {
        label: 'stakeHolders',
        formControl: 'stakeHolders',
        type: 'editor',
        i18n: true,
        size: 12,
      },
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
        editable: true,
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
        label: 'financialSource',
        formControl: 'financialSourceId',
        type: 'dropdown',
        size: 6,
        dropdownOptions: this.financialSources,
        dropdownOptionsLabel:
          this.currentLang === 'fr' ? 'formattedLabelFr' : 'formattedLabelEn',
        dropdownValueKey: 'id',
        required: true,
      },
      {
        label: 'engagementAuthorization',
        formControl: 'engagementAuthorization',
        type: 'number',
        size: 6,
      },
      {
        label: 'verificationSource',
        formControl: 'verificationSource',
        type: 'editor',
        i18n: true,
        size: 12,
      },
      { label: 'startDate', formControl: 'startDate', type: 'date', size: 6 },
      { label: 'endDate', formControl: 'endDate', type: 'date', size: 6 },
      {
        label: 'isMultiYear',
        formControl: 'isMultiYear',
        type: 'switch',
        size: 12,
        flexRow: true,
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
    const spId = this.config.data?.subProgram?.id;
    const actId = this.config.data?.activity?.id;
    if (!this.form.valid || !spId || !actId) return;
    this.busy = true;

    this._apisService
      .post<SubProgramActivityTaskModel>(
        `/sub-programs/${this.config.data?.subProgram?.id}/activity/${actId}/task`,
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
            detail: 'messages.subPrograms.createActivityTaskSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.subPrograms.activityTaskConflict';
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
