import { getDataSelector, getLoadingSelector } from '@reducers/encours.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { GradeModel } from '@models/grade.model';

import { EncoursModel } from '@models/encours.model';
import {
  DeleteEncours,
  DeleteEncoursFailure,
  DeleteEncoursSuccess,
  GetEncours,
} from '@actions/encours.actions';
import { GetExercises, Go, SetAppBreadcrumb } from '@store/actions';

@Component({
  selector: 'app-encours',
  templateUrl: './encours.component.html',
  styleUrls: ['./encours.component.scss'],
})
export class EncoursComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EncoursModel[] = [];
  loading$: Observable<boolean> = of(true);
  public globalColumns!: string[];

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions
  ) {
    super();

    this.tableColumns = [
      {
        field: 'exercise',
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
        field: 'adminUnit',
        title: 'tables.headers.adminUnit',
        sortable: true,
      },
      {
        field: 'paragraph',
        title: 'tables.headers.paragraph',
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
      {
        field: 'livrables',
        title: 'tables.headers.livrables',
        sortable: true,
      },
      {
        field: 'sourceVerif',
        title: 'tables.headers.sourceVerif',
        sortable: true,
      },
      {
        field: 'sourceVerif',
        title: 'tables.headers.sourceVerif',
        sortable: true,
      },
      {
        field: 'gestionnaire',
        title: 'tables.headers.gestionnaire',
        sortable: true,
      },
      {
        field: 'modeGestion',
        title: 'tables.headers.modeGestion',
        sortable: true,
      },
      {
        field: 'aeInitial',
        title: 'tables.headers.aeInitial',
        sortable: true,
      },
      {
        field: 'cpInitial',
        title: 'tables.headers.cpInitial',
        sortable: true,
      },
      {
        field: 'labelParagraphFr',
        title: 'tables.headers.labelParagraphFr',
        sortable: true,
      },
      {
        field: 'labelParagraphEn',
        title: 'tables.headers.labelParagraphEn',
        sortable: true,
      },
      {
        field: 'sourceFinancement',
        title: 'tables.headers.sourceFinancement',
        sortable: true,
      },
      {
        field: 'region',
        title: 'tables.headers.region',
        sortable: true,
      },
      {
        field: 'department',
        title: 'tables.headers.department',
        sortable: true,
      },
      {
        field: 'arrondissement',
        title: 'tables.headers.arrondissement',
        sortable: true,
      },
      {
        field: 'localite',
        title: 'tables.headers.localite',
        sortable: true,
      },
      {
        field: 'unitePhysique',
        title: 'tables.headers.unitePhysique',
        sortable: true,
      },
      {
        field: 'libelleUnitePhys',
        title: 'tables.headers.libelleUnitePhys',
        sortable: true,
      },
      {
        field: 'quantiteUnitePhysique',
        title: 'tables.headers.quantiteUnitePhysique',
        sortable: true,
      },
      {
        field: 'puUnitePhys',
        title: 'tables.headers.puUnitePhys',
        sortable: true,
      },
      {
        field: 'montantUnitePhys',
        title: 'tables.headers.montantUnitePhys',
        sortable: true,
      },
      {
        field: 'aeInitRevisee',
        title: 'tables.headers.aeInitRevisee',
        sortable: true,
      },
      {
        field: 'cpInitRevisee',
        title: 'tables.headers.cpInitRevisee',
        sortable: true,
      },
      {
        field: 'aeDisponible',
        title: 'tables.headers.aeDisponible',
        sortable: true,
      },
      {
        field: 'cpDisponible',
        title: 'tables.headers.cpDisponible',
        sortable: true,
      },
      {
        field: 'aeDispoANouveau',
        title: 'tables.headers.aeDispoANouveau',
        sortable: true,
      },
      {
        field: 'cpDispoANouveau',
        title: 'tables.headers.cpDispoANouveau',
        sortable: true,
      },
      {
        field: 'valeurSeuil',
        title: 'tables.headers.seuil',
        sortable: true,
      },
    ];
    this.globalColumns = this.tableColumns.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetExercises({}));
    this._store.dispatch(GetEncours());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.encours',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchEncoursCreateDialog();
  }

  delete(item: GradeModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteEncours',
      accept: () => {
        this._store.dispatch(DeleteEncours({ id: item.id }));
      },
    });
  }

  reload(item: EncoursModel) {
    this._dialogService.launchEncoursCreateDialog({
      id: item.id,
      exercise: +item.exercise,
      valeurSeuil: item.valeurSeuil,
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteEncoursSuccess, DeleteEncoursFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteEncoursFailure.type) {
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
        } else if (action.type === DeleteEncoursSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.encours.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
  public showItem = (item: EncoursModel) => {
    this._store.dispatch(new Go({ path: ['encours/details', item.id] }));
  };
}
