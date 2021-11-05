import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { SetAppBreadcrumb } from '@store/actions';
import { ExerciseModel } from '@models/exercise.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import * as fromExercises from '@reducers/exercise.reducer';
import { StructureModel } from '@models/structure.model';
import { getStructureSelector } from '@reducers/app.reducer';

interface IFormFiledElt {
  label: string;
  type:
    | 'dropdown'
    | 'text'
    | 'mask'
    | 'textarea'
    | 'number'
    | 'date'
    | 'editor';
  mask?: string;
  formControl: string;
  placeholder?: string;
  size: number;
  dropdownOptions?: any[];
  dropdownOptionsLabel?: string;
  required?: boolean;
  i18n?: boolean;
}

@Component({
  selector: 'app-create-sub-program-form',
  templateUrl: './create-sub-program-form.component.html',
  styleUrls: ['./create-sub-program-form.component.scss'],
})
export class CreateSubProgramFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;

  public formElements: {
    [key: string]: IFormFiledElt[];
  } = {};

  public exercises!: ExerciseModel[];
  public structures!: StructureModel[];
  public steps: MenuItem[] = [];
  public activeStep = 0;
  public stepButtons: {
    [key: string]: {
      back: boolean;
      forward: boolean;
      submit: boolean;
    };
  } = {
    '0': { back: false, forward: true, submit: false },
    '1': { back: true, forward: true, submit: false },
    '2': { back: true, forward: false, submit: true },
  };

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private readonly _fb: FormBuilder
  ) {
    super();
    // TODO subscribe to language changes
    this.steps = [
      {
        label: translate.instant('steps.identification'),
        command: (event) => {
          this.activeStep = 0;
        },
      },
      {
        label: translate.instant('steps.objectives'),
        command: (event) => {
          this.activeStep = 1;
        },
      },
      {
        label: translate.instant('steps.strategies'),
        command: (event) => {
          this.activeStep = 2;
        },
      },
    ];
    this.form = this._fb.group({
      common: this._fb.group({
        exerciseId: [undefined, [Validators.required]],
        structureId: [undefined, [Validators.required]],
      }),
      identification: this._fb.group({
        code: [
          undefined,
          [
            Validators.required,
            Validators.maxLength(2),
            Validators.minLength(2),
          ],
        ],
        labelFr: [undefined, [Validators.required]],
        labelEn: [undefined, [Validators.required]],
        startDate: [undefined, [Validators.required]],
        endDate: [undefined, [Validators.required]],
        ownerId: [undefined, []],
        presentationFr: [undefined, [Validators.required]],
        presentationEn: [undefined, [Validators.required]],
      }),
      objectives: this._fb.array([], []),
      strategies: this._fb.group({
        strategyFr: [undefined, [Validators.required]],
        strategyEn: [undefined, [Validators.required]],
      }),
    });
    this._initListeners();
  }

  get commonFormGroup(): FormGroup {
    return this.form.get('common') as FormGroup;
  }

  get objectivesFormGroup(): FormArray {
    return this.form.get('objectives') as FormArray;
  }

  get identificationFormGroup(): FormGroup {
    return this.form.get('identification') as FormGroup;
  }

  get strategiesFormGroup(): FormGroup {
    return this.form.get('strategies') as FormGroup;
  }

  get currentStepFormValid(): boolean {
    const step = this.activeStep;
    if (step === 0)
      return this.commonFormGroup?.valid && this.identificationFormGroup?.valid;
    else if (step === 1)
      return this.commonFormGroup?.valid && this.objectivesFormGroup?.valid;
    else return this.commonFormGroup?.valid && this.strategiesFormGroup?.valid;
  }

  ngOnInit(): void {
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.subPrograms',
            routerLink: ['/', 'sub-programs'],
          },
          {
            label: 'breadcrumb.create',
          },
        ],
      })
    );

    this.formElements = {
      identification: [
        {
          label: 'code',
          type: 'mask',
          formControl: 'code',
          size: 6,
          required: true,
          mask: '99',
        },
        {
          label: 'label',
          type: 'text',
          formControl: 'label',
          size: 6,
          required: true,
          i18n: true,
        },
        {
          label: 'startDate',
          type: 'date',
          formControl: 'startDate',
          size: 6,
          required: true,
        },
        {
          label: 'endDate',
          type: 'date',
          formControl: 'endDate',
          size: 6,
          required: true,
        },
        {
          label: 'presentation',
          type: 'editor',
          formControl: 'presentation',
          size: 12,
          required: true,
          i18n: true,
        },
      ],
      // objectives: [],
      // strategies: [],
    };
  }

  public goBack(): void {
    if (this.activeStep === 0) return;
    this.activeStep = this.activeStep - 1;
  }

  public goForward(): void {
    if (this.activeStep === 2) return;
    this.activeStep = this.activeStep + 1;
  }

  public async addObjectiveItem(item?: any): Promise<void> {
    const ret = await this._dialogService.launchSubProgramObjectiveCreateDialog(
      item
    );
    ret.onClose
      .pipe(this.takeUntilDestroy)
      .subscribe((data: { labelEn: string; labelFr: string; id?: number }) => {
        if (data) {
          if (item && item.hasOwnProperty('index')) {
            (this.objectivesFormGroup?.at(item.index) as FormGroup)?.patchValue(
              data
            );
          } else {
            this.objectivesFormGroup.push(
              this._fb.group({
                ...(data.id && { id: [data.id] }),
                labelFr: [data.labelFr],
                labelEn: [data.labelEn],
                index: this.objectivesFormGroup?.controls?.length,
                indicators: this._fb.array([]),
              })
            );
          }
        }
      });
  }

  public async editObjectiveItem(item: any) {
    this.addObjectiveItem(item);
  }

  public async addObjectiveIndicatorItem(
    index: number,
    item?: any
  ): Promise<void> {
    const ret =
      await this._dialogService.launchSubProgramObjectiveIndicatorCreateDialog(
        item
      );
    ret.onClose
      .pipe(this.takeUntilDestroy)
      .subscribe(
        (data: {
          labelFr: string;
          labelEn: string;
          referenceValue: string;
          referenceYear: string;
          targetValue: string;
          targetYear: string;
          measurementUnit: string;
          verificationSourceFr: string;
          verificationSourceEn: string;
        }) => {
          if (data) {
            const objectiveItemForm = this.objectivesFormGroup?.at(
              index
            ) as FormGroup;
            if (objectiveItemForm) {
              const indicatorsFormArray = objectiveItemForm.get(
                'indicators'
              ) as FormArray;
              if (indicatorsFormArray) {
                if (item) {
                  (
                    indicatorsFormArray?.at(item.index) as FormGroup
                  )?.patchValue(data);
                } else {
                  indicatorsFormArray.push(
                    this._fb.group({
                      labelFr: [data.labelFr],
                      labelEn: [data.labelEn],
                      referenceValue: [data.referenceValue],
                      referenceYear: [data.referenceYear],
                      targetValue: [data.targetValue],
                      targetYear: [data.targetYear],
                      measurementUnit: [data.measurementUnit],
                      verificationSourceFr: [data.verificationSourceFr],
                      verificationSourceEn: [data.verificationSourceEn],
                      index: [indicatorsFormArray.controls.length],
                      parentIndex: index,
                    })
                  );
                }
              }
            }
          }
        }
      );
  }

  public editObjectiveIndicatorItem(idx: number, item: any) {
    this.addObjectiveIndicatorItem(item.parentIndex, item);
  }

  private _initListeners() {
    this.subscriptions.push(
      this._store
        .pipe(this.takeUntilDestroy, select(fromExercises.getDataSelector))
        .subscribe((data) => {
          this.exercises = (data || []).map((d) => new ExerciseModel(d));
          if (this.exercises.length) {
            const active = this.exercises.find(
              (item) => item.status === 'in_progress'
            );
            if (active) {
              this.form.get('common.exerciseId')?.patchValue(active.id);
            }
          }
        }),
      this._store
        .pipe(this.takeUntilDestroy, select(getStructureSelector))
        .subscribe((data) => {
          this.structures = [new StructureModel(data)];
          if (this.structures.length) {
            this.form
              .get('common.structureId')
              ?.patchValue(this.structures[0]?.id);
          }
        })
    );
  }
}
