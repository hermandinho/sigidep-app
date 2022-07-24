import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  CancelBonsEngagementsReservation,
  CancelBonsEngagementsReservationFailure,
  CancelBonsEngagementsReservationSuccess,
  DeleteBonsEngagements,
  DeleteBonsEngagementsFailure,
  DeleteBonsEngagementsSuccess,
  GetBonsEngagements,
} from '@actions/bons-engagements.actions';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { BonEngagementModel } from '@models/bon-engagement.model';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableColumns } from './consts';
import {
  getDataSelector as getDataSelectorm,
  getLoadingSelector as getLoadingSelectorm,
} from '@reducers/bons-engagements.reducer';

@Component({
  selector: 'app-bons-engagements-missions',
  templateUrl: './bons-engagements-missions.component.html',
  styleUrls: ['./bons-engagements-missions.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BonEngagementMissionsComponent
  extends BaseComponent
  implements OnInit, AfterContentChecked
{
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: BonEngagementModel[] = [];
  originalData: BonEngagementModel[] = [];

  loading$: Observable<boolean> = of(true);
  menus!: MenuItem[];
  public globalColumns!: string[];

  public busy = false;
  /*
   quick filter
  */

  public filters: any[] = [];
  public selectedFilters!: string[];
  public currentItem!: BonEngagementModel;

  public printing: boolean = false;
  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {
    super();
    this.filters = Object.entries(EtatBonEnum).map(([key, value]) => ({
      value: key,
      label: this.translate.instant(value),
    }));
    this.tableColumns = TableColumns;
    this.globalColumns = this.tableColumns.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._store.dispatch(
      GetBonsEngagements({
        procedures: ['1121'],
      })
    );

    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.bonsPrimes',
          },
        ],
      })
    );
  }

  ngAfterContentChecked(): void {
    this.menus = [
      {
        items: [
          {
            label: this.translate.instant('labels.edit'),
            icon: 'pi pi-pencil',
            command: () => {
              this.edit(this.currentItem);
            },
            disabled:
              this.currentItem?.etat !== EtatBonEnum.ANNULELORSRESERVATION &&
              this.currentItem?.etat !== EtatBonEnum.REJETCONTROLECONFORMITE &&
              this.currentItem?.etat !== EtatBonEnum.REJETCONTROLEREGULARITE &&
              this.currentItem?.etat !== EtatBonEnum.ENREGISTRE &&
              this.currentItem?.etat !== EtatBonEnum.MODIFIE,
          },
          {
            label: this.translate.instant('labels.reserver'),
            icon: 'pi pi-check-square',
            command: () => {
              this.handleReservation(this.currentItem);
            },
            disabled:
              this.currentItem?.etat !== EtatBonEnum.ENREGISTRE &&
              this.currentItem?.etat !== EtatBonEnum.ANNULELORSRESERVATION &&
              this.currentItem?.etat !== EtatBonEnum.MODIFIE,
          },
          {
            label: this.translate.instant('labels.annuler'),
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleCancel(this.currentItem);
            },
            disabled: this.currentItem?.etat !== EtatBonEnum.RESERVE,
          },
          {
            label: this.translate.instant('labels.print'),
            icon: 'pi pi-print',
            command: () => {
              this.handlePrint(this.currentItem);
            },
          },
        ],
      },
    ];
  }

  handleFilter = (event: any) => {
    this.data = this.originalData;
    if (event?.value[0]?.toLowerCase())
      this.data = this.originalData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );
  };

  handleReservation(item: BonEngagementModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.reserveMandatEngagement',
      accept: () => {
        this._dialogService.launchBonEngagementMissionCreateDialog(
          item,
          'book'
        );
      },
    });
  }

  handleCancel(item: BonEngagementModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.cancelBonEngagement',
      accept: () => {
        this._store.dispatch(
          CancelBonsEngagementsReservation({ payload: item })
        );
      },
    });
  }

  handlePrint(item: BonEngagementModel) {
    this._dialogService.launchPrintBonEngagementPrimeDialog(item);
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }
  async openForm() {
    this._dialogService.launchBonEngagementMissionCreateDialog();
  }

  edit(item: BonEngagementModel) {
    this._dialogService.launchBonEngagementMissionCreateDialog(item);
  }

  delete(item: BonEngagementModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteEngagement',
      accept: () => {
        this._store.dispatch(DeleteBonsEngagements({ id: item.id }));
      },
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelectorm))
      .subscribe((data) => {
        this.data = [...data];
        this.originalData = [...data];
        console.log(this.data);
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelectorm),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteBonsEngagementsSuccess, DeleteBonsEngagementsFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteBonsEngagementsFailure.type) {
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
        } else if (action.type === DeleteBonsEngagementsSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.engagements.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(
          CancelBonsEngagementsReservationSuccess,
          CancelBonsEngagementsReservationFailure
        )
      )
      .subscribe((action) => {
        if (action.type === CancelBonsEngagementsReservationFailure.type) {
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
        } else if (
          action.type === CancelBonsEngagementsReservationSuccess.type
        ) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.engagements.cancelSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
