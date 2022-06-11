import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-situation-traitement',
  templateUrl: './create-situation-traitement.component.html',
  styleUrls: ['./create-situation-traitement.component.scss']
})
export class CreateSituationTraitementComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() situation!: any;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public engagementForm!: FormGroup;
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  constructor() {
    super();
   }

  ngOnInit(): void {
  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
}
