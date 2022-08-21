import { SetAppBreadcrumb } from '@actions/app.actions';
import { DeleteVirement, DeleteVirementFailure, DeleteVirementSuccess, GetVirement } from '@actions/virement.actions';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { VirementModele } from '@models/virement.model';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { getDataSelector, getLoadingSelector } from '@reducers/virement.reducer';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-virements',
  templateUrl: './virements.component.html',
  styleUrls: ['./virements.component.scss']
})
export class VirementsComponent extends BaseComponent implements OnInit {
  tableColumns: any[] = [];
  data: VirementModele[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService) {
    super();

    this.tableColumns = [
      {
        field: 'numero',
        title: 'tables.headers.numeroVirement',
        sortable: true,
      },
      {
        field: 'date_virement',
        title: 'tables.headers.dateVirement',
        sortable: true,
      },
      {
        field: 'date_signature_virement',
        title: 'tables.headers.dateSignatureVirement',
        sortable: true,
      },
      {
        field: 'signataire_virement',
        title: 'tables.headers.signataireVirement',
        sortable: true,
      },
      {
        field: 'sp_source_virement',
        title: 'tables.headers.spSourceVirement',
        sortable: true,
      },
      {
        field: 'sp_cible_virement',
        title: 'tables.headers.spCibleVirement',
        sortable: true,
      },
    ];
  }

  ngOnInit(): void {
    this._store.dispatch(GetVirement());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.virement',
          },
        ],
      })
    );
    this._initListeners();
  }

  edit(item: VirementModele) {
    this._dialogService.launchVirementCreateDialog(item);
  }

  delete(item: VirementModele) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteModelVirement',
      accept: () => {
        this._store.dispatch(DeleteVirement({ id: item.id }));
      },
    });
  }


  async openForm() {
    this._dialogService.launchVirementCreateDialog();
  }


  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new VirementModele({
              ...d,
            })
        );
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteVirementSuccess, DeleteVirementFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteVirementFailure.type) {
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
        } else if (action.type === DeleteVirementSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.accreditation.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
