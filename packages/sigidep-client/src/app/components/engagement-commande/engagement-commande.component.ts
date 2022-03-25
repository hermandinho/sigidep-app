import { GetTaxes } from '@actions/exec-taxes.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExecTaxesModel } from '@models/exec-taxes.model';
import {
  getDataSelector as getTaxesDataSelector,
  getLoadingSelector as getTaxesLoadingSelector,
} from '@reducers/exec-taxes.reducer';

@Component({
  selector: 'app-engagement-commande',
  templateUrl: './engagement-commande.component.html',
  styleUrls: ['./engagement-commande.component.scss'],
})
export class EngagementCommandeComponent
  extends BaseComponent
  implements OnInit
{
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public commandForm!: FormGroup;
  public taxes!: ExecTaxesModel[];
  loading$: Observable<boolean> = of(true);
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
  }
  ngOnInit() {
    this._store.dispatch(GetTaxes());
    this._store
      .pipe(this.takeUntilDestroy, select(getTaxesDataSelector))
      .subscribe((data) => {
        this.taxes = [...data];
      });
    this.loading$ = this._store.pipe(
      select(getTaxesLoadingSelector),
      map((status) => status)
    );
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
