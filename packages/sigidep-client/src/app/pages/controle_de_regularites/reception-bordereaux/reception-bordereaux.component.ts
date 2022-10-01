import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../components/base.component';
import { Observable, of } from 'rxjs';
import { TransmissionsReceptionModel } from '../../../models/transmission-reception.model';
import { DataModel } from '../../../models/data.model';
import { DialogsService } from '../../../services/dialogs.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/reducers/index';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../services/app.service';
import { ApisService } from '../../../services/apis.service';
import { TableColumnsTransmission, TableColumnsBordereau } from './consts';
import { GetTransmissionsReceptions } from '../../../store/actions/transmissions-receptions.actions';
import { EtatBonEnum } from '../../../utils/etat-bon-engagement.enum';
import { GetExercises } from '../../../store/actions/exercises.actions';
import { SetAppBreadcrumb } from '../../../store/actions/app.actions';
import { map } from 'rxjs/operators';
import { GetTransmissionsReceptionsDetails } from '../../../store/actions/detail-transmissions-receptions.actions';
import { getDataSelector as getDataSelectorTrans, getLoadingSelector as getLoadingSelectorTrans } from '@reducers/transmissions-receptions.reducer';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';

@Component({
  selector: 'app-reception-bordereaux',
  templateUrl: './reception-bordereaux.component.html',
  styleUrls: ['./reception-bordereaux.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceptionBordereauxComponent extends BaseComponent
implements OnInit {
public busy = false;
public tableColumnsTransmission: any[] = [];
public tableColumnsBordereau: any[] = [];
public bordereauxTransmissions: any[] = [];
public dossiersBordereaux: any[] = [];
public globalColumnsTransmission!: string[];
public globalColumnsBordereaux!: string[];
menus!: MenuItem[];
loading$: Observable<boolean> = of(true);
loading1$: Observable<boolean> = of(true);
public currentItem!: TransmissionsReceptionModel;
public filters: any[] = [];
public selectedFilters!: string[];
data: any[] = [];
data1!: DataModel;
public exercices: any;
click = false;




constructor(
  private readonly _dialogService: DialogsService,
  private _store: Store<AppState>,
  public translate: TranslateService,
  private readonly _appService: AppService,
  private _apisService: ApisService,


) {
  super();
  this.tableColumnsTransmission = TableColumnsTransmission;
  this.tableColumnsBordereau = TableColumnsBordereau;
  this.globalColumnsTransmission = this.tableColumnsTransmission.map((item) => item.field);
  this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
  this._initListeners();
}

ngOnInit(): void {
  this._store.dispatch(
    GetTransmissionsReceptions({objets:[EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE]})
  );
  this._store.dispatch(
    GetExercises({})
  );

  this._store.dispatch(
    SetAppBreadcrumb({
      breadcrumb: [
        {
          label: 'breadcrumb.receptionBordereaux',
        },
      ],
    })
  );

}

handleFilter = (event: any) => {
  if (event?.value) {
    this._store.dispatch(
      GetTransmissionsReceptions({ exercices: [event?.value[0]?.toLowerCase()],objets:[EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE] })
    );
  } else {
    this._store.dispatch(
      GetTransmissionsReceptions({objets:[EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE]})
    );
  }

};

get currentLang() {
  return this.translate.currentLang;
}

get currentLangCurrencyFormat() {
  return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
}

private _initListeners() {
  this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorTrans))
    .subscribe((data) => {
      console.log(data)
      if (data !== null) {
        this.bordereauxTransmissions = [...data];
        if (this.bordereauxTransmissions === null) this.bordereauxTransmissions = [];
        console.log('bordereauxTransmissions ', this.bordereauxTransmissions)
      }


    });

  this.loading$ = this._store.pipe(
    select(getLoadingSelectorTrans),
    map((status) => status)
  );


  this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorEx))
    .subscribe((data) => {
      this.exercices = [...data];
      console.log('exercices ', this.exercices)

    });

  this.loading1$ = this._store.pipe(
    select(getLoadingSelectorEx),
    map((status) => status)
  );


}

async add(item: any) {
  this.click = true
  this._store
  .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
  .subscribe((data) => {
    this.dossiersBordereaux = [...data];
    console.log('dossiersBordereaux ', this.dossiersBordereaux)

  });

this.loading1$ = this._store.pipe(
  select(getLoadingSelectorDetail),
  map((status) => status)
);
  this._store.dispatch(
    GetTransmissionsReceptionsDetails({ ids: [item.id]})
  );
}

delete() {
  this.click = false
  this.dossiersBordereaux = [];
}

reception() {
  if(this.dossiersBordereaux.length>0){
    const data1:DataModel = {
      data : this.dossiersBordereaux,
      action: 'reception-borbereaux-regularite',
      motif:''
    }
    console.log('data1 ',data1)
    const method: Observable<any> = this._apisService.put<any>(
      '/transmissions-receptions',
      data1
    );
    method.subscribe(
      (res) => {
        this.busy = false;

        this._store.dispatch(
          GetTransmissionsReceptions({objets:[EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE]})
        );
        this._appService.showToast({
          summary: 'messages.success',
          detail: 'dialogs.messages.reception',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.transmission.notfound';
        } else {
          err = 'errors.unknown';
        }
        this.busy = false;
        this._appService.showToast({
          detail: err,
          summary: 'errors.error',
          severity: 'error',
          life: 5000,
          closable: true,
        });
      }
    );
  }

}


}
