import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';

@Component({
  selector: 'app-create-sub-program-objective-form',
  templateUrl: './create-sub-program-objective-form.component.html',
  styleUrls: ['./create-sub-program-objective-form.component.scss'],
})
export class CreateSubProgramObjectiveFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined, []],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      this.form.patchValue(this.config.data.item);
    }
  }

  close() {
    this.ref.close(this.form.valid && this.form.value);
  }
}
