import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-facture-form',
  templateUrl: './create-facture-form.component.html',
  styleUrls: ['./create-facture-form.component.scss']
})
export class CreateFactureFormComponent extends BaseComponent implements OnInit {

  @Input() facture!: any;
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
  constructor(
    public ref: DynamicDialogRef
  ) {
    super();
   }

  ngOnInit(): void {
    console.log('traitement', this.facture)
    this.traitement=this.facture;
  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
  close() {
    this.ref.close();
  }
}
