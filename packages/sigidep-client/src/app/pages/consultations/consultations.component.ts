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
import { getDataSelector as getDataEngSelector, getLoadingSelector as getLoadingEngSelector} from '@reducers/engagement-juridique.reducer';
import { getDataSelector as getDataMadSelector, getLoadingSelector as getLoadingMadSelector } from '@reducers/engagement-mandat.reducer';
import { GetEngagementMandats } from '@actions/engagement-mandat.actions';
import { GetEngagementJuridiques } from '@actions/engagement-juridique.actions';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent extends BaseComponent implements OnInit {
  public busy = false;
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  encours: any[] = [];
  engagements: any;
  mandats: any;
  loading$: Observable<boolean> = of(true);
  public globalColumns!: string[];
  public formImputation!: FormGroup;
  public formMandat!: FormGroup;
  public formEngagement!: FormGroup;
  public imputation: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService
  ) {
    super();
    this.formImputation = this._fb.group({
      imputation: [undefined, [Validators.required]],
    });

    this.formEngagement = this._fb.group({
      engagement: [undefined, [Validators.required]],
    });
    this.formMandat = this._fb.group({
      mandat: [undefined, [Validators.required]],
    });
  }

  get form1() {
    return this.formImputation.controls;
  }

  get form2() {
    return this.formEngagement.controls;
  }

  get form3() {
    return this.formMandat.controls;
  }

  ngOnInit(): void {}

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
    this._initListeners();
  }

  submit() {
    this.busy = true;
    const editedImputation = this.form1.imputation.value;
    console.log(editedImputation);
    this._store.dispatch(GetImputations({ imputation: editedImputation }));
    this.initTable();
    console.log(this.encours);
    this.busy = false;
  }
  submitMandat() {
    this.busy = true;
    const editedMandat = this.form3.mandat.value;
    console.log(editedMandat);
    this._store.dispatch(GetEngagementMandats({ numeros: editedMandat }));
    this.initTable();
    this.busy = false;
  }
  submitEngagement() {
    this.busy = true;
    const editedEngagement:string = this.form2.engagement.value;
    console.log(editedEngagement);
    this._store.dispatch(
      GetEngagementJuridiques({ numeros: editedEngagement })
    );
    this.initTable();
    this.busy = false;
  }
  private _initListeners() {
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

    this._store
    .pipe(this.takeUntilDestroy, select(getDataEngSelector))
    .subscribe((data) => {
      this.engagements = [...data];
      if (this.engagements) this.imputation = false;
      console.log('engagements ', this.engagements);
    });
  this.loading$ = this._store.pipe(
    select(getLoadingEngSelector),
    map((status) => status)
  );

  this._store
  .pipe(this.takeUntilDestroy, select(getDataMadSelector))
  .subscribe((data) => {
    this.mandats = [...data];
    if (this.mandats) this.imputation = false;
    console.log('mandats ', this.mandats);
  });
this.loading$ = this._store.pipe(
  select(getLoadingMadSelector),
  map((status) => status)
);
  }
  detail(item: EncoursModel) {
    this._dialogService.launchImputationEtatDialog(item);
  }
}
