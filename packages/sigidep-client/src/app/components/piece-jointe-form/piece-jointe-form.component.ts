import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import { map } from 'rxjs/operators';
import { PieceJointeModel } from '../../models/piece-jointe.model';
import { Observable, of } from 'rxjs';
import {
  DeletePieceJointe,
  DeletePieceJointeFailure,
  DeletePieceJointeSuccess,
  GetPiecesJointes,
} from '@actions/piece-jointe.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/pieces-jointes.reducer';

@Component({
  selector: 'app-piece-jointe-form',
  templateUrl: './piece-jointe-form.component.html',
  styleUrls: ['./piece-jointe-form.component.scss']
})
export class PieceJointeFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() data: any;
  @Input() piecesJointes!: PieceJointeModel[];
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public traitementLiquidationForm!: FormGroup;
  dataPieceJointes: PieceJointeModel[] = [];
  dataPieceJointesSelect: PieceJointeModel[] = [];
  loading$: Observable<boolean> = of(true);
  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    private _appService: AppService
  ) {
    super()
    this._initListeners();
  }

 async ngOnInit() {
    this.traitementLiquidationForm = this.startingForm;
    console.log('traitementLiquidationForm',this.traitementLiquidationForm)
    this.subformInitialized.emit(this.traitementLiquidationForm);
    this._store.dispatch(GetPiecesJointes());
   await this.setValue()

  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  submit = () => {
    this.traitementLiquidationForm.patchValue({
      piecesJointe: JSON.stringify(this.dataPieceJointesSelect)
    });
    console.log(this.traitementLiquidationForm)
    this.submitForm.emit();
  };

  close() {
    this.ref.close();
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.dataPieceJointes = [...data];
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

  }

  add(elt: PieceJointeModel){
    if(this.dataPieceJointesSelect.includes(elt) === false){
    this.dataPieceJointesSelect.push(elt)
    }
    if(this.dataPieceJointes.includes(elt)){
      const index = this.dataPieceJointes.indexOf(elt);
      console.log('index ', index)
      this.dataPieceJointes.splice(index,1);
    }

  }

  remove(elt: PieceJointeModel){
    if(this.dataPieceJointesSelect.includes(elt)){
      const index = this.dataPieceJointesSelect.indexOf(elt);
      console.log('index ', index)
      this.dataPieceJointesSelect.splice(index,1);
    }
    this.dataPieceJointes.push(elt)
  }
  setValue(){
    if(this.piecesJointes){
      console.log(this.piecesJointes)
      this.dataPieceJointesSelect = this.piecesJointes;
      this.piecesJointes.forEach(elt => {
        if(this.dataPieceJointes.includes(elt)){
          const index = this.dataPieceJointes.indexOf(elt);
          console.log('index ', index)
          this.dataPieceJointes.splice(index,1);
        }
      })
    }
  }
}
