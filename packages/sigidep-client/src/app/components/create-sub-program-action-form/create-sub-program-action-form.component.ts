import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormFiledElt } from '@components/create-sub-program-form/create-sub-program-form.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import {
  SubProgramActionModel,
  SubProgramActivityModel,
} from '@models/sub-program.model';
import { GetSubPrograms } from '@store/actions';
import { BaseComponent } from '@components/base.component';
import { measurementUnits } from '@components/create-sub-program-objective-indicator-form/create-sub-program-objective-indicator-form.component';

@Component({
  selector: 'app-create-sub-program-action-form',
  templateUrl: './create-sub-program-action-form.component.html',
  styleUrls: ['./create-sub-program-action-form.component.scss'],
})
export class CreateSubProgramActionFormComponent
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
      objectivesFr: [undefined, [Validators.required]],
      objectivesEn: [undefined, [Validators.required]],
      indicatorsFr: [undefined, [Validators.required]],
      indicatorsEn: [undefined, [Validators.required]],
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
      referenceValue: [undefined, [Validators.required]],
      referenceYear: [undefined, [Validators.required]],
      targetValue: [undefined, [Validators.required]],
      targetYear: [undefined, [Validators.required]],
      measurementUnit: [undefined, [Validators.required]],
      owner: [undefined, [Validators.required]],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.formElements = [
      {
        label: 'code',
        formControl: 'code',
        type: 'mask',
        mask: '99',
        size: 6,
        required: true,
      },
      {
        label: 'label',
        formControl: 'label',
        type: 'text',
        i18n: true,
        size: 6,
        required: true,
      },
      {
        label: 'startDate',
        formControl: 'startDate',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        label: 'endDate',
        formControl: 'endDate',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        label: 'objectives',
        formControl: 'objectives',
        type: 'editor',
        i18n: true,
        size: 12,
        required: true,
      },
      {
        label: 'indicators',
        formControl: 'indicators',
        type: 'editor',
        i18n: true,
        size: 12,
        required: true,
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
        required: true,
      },
      {
        label: 'owner',
        formControl: 'owner',
        type: 'text',
        size: 6,
        required: true,
      },
      {
        label: 'referenceValue',
        formControl: 'referenceValue',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'referenceYear',
        formControl: 'referenceYear',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        label: 'targetValue',
        formControl: 'targetValue',
        type: 'number',
        size: 6,
        required: true,
      },
      {
        label: 'targetYear',
        formControl: 'targetYear',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        label: 'verificationSource',
        formControl: 'verificationSource',
        type: 'editor',
        i18n: true,
        size: 12,
        required: true,
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
      .post<SubProgramActionModel>(
        `/sub-programs/${this.config.data?.subProgram?.id}/action`,
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
            detail: 'messages.subPrograms.createActionSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.subPrograms.actionConflict';
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
