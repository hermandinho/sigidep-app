import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { SetAppBreadcrumb } from '@store/actions';
import { ExerciseModel } from '@models/exercise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    label: string;
    type: 'dropdown' | 'text' | 'mask' | 'textarea' | 'number' | 'date';
    mask?: string;
    formControl: string;
    placeholder?: string;
    size: number;
    dropdownOptions?: any[];
    dropdownOptionsLabel?: string;
    required?: boolean;
  }[] = [];

  public exercises!: ExerciseModel[];

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private readonly _fb: FormBuilder
  ) {
    super();
    this.form = this._fb.group({
      exerciseId: [undefined, [Validators.required]],
      code: [
        undefined,
        [Validators.required, Validators.maxLength(2), Validators.minLength(2)],
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      objectivesEn: [undefined, [Validators.required]],
      objectivesFr: [undefined, [Validators.required]],
      indicatorsFr: [undefined, [Validators.required]],
      indicatorsEn: [undefined, [Validators.required]],
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
      strategyFr: [undefined, [Validators.required]],
      strategyEn: [undefined, [Validators.required]],
      measurementUnit: [undefined, [Validators.required]],
      indicatorReferenceValue: [undefined, [Validators.required]],
      indicatorReferenceYear: [undefined, [Validators.required]],
      indicatorsTargetValue: [undefined, [Validators.required]],
      indicatorsTargetYear: [undefined, [Validators.required]],
      engagementAuthorization: [undefined, [Validators.required]],
      indicatorsPaymentCreditN1: [undefined, [Validators.required]],
      indicatorsPaymentCreditN2: [undefined, [Validators.required]],
      indicatorsPaymentCreditN3: [undefined, [Validators.required]],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
    });
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

    this.formElements = [
      {
        label: 'exercise',
        type: 'dropdown',
        formControl: 'exerciseId',
        size: 6,
        dropdownOptions: this.exercises,
        dropdownOptionsLabel: 'code',
        required: true,
      },
      {
        label: 'code',
        type: 'mask',
        formControl: 'code',
        size: 6,
        dropdownOptions: this.exercises,
        required: true,
        mask: '99',
      },
      {
        label: 'labelFr',
        type: 'text',
        formControl: 'labelFr',
        size: 6,
        required: true,
      },
      {
        label: 'labelEn',
        type: 'text',
        formControl: 'labelEn',
        size: 6,
        required: true,
      },
      {
        label: 'objectivesFr',
        type: 'textarea',
        formControl: 'objectivesFr',
        size: 6,
        required: true,
      },
      {
        label: 'objectivesEn',
        type: 'textarea',
        formControl: 'objectivesEn',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsFr',
        type: 'textarea',
        formControl: 'indicatorsFr',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsEn',
        type: 'textarea',
        formControl: 'indicatorsEn',
        size: 6,
        required: true,
      },
      {
        label: 'verificationSourceFr',
        type: 'textarea',
        formControl: 'verificationSourceFr',
        size: 6,
        required: true,
      },
      {
        label: 'verificationSourceEn',
        type: 'textarea',
        formControl: 'verificationSourceEn',
        size: 6,
        required: true,
      },
      {
        label: 'strategyFr',
        type: 'textarea',
        formControl: 'strategyFr',
        size: 6,
        required: true,
      },
      {
        label: 'strategyEn',
        type: 'textarea',
        formControl: 'strategyEn',
        size: 6,
        required: true,
      },
      {
        label: 'measurementUnit',
        type: 'textarea',
        formControl: 'measurementUnit',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorReferenceValue',
        type: 'number',
        formControl: 'indicatorReferenceValue',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorReferenceYear',
        type: 'date',
        formControl: 'indicatorReferenceYear',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsTargetValue',
        type: 'number',
        formControl: 'indicatorsTargetValue',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsTargetYear',
        type: 'date',
        formControl: 'indicatorsTargetYear',
        size: 6,
        required: true,
      },
      {
        label: 'engagementAuthorization',
        type: 'number',
        formControl: 'engagementAuthorization',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsPaymentCreditN1',
        type: 'number',
        formControl: 'indicatorsPaymentCreditN1',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsPaymentCreditN2',
        type: 'number',
        formControl: 'indicatorsPaymentCreditN2',
        size: 6,
        required: true,
      },
      {
        label: 'indicatorsPaymentCreditN3',
        type: 'number',
        formControl: 'indicatorsPaymentCreditN3',
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
    ];
  }
}
