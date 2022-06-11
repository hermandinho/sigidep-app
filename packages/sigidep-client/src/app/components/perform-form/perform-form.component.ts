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

@Component({
  selector: 'app-perform-form',
  templateUrl: './perform-form.component.html',
  styleUrls: ['./perform-form.component.scss'],
})
export class PerformFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Input() dataEngagement!: any;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public performForm!: FormGroup;
  data: EncoursModel[] = [];
  loading$: Observable<boolean> = of(true);
  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef
    //private _appService: AppService
  ) {
    super();
    //this._initListeners()
  }

  ngOnInit(): void {
    //this._appService.currentProcedureChange.subscribe((val) => {
      //this.procedure = val;
    //});
    this.performForm = this.startingForm;
    this.subformInitialized.emit(this.performForm);
    if (this.readOnly) this.performForm.disable();
    this.performForm.controls['livrables'].disable();
    this.performForm.controls['sourceVerif'].disable();
    this.getEncour();
  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  getEncour() {
    const imputation = JSON.parse(localStorage.getItem('imputation')!!);
    this._store.dispatch(GetImputations({ imputation: imputation }));
    this._initListeners();
  }

  submit = () => {
    this.submitForm.emit();
  };
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        this.onEncourChange(this.data[0]);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  onEncourChange = (data: any) => {
    if (data)
      this.performForm.patchValue({
        livrables: data.livrables,
        sourceVerif: data.sourceVerif,
      });
  };

  close() {
    this.ref.close();
  }
}
