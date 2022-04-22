import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { EncoursModel } from '@models/encours.model';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@reducers/index';
import { getDataSelector, getLoadingSelector } from '@reducers/encours.reducer';
import { GetImputations } from '@actions/imputations.actions';
import { Router } from '@angular/router';
import { DialogsService } from '@services/dialogs.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent extends BaseComponent implements OnInit {

  public busy = false;
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EncoursModel[] = [];
  loading$: Observable<boolean> = of(true);
  public globalColumns!: string[];
  public formImputation!: FormGroup;
  public imputation: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService,

  ) {
    super();
    this.formImputation = this._fb.group({
      imputation: [undefined, [Validators.required]],
    });
  }

  get form1() {
    return this.formImputation.controls;
  }

  ngOnInit(): void {


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
      }
     ];
    this.globalColumns = this.tableColumns.map((item) => item.field);
    this._initListeners();
  }


  submit() {
    this.busy = true;
    const editedImputation =
      this.form1.imputation.value
    ;
    console.log(editedImputation)
    this._store.dispatch(GetImputations({ imputation: editedImputation }));
    this.initTable();
    console.log(this.data)
    this.busy = false;
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        if (this.data)
          this.imputation = true;
        else
          this.imputation = false;
        console.log("data ",this.data );
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }
  detail(item: EncoursModel) {
    this._dialogService.launchImputationEtatDialog(item);
  }

}
