import { GetTaxes } from '@actions/exec-taxes.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExecTaxesModel } from '@models/exec-taxes.model';
import {
  getDataSelector as getTaxesDataSelector,
  getLoadingSelector as getTaxesLoadingSelector,
} from '@reducers/exec-taxes.reducer';
import {
  getDataSelector as getContribuablesDataSelector,
  getLoadingSelector as getContribuablesLoadingSelector,
} from '@reducers/contribuables.reducer';
import { GetContribuables } from '@actions/contribuables.actions';
import { ContribuableModel } from '@models/contribuable.model';

@Component({
  selector: 'app-engagement-commande',
  templateUrl: './engagement-commande.component.html',
  styleUrls: ['./engagement-commande.component.scss'],
})
export class EngagementCommandeComponent
  extends BaseComponent
  implements OnInit
{
  @Input() readOnly!: boolean;
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
  public contribuables!: ContribuableModel[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _store: Store<AppState>
  ) {
    super();
  }
  ngOnInit() {
    this._store.dispatch(GetTaxes());
    this._store.dispatch(GetContribuables());
    this._store
      .pipe(this.takeUntilDestroy, select(getContribuablesDataSelector))
      .subscribe((data) => {
        this.contribuables = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getContribuablesLoadingSelector),
      map((status) => status)
    );
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
    if (this.readOnly) this.commandForm.disable();
    this.commandForm.controls['tauxTVA'].disable();
    this.commandForm.controls['tauxIR'].disable();
    this.commandForm.controls['raisonSociale'].disable();
    this.commandForm.controls['codeAgenceContribuable'].disable();
    this.commandForm.controls['codeBanqueContribuable'].disable();
    this.commandForm.controls['numeroCompteContribuable'].disable();
    this.commandForm.controls['cleCompteContribuable'].disable();
  }
  doChangeStep = (direction: 'back') => {
    this.changeStep.emit(direction);
  };
  submit = () => {
    this.submitForm.emit();
  };

  onTaxeChange = (event: any) => {
    const taxe = this.taxes.find((item) => item.id === event.value);
    if (taxe)
      this.commandForm.patchValue({
        tauxTVA: taxe.TxTVA,
        tauxIR: taxe.TxIR,
      });
  };

  onContribuableChange = (event: any) => {
    const contribuable = this.contribuables.find(
      (item) => item.code === event.value
    );
    if (contribuable)
      this.commandForm.patchValue({
        raisonSociale: contribuable.raisonSociale,
        codeBanqueContribuable: contribuable.banque.code,
        codeAgenceContribuable: contribuable.agence.code,
        numeroCompteContribuable: contribuable.numeroCompte,
        cleCompteContribuable: contribuable.cle,
      });
  };
}
