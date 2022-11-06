import { GetImputations } from '@actions/consultations.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/consultations.reducer';
import { map } from 'rxjs/operators';
import { EncoursModel } from '@models/encours.model';
import { Observable, of } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ConsultationsModule } from '@pages/consultations/consultations.module';

@Component({
  selector: 'app-perform-form',
  templateUrl: './perform-form.component.html',
  styleUrls: ['./perform-form.component.scss'],
})
export class PerformFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Input() procedure!: string;
  @Input() dataEngagement!: any;
  @Input() isCheck!: boolean;
  @Input() validation!:boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public performForm!: FormGroup;
  data: EncoursModel[] = [];
  loading$: Observable<boolean> = of(true);
  open:boolean=false
  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    private _appService: AppService
  ) {
    super();
    this._initListeners()
  }

  ngOnInit(): void {
    console.log(this.dataEngagement)
    if(this.dataEngagement!=undefined){
      this.open=true;
    }
    if (!this.procedure) {
      this.procedure = this._appService.currentProcedure;
      console.log(this.procedure)
    }
    this.performForm = this.startingForm;
    this.subformInitialized.emit(this.performForm);
    if (this.readOnly) this.performForm.disable();
    this.performForm.controls['livrables'].disable();
    this.performForm.controls['sourceVerif'].disable();
    this.getEncour();
    if (this.dataEngagement)
    this.performForm.patchValue({
     situationActuelle: this.dataEngagement?.situationActuelle,
    });
  }
  doChangeStep = (direction: any) => {
    this._appService.setCurrentProcedure(this.procedure);
    this.changeStep.emit(direction);
  };

  getEncour() {
    const imputation = JSON.parse(localStorage.getItem('imputation')!!);
    this._store.dispatch(GetImputations({ imputation: imputation }));
    this._initListeners();
  }

  submit = () => {
    this._appService.setCurrentProcedure(this.procedure);
    this.submitForm.emit();
  };
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log(data)
        if(this.data && this.data.length>0){
          this.onEncourChange(this.data[0]);
        }
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  onEncourChange = (data: any) => {
      this.performForm.patchValue({
        livrables: data?.livrables,
        sourceVerif: data?.sourceVerif,
      });
  };

  close() {
    this.ref.close();
  }
}
