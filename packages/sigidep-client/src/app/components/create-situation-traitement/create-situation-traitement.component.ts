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
  @Input() situation!: any;
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  public traitement:any;
  constructor() {
    super();
   }

  ngOnInit(): void {
    console.log('traitement', this.situation)
    this.traitement=this.situation;
  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
}
