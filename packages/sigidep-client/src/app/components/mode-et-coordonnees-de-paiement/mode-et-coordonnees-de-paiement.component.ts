import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FormGroup } from '@angular/forms';
import { AppState } from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mode-et-coordonnees-de-paiement',
  templateUrl: './mode-et-coordonnees-de-paiement.component.html',
  styleUrls: ['./mode-et-coordonnees-de-paiement.component.scss']
})
export class ModeEtCoordonneesDePaiementComponent extends BaseComponent implements OnInit {
  modes = [
    {libelle:'Virement ou chèque (dont Titre)'},
    {libelle:'En Numéraire'}
  ]
  cheque:boolean = false;
  numerique:boolean = false;
  @Input() startingForm!: FormGroup;
  @Input() bon!: any;
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
  'back' | 'forward'
>();
@Output() subformInitialized: EventEmitter<FormGroup> =
new EventEmitter<FormGroup>();
@Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
public paiementForm!: FormGroup;
  constructor(public ref: DynamicDialogRef, private _store: Store<AppState>) {
    super();
   }

  ngOnInit(): void {
    console.log(this.bon)
    this.paiementForm = this.startingForm;
    console.log('paiementForm',this.paiementForm)
    this.subformInitialized.emit(this.paiementForm);
    const pipe = new DatePipe('en-US');
    const date = new Date();
    const currentDate = pipe.transform(date, 'yyyy-MM-dd');
    this.paiementForm.patchValue({
      datePaiement: currentDate,
      bon: this.bon.data
    })
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
  submit = () => {
    this.submitForm.emit();
  };
  close() {
    this.ref.close();
  }
  onChangeMode(event:any){
    this.paiementForm.patchValue({
      modePaiement: event.value,
    })
    console.log('paiementForm',this.paiementForm)
    if(event.value === 'Virement ou chèque (dont Titre)') {
      this.cheque = true
      this.numerique = false
    } else if (event.value === 'En Numéraire'){
      this.numerique = true
      this.cheque = false
    } else {
      this.cheque = false
      this.numerique = false
    }
  }
}
