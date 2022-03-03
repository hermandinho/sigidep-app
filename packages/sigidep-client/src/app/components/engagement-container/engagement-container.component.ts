import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeProcedureEnum } from '@models/exec-procedure.model';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = 'common' | 'mission' | 'decision' | 'command';
@Component({
  selector: 'app-engagement-container',
  templateUrl: './engagement-container.component.html',
  styleUrls: ['./engagement-container.component.scss'],
})
export class EngagementContainerComponent implements OnInit {
  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>(
    'common'
  );
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public form!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  currentProcedure!: any;

  ngOnInit() {
    this.form = this._fb.group({
      commandForm: this._fb.group({
        reference: '',
        objet: '',
        montantTTC: '',
      }),
      commonForm: this._fb.group({
        id: [undefined],
        typeProcedure: this._fb.group({
          id: [undefined],
          imputation: [],
          code: [undefined],
          label: [],
        }),
        procedure: this._fb.group({
          id: [undefined],
          nomAgent: [undefined],
        }),
        exercise: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
        montantAE: [undefined],
        adminUnit: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
        imputation: [undefined],
        numero: [undefined],
        reference: [undefined],
        task: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
        activity: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
        action: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
        sousProgramme: this._fb.group({
          id: [undefined],
          code: [undefined],
        }),
      }),
    });
  }

  get commonFormGroup(): FormGroup {
    return this.form?.get('commonForm') as FormGroup;
  }
  get commandFormGroup(): FormGroup {
    return this.form?.get('commandForm') as FormGroup;
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
    if (name === 'commonForm') {
      this.currentProcedure = this.form.value?.commonForm?.typeProcedure?.code;
      //console.log("TYPE ", this.currentProcedure, this.form.value?.commonForm)
    }
  }
  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch (currentStep) {
      case 'common':
        if (direction === 'forward') {
          switch (this.currentProcedure) {
            case '1111':
              this.currentStepBs.next('command');
              break;
            case '1110':
              this.currentStepBs.next('command');
              break;
            case '1115':
              this.currentStepBs.next('command');
              break;

            default:
              this.currentStepBs.next('decision');
              break;
          }
        }
        break;
      default:
        if (direction === 'back') {
          this.currentStepBs.next('common');
        }
        break;
    }
  }
  submitForm() {
    const formValues = this.form.value;
    // submit the form with a service
  }
}
