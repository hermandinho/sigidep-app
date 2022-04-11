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

import {
  getDataSelector as getContribuablesBudgetDataSelector,
  getLoadingSelector as getContribuablesBudgetLoadingSelector,
} from '@reducers/contribuables-budgetaires.reducer';

import {
  getLoadingSelector as getEncoursLoadingSelector,
  getDataSelector as getEncoursDataSelector,
} from '@reducers/encours.reducer';

import {
  getLoadingSelector as getAgentsLoadingSelector,
  getDataSelector as getAgentsDataSelector,
} from '@reducers/agents.reducer';

import {
  getLoadingSelector as getAdminUnitLoadingSelector,
  getDataSelector as getAdminUnitDataSelector,
} from '@reducers/administrative-units.reducer';

import { GetContribuables } from '@actions/contribuables.actions';
import { ContribuableModel } from '@models/contribuable.model';
import { EncoursModel } from '@models/encours.model';
import { GetEncours } from '@actions/encours.actions';
import { GetAdministrativeUnites } from '@actions/administrative-units.actions';
import { AdministrativeUnitModel } from '@models/administrative-unit.model';
import { GetAgents } from '@actions/agents.actions';
import { AgentModel } from '@models/agent.model';
import { ContribuableBugetaireModel } from '@models/contribuable-budgetaire.model';

@Component({
  selector: 'app-engagement-decision',
  templateUrl: './engagement-decision.component.html',
  styleUrls: ['./engagement-decision.component.scss'],
})
export class EngagementDecisionComponent
  extends BaseComponent
  implements OnInit
{
  @Input() startingForm!: FormGroup;
  @Input() procedure!: string;
  @Input() montantAE!: number;
  @Input() readOnly!: boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public decisionForm!: FormGroup;
  public taxes!: ExecTaxesModel[];
  loading$: Observable<boolean> = of(true);
  public contribuables!: ContribuableModel[];

  public contribuablesBudget!: ContribuableBugetaireModel[];

  public exercises: string[] = [];
  public encoursList!: EncoursModel[];

  public adminUnits!: AdministrativeUnitModel[];

  public agents!: AgentModel[];

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
    this._store.dispatch(GetEncours());
    this._store.dispatch(GetAgents());
    this._store.dispatch(GetAdministrativeUnites());
    this._store.dispatch(GetContribuables());
    this._store
      .pipe(this.takeUntilDestroy, select(getEncoursDataSelector))
      .subscribe((EncoursData) => {
        this.exercises = [...new Set(EncoursData.map((item) => item.exercise))];
      });

    this.loading$ = this._store.pipe(
      select(getEncoursLoadingSelector),
      map((status) => status)
    );
    this._store
      .pipe(this.takeUntilDestroy, select(getAdminUnitDataSelector))
      .subscribe((adminUnitData) => {
        this.adminUnits = adminUnitData;
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getAgentsDataSelector))
      .subscribe((data) => {
        this.agents = data;
      });

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
      .pipe(this.takeUntilDestroy, select(getContribuablesBudgetDataSelector))
      .subscribe((data) => {
        this.contribuablesBudget = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getContribuablesBudgetLoadingSelector),
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
    this.decisionForm = this.startingForm;
    if (this.readOnly) this.decisionForm.disable();
    this.decisionForm.patchValue({
      montantBrut: this.montantAE,
    });

    if (this.procedure === '1123') {
      this.decisionForm.patchValue({
        netAPercevoir: this.montantAE,
      });
    }

    this.subformInitialized.emit(this.decisionForm);
    this.decisionForm.controls['tauxTVA'].disable();
    this.decisionForm.controls['tauxIR'].disable();
    this.decisionForm.controls['raisonSociale'].disable();
    this.decisionForm.controls['nomBeneficaire'].disable();
    this.decisionForm.controls['montantBrut'].disable();
    this.decisionForm.controls['codeAgenceContribuable'].disable();
    this.decisionForm.controls['codeBanqueContribuable'].disable();
    this.decisionForm.controls['numeroCompteContribuable'].disable();
    this.decisionForm.controls['cleCompteContribuable'].disable();

    this.decisionForm.controls['codeUnitAdminBenef'].disable();
    this.decisionForm.controls['nomUnitAdminBenef'].disable();
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
      this.decisionForm.patchValue({
        tauxTVA: taxe.TxTVA,
        tauxIR: taxe.TxIR,
      });
  };

  onContribuableChange = (event: any) => {
    let contribuable;
    if (this.decisionForm.value?.isContribuable === true) {
      contribuable = this.contribuables.find(
        (item) => item.code === event.value
      );
    } else {
      contribuable = this.contribuablesBudget.find(
        (item) => item.code === event.value
      );
    }

    if (contribuable)
      this.decisionForm.patchValue({
        raisonSociale: contribuable.raisonSociale,
        codeBanqueContribuable: contribuable.banque.code,
        codeAgenceContribuable: contribuable.agence.code,
        numeroCompteContribuable: contribuable.numeroCompte,
        cleCompteContribuable: contribuable.cle,
        nomContribBudget: contribuable.raisonSociale,
      });
  };

  onAdminUnitChange = (event: any) => {
    const adminUnit = this.adminUnits.find((item) => item.code === event.value);
    if (adminUnit)
      this.decisionForm.patchValue({
        codeUnitAdminBenef: adminUnit.code,
        nomUnitAdminBenef: adminUnit.formattedLabelFr,
      });
  };

  onAgentChange = (event: any) => {
    const agent = this.agents.find((item) => item.matricule === event.value);
    if (agent) {
      this.decisionForm.patchValue({
        nomBeneficiaire: agent.nom,
      });
    }
  };
}
