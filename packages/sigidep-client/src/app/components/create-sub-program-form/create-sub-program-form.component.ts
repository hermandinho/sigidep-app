import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { GetSubPrograms, Go, GO, SetAppBreadcrumb } from '@store/actions';
import { ExerciseModel } from '@models/exercise.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import * as fromExercises from '@reducers/exercise.reducer';
import { StructureModel } from '@models/structure.model';
import { getStructureSelector } from '@reducers/app.reducer';
import { ApisService } from '@services/apis.service';
import { SubProgramModel } from '@models/sub-program.model';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

export interface IFormFiledElt {
  label: string;
  type:
    | 'dropdown'
    | 'text'
    | 'mask'
    | 'textarea'
    | 'number'
    | 'date'
    | 'switch'
    | 'editor';
  mask?: string;
  formControl: string;
  placeholder?: string;
  size: number;
  dropdownOptions?: any;
  dropdownOptionsFunc?: () => any;
  dropdownOptionsLabel?: string;
  dropdownValueKey?: string;
  required?: boolean;
  i18n?: boolean;
  flexRow?: boolean;
  editable?: boolean;
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
  public busy = false;

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

  public blockUi = true;
  public isEdit!: boolean;
  public notFound!: boolean;

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private readonly _fb: FormBuilder,
    private _apisService: ApisService,
    private _route: ActivatedRoute
  ) {
    super();
    moment.locale(translate.currentLang);
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
      id: [undefined, []],
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
        coordinator: [undefined, [Validators.required]],
        owner: [undefined, [Validators.required]],
        followUpOwner: [undefined, [Validators.required]],
        startDate: [undefined, [Validators.required]],
        endDate: [undefined, [Validators.required]],
        presentationFr: [undefined, [Validators.required]],
        presentationEn: [undefined, [Validators.required]],
      }),
      objectives: this._fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
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

  get currentLang() {
    return this.translate.currentLang;
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

    this._route.params.pipe(this.takeUntilDestroy).subscribe((params) => {
      if (!params.id) {
        this.blockUi = false;
      } else {
        this.isEdit = true;
        this._store.dispatch(
          SetAppBreadcrumb({
            breadcrumb: [
              {
                label: 'breadcrumb.subPrograms',
                routerLink: ['/', 'sub-programs'],
              },
              {
                label: '#' + params.id,
              },
              {
                label: 'breadcrumb.edit',
              },
            ],
          })
        );
        this._fetchItem(+params.id);
      }
    });

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
          label: 'coordinator',
          type: 'text',
          formControl: 'coordinator',
          size: 6,
          required: true,
        },
        {
          label: 'owner',
          type: 'text',
          formControl: 'owner',
          size: 6,
          required: true,
        },
        {
          label: 'followUpOwner',
          type: 'text',
          formControl: 'followUpOwner',
          size: 6,
          required: true,
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
                indicators: this._fb.array(
                  [],
                  [Validators.required, Validators.minLength(1)]
                ),
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
                      referenceYear: [new Date(data.referenceYear)],
                      targetValue: [data.targetValue],
                      targetYear: [new Date(data.targetYear)],
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

  public async submit(quiteOnSuccess = false) {
    if (!this.form.valid) return;
    this.busy = true;
    const values = { ...this.form.value };
    const payload = {
      ...values.common,
      identification: values.identification,
      objectives: values.objectives,
      strategies: values.strategies,
    };

    if (this.isEdit) {
      this._apisService
        .patch<SubProgramModel>(`/sub-programs/${this.form.value.id}`, {
          ...payload,
        })
        .subscribe(
          (res) => {
            this.busy = false;
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.subPrograms.updateSuccess',
              severity: 'success',
              life: 5000,
              closable: true,
            });
            setTimeout(() => {
              this._store.dispatch(new Go({ path: ['/', 'sub-programs'] }));
            }, 2000);
          },
          ({ error }) => {
            this._onError(error);
          }
        );
    } else {
      this._apisService
        .post<SubProgramModel>('/sub-programs', {
          ...payload,
        })
        .subscribe(
          (res) => {
            this.busy = false;
            this._store.dispatch(GetSubPrograms());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.subPrograms.createSuccess',
              severity: 'success',
              life: 5000,
              closable: true,
            });

            if (quiteOnSuccess) {
              this._store.dispatch(new Go({ path: ['/', 'sub-programs'] }));
            } else {
              this.resetFormAndSteps();
            }
          },
          ({ error }) => {
            this._onError(error);
          }
        );
    }
  }

  private _onError(error: any) {
    let err = '';
    if (error?.statusCode === 409) {
      err = 'errors.subPrograms.conflict';
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

  private resetFormAndSteps() {
    this.activeStep = 0;
    this.form.reset({
      common: {
        exerciseId: this.form?.value?.common?.exerciseId,
        structureId: this.form?.value?.common?.structureId,
      },
    });

    this.objectivesFormGroup?.clear();
  }

  private _fetchItem(id: number) {
    this._apisService.get<SubProgramModel>(`/sub-programs/${id}`).subscribe(
      (res) => {
        this._initEditForm(res);
      },
      (error) => {
        this.notFound = true;
      }
    );
  }

  private _initEditForm(params: SubProgramModel) {
    this.form.patchValue({
      id: params.id,
      common: {
        exerciseId: params.exercise?.id,
        structureId: params.structure?.id,
      },
      identification: {
        code: params.code,
        labelFr: params.labelFr,
        labelEn: params.labelEn,
        coordinator: params.coordinator,
        owner: params.owner,
        followUpOwner: params.followUpOwner,
        startDate: new Date(params.startDate),
        endDate: new Date(params.endDate),
        presentationFr: params.presentationFr,
        presentationEn: params.presentationEn,
      },
      strategies: {
        ...params.strategies,
      },
    });
    (params.objectives || []).forEach((obj) => {
      this.objectivesFormGroup.push(
        this._fb.group({
          ...(obj.id && { id: [obj.id] }),
          labelFr: [obj.labelFr],
          labelEn: [obj.labelEn],
          index: obj.index,
          indicators: this._fb.array(
            (obj.indicators || []).map((ind) => {
              return this._fb.group({
                labelFr: ind.labelFr,
                labelEn: ind.labelEn,
                referenceValue: ind.referenceValue,
                referenceYear: new Date(ind.referenceYear),
                targetValue: ind.targetValue,
                targetYear: new Date(ind.targetYear),
                measurementUnit: ind.measurementUnit,
                verificationSourceFr: ind.verificationSourceFr,
                verificationSourceEn: ind.verificationSourceEn,
                index: ind.index,
                parentIndex: ind.parentIndex,
              });
            }),
            [Validators.required, Validators.minLength(1)]
          ),
        })
      );
    });

    this.blockUi = false;
  }
}
