import { GestionnaireModel } from './../../models/gestionnaire.model';
import { AppService } from './../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from './../../components/base.component';
import { map } from 'rxjs/operators';
import { SetAppBreadcrumb } from './../../store/actions/app.actions';
import { AppState } from './../../store/reducers/index';
import { Store, select } from '@ngrx/store';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import {
  DeleteAccreditations,
  DeleteAccreditationsFailure,
  DeleteAccreditationsSuccess,
  GetAccreditations,
} from '@actions/accreditaions.actions';
import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/accreditation.reducer';

@Component({
  selector: 'app-accreditations-gestionnaires',
  templateUrl: './accreditations-gestionnaires.component.html',
  styleUrls: ['./accreditations-gestionnaires.component.scss'],
})
export class AccreditationsGestionnairesComponent
  extends BaseComponent
  implements OnInit
{
  data: AccreditationGestionnaireModel[] = [];
  selectedItems: any[] = [];
  loading$: Observable<boolean> = of(true);
  tableColumns: any[] = [];

  constructor(
    private _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    private readonly _appService: AppService
  ) {
    super();

    this.tableColumns = [
      { field: 'matricule', title: 'tables.headers.matricule', sortable: true },
      {
        field: 'nom',
        title: 'tables.headers.nom',
        sortable: true,
      },
      {
        field: 'prenom',
        title: 'tables.headers.prenom',
        sortable: true,
      },
    ];

    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetAccreditations());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.accreditationsgestionnaires',
          },
        ],
      })
    );
  }

  // MODAL FORM FOR BANK
  async openForm() {
    this._dialogService.launchAccreditationsGestionnairesCreateDialog();
  }

  edit(item: GestionnaireModel) {
    this._dialogService.launchAccreditationsGestionnairesCreateDialog(item);
  }

  listInputation(item: any) {
    this._dialogService.launchAccreditationsGestionnairesListInputation(item);
  }

  delete(item: GestionnaireModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteGestionnaire',
      accept: () => {
        this._store.dispatch(DeleteAccreditations({ id: item.id }));
      },
    });
  }
  // -- END -- MODAL FORM FOR BANK

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new AccreditationGestionnaireModel({
              ...d,
            })
        );
        console.log(data);
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteAccreditationsSuccess, DeleteAccreditationsFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteAccreditationsFailure.type) {
          if (action.error?.statusCode === 403) {
            this._appService.showUnauthorizedActionToast();
          } else {
            this._appService.showToast({
              severity: 'error',
              summary: 'errors.error',
              detail: 'errors.error',
              closable: true,
            });
          }
        } else if (action.type === DeleteAccreditationsSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.accreditation.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
  download() {
    // table_content
    let pdf = new jsPDF();
    let data: any = document.getElementById('table_content');
    html2canvas(data).then((canvas) => {
      let imgdata = canvas.toDataURL('image/image.png');
      pdf.addImage(imgdata, 'PNG', 10, 10, 185, 95);
      pdf.save(
        'accreditations-' +
          moment(new Date()).format('YYYY-MM-DD hh:mm:ss') +
          '.pdf'
      );
    });
  }
}
