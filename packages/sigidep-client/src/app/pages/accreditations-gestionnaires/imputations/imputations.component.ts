import { GetAccreditations, GetAccreditationsByGestionnaire } from '@actions/accreditaions.actions';
import { Component, Injectable, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-imputations',
  templateUrl: './imputations.component.html',
  styleUrls: ['./imputations.component.scss'],
})
@Injectable()
export class ImputationsComponent extends BaseComponent implements OnInit {
  tableColumns: any[] = [];
  public data: any = [];
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private _store: Store<AppState>,
    private _apiService: ApisService,
    private _appService: AppService
  ) {
    super();
    this.tableColumns = [
      {
        field: 'start_date',
        title: 'tables.headers.startDate',
        sortable: true,
      },
      {
        field: 'end_date',
        title: 'tables.headers.endDate',
        sortable: true,
      },
      {
        field: 'imputation',
        title: 'tables.headers.imputation',
        sortable: true,
      },
      {
        field: 'tache',
        title: 'tables.headers.task',
        sortable: true,
      },
      {
        field: 'operation',
        title: 'tables.headers.operation',
        sortable: true,
      },
    ];
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const id = this.config.data?.item;
      this.getAccreditationByGestionnaire(id);
    }
  }

  /**
   * delete
   */
  public delete(item: any) {
    this._apiService.delete<any>(`/accreditations/${item.id}`, undefined).subscribe(
      (res) => {
        this.ref.close(res);
        this._appService.showToast({
          detail: 'messages.gestionnaires.deleteSuccess',
          summary: 'messages.success',
          severity: 'success',
          life: 5000,
          closable: true,
        });
        this._store.dispatch(GetAccreditations());
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.dejaRegion';
        } else {
          err = 'errors.unknown';
        }
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

  /**
   * getAccreditationByGestionnaire
   */
  public getAccreditationByGestionnaire(id: any) {
    this._apiService.get<any>(`/accreditations/gestionnaire/${id}`).subscribe(
      (res) => {
        this.data = res;
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.dejaRegion';
        } else {
          err = 'errors.unknown';
        }
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
