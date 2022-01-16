import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IFormFiledElt } from '@components/create-sub-program-form/create-sub-program-form.component';

export const measurementUnits = [
  { value: '%', label: '%' },
  { value: 'm', label: 'm' },
  { value: 'unit', label: 'unit' },
  { value: 'kg', label: 'kg' },
  { value: 'ha', label: 'ha' },
  { value: 'ml', label: 'ml' },
  { value: 'tonnes', label: 'tonnes' },
  { value: 'number', label: 'number' },
  { value: 'day', label: 'day' },
  { value: 'month', label: 'month' },
  { value: 'year', label: 'year' },
];

@Component({
  selector: 'app-create-sub-program-objective-indicator-form',
  templateUrl: './create-sub-program-objective-indicator-form.component.html',
  styleUrls: ['./create-sub-program-objective-indicator-form.component.scss'],
})
export class CreateSubProgramObjectiveIndicatorFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public measurementUnits = measurementUnits;
  public formElements: IFormFiledElt[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder
  ) {
    super();
    this.form = this._fb.group({
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
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
      verificationSourceFr: [undefined, [Validators.required]],
      verificationSourceEn: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.formElements = [
      {
        label: 'label',
        formControl: 'label',
        type: 'text',
        i18n: true,
        size: 6,
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
        label: 'measurementUnit',
        formControl: 'measurementUnit',
        type: 'dropdown',
        size: 6,
        dropdownOptions: measurementUnits,
        dropdownOptionsLabel: 'label',
        dropdownValueKey: 'value',
        i18n: false,
      },
      {
        label: 'verificationSource',
        formControl: 'verificationSource',
        type: 'editor',
        i18n: true,
        size: 12,
      },
    ];
    if (this.config.data?.item) {
      this.form.patchValue(this.config.data.item);
    }
  }

  close() {
    this.ref.close(this.form.valid && this.form.value);
  }
}
