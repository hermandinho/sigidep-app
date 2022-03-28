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
  getDataSelector as getBaremeDataSelector,
  getLoadingSelector as getBaremeLoadingSelector,
} from '@reducers/baremes.reducer';
import {
  getDataSelector as getAgentsDataSelector,
  getLoadingSelector as getAgentsLoadingSelector,
} from '@reducers/agents.reducer';

import { TypeMissionEnum } from '@models/engagement-mission.model';
import { AgentModel } from '@models/agent.model';
import { GetAgents } from '@actions/agents.actions';
import * as moment from 'moment';
import { GetBaremes } from '@actions/baremes.actions';
import { BaremeMissionModel } from '@models/bareme-mission.model';

@Component({
  selector: 'app-engagement-mission',
  templateUrl: './engagement-mission.component.html',
  styleUrls: ['./engagement-mission.component.scss'],
})
export class EngagementMissionComponent
  extends BaseComponent
  implements OnInit
{
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public missionForm!: FormGroup;
  public taxes!: ExecTaxesModel[];
  typeMissionEnum = TypeMissionEnum;
  loading$: Observable<boolean> = of(true);
  public agents!: AgentModel[];

  public baremes!: BaremeMissionModel[];

  public typesMission = Object.keys(TypeMissionEnum).map((key) => ({
    label: (TypeMissionEnum as any)[key],
    value: key,
  }));

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
    this._store.dispatch(GetAgents());
    this._store.dispatch(GetBaremes());
    this._store
      .pipe(this.takeUntilDestroy, select(getAgentsDataSelector))
      .subscribe((data) => {
        this.agents = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getAgentsLoadingSelector),
      map((status) => status)
    );
    this._store
      .pipe(this.takeUntilDestroy, select(getBaremeDataSelector))
      .subscribe((data) => {
        this.baremes = [...data];
      });
    this.loading$ = this._store.pipe(
      select(getBaremeLoadingSelector),
      map((status) => status)
    );
    this.missionForm = this.startingForm;
    this.subformInitialized.emit(this.missionForm);
    if (this.readOnly) this.missionForm.disable();
    this.missionForm.controls['nomBeneficiaire'].disable();
    this.missionForm.controls['montant'].disable();
    this.missionForm.controls['nombreJours'].disable();
  }
  doChangeStep = (direction: 'back') => {
    this.changeStep.emit(direction);
  };
  submit = () => {
    this.submitForm.emit();
  };

  onChangeDate = (event: any) => {
    const dateDebut = moment(this.missionForm.value?.dateDebut);
    const dateFin = moment(this.missionForm.value?.dateFin);

    if (this.missionForm.value?.dateDebut && this.missionForm.value?.dateFin) {
      this.missionForm.patchValue({
        nombreJours: dateFin.diff(dateDebut, 'days'),
      });
    }
    this.onBaremeChange();
  };
  onBaremeChange = (event?: any) => {
    let bareme;
    if (event) {
      bareme = this.baremes.find((item) => item.id === event.value);
    } else {
      const baremeId = this.missionForm.getRawValue()?.baremeJour;
      bareme = this.baremes.find((item) => item === baremeId);
    }
    if (bareme)
      this.missionForm.patchValue({
        montant:
          bareme.montant * (this.missionForm.getRawValue()?.nombreJours ?? 0),
      });
  };

  onMatriculeChange = (event: any) => {
    const agent = this.agents.find((item) => item.matricule === event.value);
    if (agent)
      this.missionForm.patchValue({
        nomBeneficiaire: agent.nom,
      });
  };
}
