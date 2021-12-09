import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormFiledElt } from '@components/create-sub-program-form/create-sub-program-form.component';
import { getDataSelector as getAddressesSelector } from '@reducers/addresses.reducer';
import {
  ArrondissementModel,
  DepartmentModel,
  RegionsModel,
} from '@models/addresses.model';
import { AppState } from '@reducers/index';
import { select, Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  SubProgramModel,
} from '@models/sub-program.model';
import { ExerciseModel } from '@models/exercise.model';
import { getDataSelector as getParagraphsSelector } from '@reducers/paragraphs.reducer';
import { ParagraphModel } from '@models/paragraph.model';
import { GetParagraphs } from '@store/actions';
import * as moment from 'moment';

@Component({
  selector: 'app-create-sub-program-activity-task-operation-form',
  templateUrl:
    './create-sub-program-activity-task-operation-form.component.html',
  styleUrls: [
    './create-sub-program-activity-task-operation-form.component.scss',
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSubProgramActivityTaskOperationFormComponent
  extends BaseComponent
  implements OnInit
{
  public form!: FormGroup;
  public formElements: IFormFiledElt[] = [];
  public regions!: RegionsModel[];
  public busy = false;
  public activeStep = 0;
  public steps: MenuItem[] = [];
  public paragraphs!: ParagraphModel[];
  public departmentsSelectData!: { label: string; id: number }[];
  public arrondissementsSelectData!: { label: string; id: number }[];

  public stepButtons: {
    [key: string]: {
      back: boolean;
      forward: boolean;
      submit: boolean;
    };
  } = {
    '0': { back: false, forward: true, submit: false },
    '1': { back: true, forward: true, submit: false },
    '2': { back: true, forward: true, submit: false },
    '3': { back: true, forward: true, submit: false },
    '4': { back: true, forward: true, submit: false },
  };

  public managementModes = [
    { value: 'gc', label: 'managementModes.gc' },
    { value: 'cd', label: 'managementModes.cd' },
    { value: 'rt', label: 'managementModes.rt' },
  ];

  private stepsArray = [
    'codofication',
    'costs',
    'managementMode',
    'deliverables',
    'chronogram',
  ];

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public translate: TranslateService
  ) {
    super();
    console.log(this.config.data);
    moment.locale(translate.currentLang);
    if (
      (this.config.data?.task as SubProgramActivityTaskModel)?.financialSource
        ?.acceptsDeliverables
    ) {
      this.stepButtons = {
        ...this.stepButtons,
        '4': {
          ...this.stepButtons['4'],
          submit: false,
        },
        '5': {
          back: true,
          forward: false,
          submit: true,
        },
      };
      this.stepsArray.push('physicalUnits');
    } else {
      this.stepButtons = {
        ...this.stepButtons,
        '4': {
          ...this.stepButtons['4'],
          submit: true,
          forward: false,
        },
      };
    }
    this.steps = this.stepsArray.map((step, idx) => {
      return {
        label: translate.instant(`steps.${step}`),
        command: (event) => {
          this.activeStep = idx;
        },
      };
    });
    this._store
      .pipe(select(getAddressesSelector), this.takeUntilDestroy)
      .subscribe(
        (data) =>
          (this.regions = (data || []).map(
            (r) =>
              new RegionsModel({
                ...r,
                departments: (r.departments || []).map(
                  (d) =>
                    new DepartmentModel({
                      ...d,
                      arrondissements: (d.arrondissements || []).map(
                        (a) => new ArrondissementModel(a)
                      ),
                    })
                ),
              })
          ))
      );

    this._store
      .pipe(select(getParagraphsSelector), this.takeUntilDestroy)
      .subscribe(
        (data) =>
          (this.paragraphs = (data || []).map((p) => new ParagraphModel(p)))
      );
  }

  public get isUpdateForm() {
    return !!this.form?.value?.id;
  }

  get exercisesSelectData() {
    const exercise: ExerciseModel = new ExerciseModel(
      this.config?.data?.subProgram?.exercise
    );
    return [
      {
        id: exercise?.id,
        label: exercise?.formattedLabel || `${exercise?.year}`,
      },
    ];
  }

  get tasksSelectData() {
    const task: SubProgramActivityTaskModel = this.config?.data?.task;
    return [
      {
        id: task?.id,
        label:
          this.currentLang === 'fr'
            ? task?.formattedLabelFr
            : task?.formattedLabelEn,
      },
    ];
  }

  get activitiesSelectData() {
    const activity: SubProgramActivityModel = new SubProgramActivityModel(
      this.config?.data?.activity
    );
    return [
      {
        id: activity?.id,
        label:
          this.currentLang === 'fr'
            ? activity?.formattedLabelFr
            : activity?.formattedLabelEn,
      },
    ];
  }

  get subProgramSelectData() {
    const item: SubProgramModel = new SubProgramModel(
      this.config?.data?.subProgram
    );
    return [
      {
        id: item?.id,
        label:
          this.currentLang === 'fr'
            ? item?.formattedLabelFr
            : item?.formattedLabelEn,
      },
    ];
  }

  get currentLang() {
    return this.translate?.currentLang;
  }

  get currentStepFormValid(): boolean {
    const step = this.activeStep;
    const f = this.form;
    const stepFormControls: { [key: string]: any } = {
      0: [f?.get('labelFr'), f?.get('labelEn'), f?.get('paragraphId')],
      1: [
        f?.get('paymentCreditN1'),
        f?.get('paymentCreditN2'),
        f?.get('paymentCreditN3'),
        f?.get('engagementAuthorization'),
      ],
      2: [
        f?.get('managerName'),
        f?.get('regionId'),
        f?.get('departmentId'),
        f?.get('arrondissementId'),
        f?.get('locality'),
      ],
      3: [
        f?.get('deliverablesFr'),
        f?.get('deliverablesEn'),
        f?.get('verificationSourceFr'),
        f?.get('verificationSourceEn'),
      ],
      4: [f?.get('chronogram')],
    };
    return (
      stepFormControls[step]?.filter((s: AbstractControl) => s?.valid)
        ?.length === stepFormControls[step]?.length
    );
  }

  get chronogramFormArray(): FormArray {
    return this.form.get('chronogram') as FormArray;
  }

  public get calculateSpacing() {
    return (
      +this.form.get('paymentCreditN1')?.value -
      (this.chronogramFormArray?.value || []).reduce(
        (acc: number, item: { value: number }) => {
          return acc + item.value;
        },
        0
      )
    );
  }

  public getChronogramControlAtIndex(idx: number) {
    return this.chronogramFormArray.at(idx) as FormGroup;
  }

  public goBack(): void {
    if (this.activeStep === 0) return;
    this.activeStep = this.activeStep - 1;
  }

  public goForward(): void {
    if (this.activeStep === this.steps?.length) return;
    this.activeStep = this.activeStep + 1;
  }

  get imputationParts(): {
    exercise: string;
    subProgram: string;
    activity: string;
    administrativeUnit: string;
    paragraph: string;
    section: string;
    paragraphCode?: string;
  } {
    const sp: SubProgramModel = this.config?.data?.subProgram;
    const act: SubProgramActivityModel = this.config?.data?.activity;
    const task: SubProgramActivityTaskModel = this.config?.data?.task;
    const { paragraphId } = this.form?.value;
    const paragraph = this.paragraphs?.find((p) => p?.id === +paragraphId);

    return {
      activity: act?.code || 'XX',
      administrativeUnit: task?.administrativeUnit?.code || 'XX',
      exercise: sp?.exercise?.code?.toString() || 'XX',
      paragraph: paragraph?.code || 'XX',
      section: task?.administrativeUnit?.function?.code || 'XX',
      subProgram: sp?.code || 'XX',
      paragraphCode:
        this.currentLang === 'fr'
          ? paragraph?.abbreviationFr
          : paragraph?.abbreviationEn,
    };
  }

  get imputation() {
    /**
     * Imputations au bas de la fenêtre dans une large zone grisée prendra automatiquement en concaténation espacée :
     Code_Exercice {2positions}  Code_S-Programme {2positions} Code Activité {2 positions} Unité Administrative(provenant de la tâche)
     {6 positions}  Paragraphe {6 positions} Section(provient de l'unité Administrative) {3 positions}
     * */
    const {
      exercise,
      activity,
      subProgram,
      administrativeUnit,
      paragraph,
      section,
      paragraphCode,
    } = this.imputationParts;
    // CODE-EXERCICE{2} CODE-SP{2} CODE-ACTIVITE{2} CODE-UNITE-ADMINISTRATIVE{6} CODE-PARAGRAPH{6} CODE-SECTION{3}
    return `${exercise} ${subProgram} ${activity} ${administrativeUnit} ${paragraph} ${section} ${
      paragraphCode ? ' - ' + paragraphCode : ''
    }`;
  }

  ngOnInit(): void {
    this._store.dispatch(GetParagraphs());

    const sp: SubProgramModel =
      this.config?.data?.subProgram &&
      new SubProgramModel(this.config?.data?.subProgram);
    const exercise: ExerciseModel =
      sp?.exercise && new ExerciseModel(sp?.exercise);
    const task: SubProgramActivityTaskModel =
      this.config?.data?.task &&
      new SubProgramActivityTaskModel(this.config?.data?.task);
    const activity: SubProgramActivityModel =
      this.config?.data?.activity &&
      new SubProgramActivityModel(this.config?.data?.activity);
    this.form = this._fb.group({
      exercise: [
        {
          value: exercise?.id,
          disabled: true,
        },
      ],
      task: [
        {
          value: task?.id,
          disabled: true,
        },
      ],
      activity: [
        {
          value: activity?.id,
          disabled: true,
        },
      ],
      sp: [
        {
          value: sp?.id,
          disabled: true,
        },
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      deliverablesFr: [undefined, [Validators.required]],
      deliverablesEn: [undefined, [Validators.required]],
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
      paragraphId: [undefined, [Validators.required]],
      imputation: [
        {
          value: undefined,
          disabled: true,
        },
        [Validators.required],
      ],
      engagementAuthorization: [
        {
          value: 0,
          disabled: true,
        },
        [Validators.required],
      ],
      bfEngagementAuthorization: [0, [Validators.required]],
      bipEngagementAuthorization: [0, [Validators.required]],
      paymentCreditN1: [0, [Validators.required]],
      paymentCreditN2: [0, [Validators.required]],
      paymentCreditN3: [0, [Validators.required]],
      managementMode: [undefined, [Validators.required]],
      managerName: [undefined, [Validators.required]],
      regionId: [undefined, [Validators.required]],
      departmentId: [undefined, [Validators.required]],
      arrondissementId: [undefined, [Validators.required]],
      locality: [undefined, [Validators.required]],
      chronogram: this._fb.array([], []),
    });
    this.generateChronogram();

    this.formElements = [
      {
        label: 'imputation',
        formControl: 'imputation',
        type: 'textarea',
        size: 12,
        required: true,
      },
      {
        label: 'engagementAuthorization',
        formControl: 'engagementAuthorization',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'bfEngagementAuthorization',
        formControl: 'bfEngagementAuthorization',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'bipEngagementAuthorization',
        formControl: 'bipEngagementAuthorization',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'paymentCreditN1',
        formControl: 'paymentCreditN1',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'paymentCreditN2',
        formControl: 'paymentCreditN2',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'paymentCreditN3',
        formControl: 'paymentCreditN3',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'managementMode',
        formControl: 'managementMode',
        type: 'dropdown',
        size: 6,
        required: true,
        dropdownOptions: [
          { label: 'managementModeGC', value: 'GC' },
          { label: 'managementModeCD', value: 'CD' },
          { label: 'managementModeRT', value: 'RT' },
        ],
        dropdownOptionsLabel: 'label',
        dropdownValueKey: 'value',
      },
      {
        label: 'managerName',
        formControl: 'managerName',
        type: 'text',
        size: 6,
        required: true,
      },
      {
        label: 'locality',
        formControl: 'locality',
        type: 'text',
        size: 6,
        required: true,
      },
    ];
    this.initSubscriptions();
  }

  /*public getDropdownOptions(key?: 'departmentsSelectData' | 'arrondissementsSelectData' | 'regionsSelectData') {
    return this[key || 'regionsSelectData'] || [];
  }*/

  close() {
    this.ref.close();
  }

  submit(v?: boolean) {}

  public monthlyBreakDown(type: 'month' | 'trimester' | 'semester') {
    const baseValue = +(this.form?.get('paymentCreditN1')?.value || 0);
    if (!baseValue) return;

    let indexesToUpdate: number[] = [];
    const allIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if (type === 'month') {
      indexesToUpdate = allIndexes;
    } else if (type === 'trimester') {
      indexesToUpdate = [2, 5, 8, 11];
    } else if (type === 'semester') {
      indexesToUpdate = [5, 11];
    }
    allIndexes.forEach((idx) => {
      this.chronogramFormArray
        .at(idx)
        ?.get('value')
        ?.patchValue(
          indexesToUpdate.includes(idx)
            ? Math.floor(baseValue / indexesToUpdate.length)
            : 0
        );
    });
  }

  private initSubscriptions() {
    this.form
      .get('paymentCreditN1')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      .subscribe((val) => {
        this.calculateAE();
      });

    this.form
      .get('paymentCreditN2')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      ?.subscribe((val) => {
        this.calculateAE();
      });

    this.form
      .get('paymentCreditN3')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      ?.subscribe((val) => {
        this.calculateAE();
      });
  }

  private calculateAE() {
    const aeCtrl = this.form.get('engagementAuthorization');
    const n1 = this.form.get('paymentCreditN1')?.value;
    const n2 = this.form.get('paymentCreditN2')?.value;
    const n3 = this.form.get('paymentCreditN3')?.value;
    aeCtrl?.patchValue((n1 || 0) + (n2 || 0) + (n3 || 0));
  }

  handleRegionChange(id: any) {
    this.departmentsSelectData =
      (this.regions || [])
        .find((r) => r.id === +id)
        ?.departments?.map((d) => ({
          id: d.id,
          label: d.formattedLabel,
        })) || [];
    this.form.get('departmentId')?.patchValue(undefined);
  }

  handleDepartmentChange(id: any) {
    const { regionId } = this.form?.value;
    this.arrondissementsSelectData =
      (this.regions || [])
        .find((r) => r.id === +regionId)
        ?.departments?.find((d) => d.id === +id)
        ?.arrondissements?.map((a) => ({
          id: a.id,
          label: a.formattedLabel,
        })) || [];
    this.form.get('arrondissementId')?.patchValue(undefined);
  }

  private generateChronogram() {
    const array = this.chronogramFormArray;
    return moment.monthsShort().map((month) => {
      array.push(
        this._fb.group({
          label: [month?.toUpperCase()],
          value: [0, [Validators.required]],
        })
      );
    });
  }
}
