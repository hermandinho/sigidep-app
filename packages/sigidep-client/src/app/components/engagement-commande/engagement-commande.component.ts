import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-engagement-commande',
  templateUrl: './engagement-commande.component.html',
  styleUrls: ['./engagement-commande.component.scss'],
})
export class EngagementCommandeComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public commandForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
  ngOnInit() {
    this.commandForm = this.startingForm;
    this.subformInitialized.emit(this.commandForm);
  }
  doChangeStep(direction: 'back') {
    this.changeStep.emit(direction);
  }
  submit() {
    this.submitForm.emit();
  }
}
