import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@reducers/index';
import { GetImputations } from '@actions/consultations.actions';
import { DialogsService } from '@services/dialogs.service';
import { EncoursModel } from '@models/encours.model';
import {
  getDataSelector as getDataImpSelector,
  getLoadingSelector as getLoadingImpSelector,
} from '@reducers/consultations.reducer';
import {
  getDataSelector as getDataEngSelector,
  getLoadingSelector as getLoadingEngSelector,
} from '@reducers/engagement-juridique.reducer';
import {
  getDataSelector as getDataMadSelector,
  getLoadingSelector as getLoadingMadSelector,
} from '@reducers/bons-engagements.reducer';
import { GetBonsEngagements } from '@actions/bons-engagements.actions';
import { GetEngagementJuridiques } from '@actions/engagement-juridique.actions';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';
import {
  getDataSelector as getDataSelectorCommande,
  getLoadingSelector as getLoadingSelectorCommande,
} from '@reducers/engagement-commande.reducer';
import {
  getDataSelector as getDataSelectorDecission,
  getLoadingSelector as getLoadingSelectorDecission,
} from '@reducers/engagement-decision.reducer';
import {
  getDataSelector as getDataSelectorMission,
  getLoadingSelector as getLoadingSelectorMission,
} from '@reducers/engagement-mission.reducer';
import { Engagement } from 'app/utils/types';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent extends BaseComponent implements OnInit {
  public busy = false;
  data: any;
  bons: any;
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  encours: any[] = [];
  engagements: any;
  mandatConsonEnga: any;
  bonsEngagements: any[]=[];
  imputation1: boolean = true;
  bon: boolean = true;
  consulterM: any;
  engagement: boolean = true;
  loading$: Observable<boolean> = of(true);
  public globalColumns!: string[];
  public form!: FormGroup;
  public imputation: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService
  ) {
    super();
    this.form = this._fb.group({
      imputation: [undefined],
      bonEngagement: [undefined],
      engagement: [undefined],
    });
    this._initListeners();
  }

  get form1() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this._store.dispatch(GetEngagementJuridiques({}));
    this._store.dispatch(GetBonsEngagements({}));
  }

  initTable() {
    this.tableColumns = [
      {
        field: 'exercise', //TODO: exerciseCode
        title: 'tables.headers.exercice',
        sortable: true,
      },
      {
        field: 'subProgram',
        title: 'tables.headers.sousProgram',
        sortable: true,
      },
      {
        field: 'action',
        title: 'tables.headers.action',
        sortable: true,
      },
      {
        field: 'activity',
        title: 'tables.headers.activity',
        sortable: true,
      },

      {
        field: 'task',
        title: 'tables.headers.task',
        sortable: true,
      },

      {
        field: 'imputation',
        title: 'tables.headers.imputation',
        sortable: true,
      },
      {
        field: 'operation',
        title: 'tables.headers.operation',
        sortable: true,
      },
    ];
    this.globalColumns = this.tableColumns.map((item) => item.field);
    if (this.form1.imputation.value) {
      this._store
        .pipe(this.takeUntilDestroy, select(getDataImpSelector))
        .subscribe((data) => {
          this.encours = [...data];
          if (this.encours) this.imputation = true;
          else this.imputation = false;
          console.log('encours ', this.encours);
        });
      this.loading$ = this._store.pipe(
        select(getLoadingImpSelector),
        map((status) => status)
      );
    }
  }

  submit() {
    if (this.form1.imputation.value) {
      this.busy = true;
      const editedImputation = this.form1.imputation.value;
      console.log(editedImputation);
      this._store.dispatch(GetImputations({ imputation: editedImputation }));
      this.initTable();
      this.busy = false;
    }

    if (this.form1.bonEngagement.value) {
      this.busy = true;
      this._dialogService.launchBonEngagementCreateDialog(
        'decision',
        this.consulterM,
        'consulterM'
      );
      this.busy = false;
    }

    if (this.form1.engagement.value) {
      this.busy = true;
      console.log(this.form1.engagement.value)
      this._dialogService.launchBonEngagementCreateDialog(
        'decision',
        this.engagements[0],
        'consulterC'
      );
      this.busy = false;
    }
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataEngSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log("Eng ",this.data);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingEngSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getDataMadSelector))
      .subscribe((data) => {
        this.bonsEngagements = [...data];
       if (this.bonsEngagements) this.imputation = false;
  //      console.log('bons enagements ', this.bonsEngagements);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingMadSelector),
      map((status) => status)
    );
  }
  detail(item: EncoursModel) {
    this._dialogService.launchImputationEtatDialog(item);
  }

  getDataEngagement(item: any, numero: any) {
    console.log('item ', item);
    if (item === '1110' || item === '1111' || item === '1115') {
      this._store.dispatch(
        GetEngagementCommandes({
          procedures: [item],
          numeros: [numero],
        })
      );

      this._store
        .pipe(this.takeUntilDestroy, select(getDataSelectorCommande))
        .subscribe((data) => {
          this.engagements = [...data];
          // this._dialogService.launchBonEngagementCreateDialog('commande', this.engagements[0]);
        });
      this.loading$ = this._store.pipe(
        select(getLoadingSelectorCommande),
        map((status) => status)
      );
    }

    if (
      item === '1122' ||
      item === '1123' ||
      item === '1124' ||
      item === '1125' ||
      item === '1126'
    ) {
      this._store.dispatch(
        GetEngagementDecisions({
          procedures: [item],
          numeros: [numero],
        })
      );

      this._store
        .pipe(this.takeUntilDestroy, select(getDataSelectorDecission))
        .subscribe((data) => {
          this.engagements = [...data];
          // this._dialogService.launchBonEngagementCreateDialog('decision', this.engagements[0]);
        });
      this.loading$ = this._store.pipe(
        select(getLoadingSelectorDecission),
        map((status) => status)
      );
    }

    if (item === '1121') {
      this._store.dispatch(
        GetEngagementMissions({
          procedures: [item],
          numeros: [numero],
        })
      );

      this._store
        .pipe(this.takeUntilDestroy, select(getDataSelectorMission))
        .subscribe((data) => {
          this.engagements = [...data];
          // this._dialogService.launchBonEngagementCreateDialog('mission', this.engagements[0]);
        });

      this.loading$ = this._store.pipe(
        select(getLoadingSelectorMission),
        map((status) => status)
      );
    }
  }

  modelChanged(event: any, name: string) {
    const value = event;
    //console.log(value)
    if (value) {
      if (name === 'imputation') {
        this.bon = false;
        this.engagement = false;
      } else if (name === 'bonEngagement' && value.value !== null) {
        this.imputation1 = false;
        this.engagement = false;
        const act = this.bonsEngagements.find(
          (item: any) => item.id === event.value
        );
        //console.log(act);
        if (act) {
          this.consulterM = act;
        }
      } else if (name === 'engagement' && value.value !== null) {
        this.imputation1 = false;
        this.bon = false;

        const act: Engagement | undefined = this.data.find(
          (item: any) => item.id === event.value
        );
       // console.log(act);
        if (act) {
          this.getDataEngagement(act?.codeProcedure, act?.numero);
        }
      } else if (value.value === null) {
        console.log(value.value);
        this.imputation1 = true;
        this.bon = true;
        this.engagement = true;
      }
    } else {
      this.imputation1 = true;
      this.bon = true;
      this.engagement = true;
    }
    console.log('value', event);
  }
}
