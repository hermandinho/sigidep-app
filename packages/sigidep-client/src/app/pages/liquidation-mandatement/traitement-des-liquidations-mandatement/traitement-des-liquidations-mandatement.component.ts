import { Component, OnInit, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../components/base.component';
import { Observable, of } from 'rxjs';
import { DataModel } from '../../../models/data.model';
import { DialogsService } from '../../../services/dialogs.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/reducers/index';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../services/app.service';
import { ApisService } from '../../../services/apis.service';
import { TableColumnsTransmission, TableColumnsBordereau } from './consts';
import { EtatBonEnum } from '../../../utils/etat-bon-engagement.enum';
import { GetExercises } from '../../../store/actions/exercises.actions';
import { SetAppBreadcrumb } from '../../../store/actions/app.actions';
import { map } from 'rxjs/operators';
//import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { Router, NavigationExtras } from '@angular/router';
import { GetBonsEngagements } from '../../../store/actions/bons-engagements.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/bons-engagements.reducer';


@Component({
  selector: 'app-traitement-des-liquidations-mandatement',
  templateUrl: './traitement-des-liquidations-mandatement.component.html',
  styleUrls: ['./traitement-des-liquidations-mandatement.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraitementDesLiquidationsMandatementComponent extends BaseComponent
  implements OnInit, AfterContentChecked {
  public busy = false;
  public tableColumnsTransmission: any[] = [];
  public tableColumnsBordereau: any[] = [];
  public bordereauxTransmissions: any[] = [];
  public dossiersBordereaux: any[] = [];
  public dossiersBordereaux_tmp: any[] = [];
  public globalColumnsTransmission!: string[];
  public globalColumnsBordereaux!: string[];
  menus!: MenuItem[];
  loading$: Observable<boolean> = of(true);
  loading1$: Observable<boolean> = of(true);
  public currentItem!: any;
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
    private router: Router


  ) {
    super();
    this.tableColumnsTransmission = TableColumnsTransmission;
    this.tableColumnsBordereau = TableColumnsBordereau;
    this.globalColumnsTransmission = this.tableColumnsTransmission.map((item) => item.field);
    this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
    console.log(this.globalColumnsBordereaux)
    this._initListeners();
  }

  ngOnInit(): void {
    console.log('theo')
    this._store.dispatch(
      GetBonsEngagements({ etats: [
        EtatBonEnum.ENREGISTREMENTLIQUIDATION,
        EtatBonEnum.CERTIFICAT,
        EtatBonEnum.RECEPTIONLIQUIDATION,
        EtatBonEnum.LIQUIDATIONMODIFIEE,
        EtatBonEnum.VALIDATIONLIQUIDATION,
        EtatBonEnum.MANDATDEPAIEMENT,
        EtatBonEnum.RAPPORTDELIQUIDATION,
        EtatBonEnum.ORDONNANCEMENT,
        EtatBonEnum.REJETCONTROLEREGULARITE] })
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

  searchSelect(event: any) {
    this.dossiersBordereaux = this.dossiersBordereaux_tmp;
    this.dossiersBordereaux = this.dossiersBordereaux_tmp.filter((item) =>
      (item.numero ? item.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.numActeJuridique.numero ? item.numActeJuridique.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.numActeJuridique.imputation ? item.numActeJuridique.imputation.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.etat ? item.etat.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.objet ? item.objet.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.numActeJuridique.montantAE ? item.numActeJuridique.montantAE.toString().includes(event.target.value.toLowerCase()) : '') ||
      (item.montantCPChiffres ? item.montantCPChiffres.toString().includes(event.target.value.toLowerCase()) : '') ||
      (item.dateEngagement ? item.dateEngagement.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.nomGestionnaire ? item.nomGestionnaire.toLowerCase().includes(event.target.value.toLowerCase()) : '')
    );
  }

  ngAfterContentChecked(): void {
    this.menus = [
      {
        items: [
          {
            label: this.translate.instant('labels.enregistrer'),
            icon: 'pi pi-pencil',
            command: () => {
              this.handleEnregistrer(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.RECEPTIONLIQUIDATION || this.currentItem?.etat === EtatBonEnum.CERTIFICAT) : true
          },
          {
            label: this.translate.instant('labels.Modifier'),
            icon: 'pi pi-check-square',
            command: () => {
              this.handleModifier(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.ENREGISTREMENTLIQUIDATION || this.currentItem?.etat === EtatBonEnum.LIQUIDATIONMODIFIEE || EtatBonEnum.REJETCONTROLEREGULARITE) : true
          },
          {
            label: this.translate.instant('labels.Valider'),
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleValider(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.ENREGISTREMENTLIQUIDATION || this.currentItem?.etat === EtatBonEnum.LIQUIDATIONMODIFIEE) : true
          },
          {
            label: this.translate.instant('labels.EditerRapport'),
            icon: 'pi pi-times',
            command: () => {
              this.handleEditerRapport(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.VALIDATIONLIQUIDATION || this.currentItem?.etat === EtatBonEnum.RAPPORTDELIQUIDATION || this.currentItem?.etat === EtatBonEnum.MANDATDEPAIEMENT) : true
          },
          {
            label: this.translate.instant('labels.Mandater'),
            icon: 'pi pi-print',
            command: () => {
              this.handleMandater(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.VALIDATIONLIQUIDATION || this.currentItem?.etat === EtatBonEnum.RAPPORTDELIQUIDATION || this.currentItem?.etat === EtatBonEnum.MANDATDEPAIEMENT) : true
          },
          {
            label: this.translate.instant('labels.EditerMandatPaiement'),
            icon: 'pi pi-print',
            command: () => {
              this.handleEditerMandatPaiement(this.currentItem);
            },
            disabled: this.currentItem ? !(this.currentItem?.etat === EtatBonEnum.ORDONNANCEMENT || this.currentItem?.etat === EtatBonEnum.RAPPORTDELIQUIDATION || this.currentItem?.etat === EtatBonEnum.MANDATDEPAIEMENT) : true
          },
        ],
      },
    ];
  }

  handleEnregistrer(item: any) {
    console.log('item', item)
    this._appService.showConfirmation({
      message: 'dialogs.messages.EnregistrerTraitementLiquidationMandatement',
      accept: () => {
        this._dialogService.launchtraitementLiquidationMandatementCreateDialog(
          item,
          'enregistrer'
        );
      },
    });
  }

  handleModifier(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.ModifierTraitementLiquidationMandatement',
      accept: () => {
        this._dialogService.launchtraitementLiquidationMandatementCreateDialog(
          item,
          'modifier'
        );
      },
    });
  }

  handleValider(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.ValiderTraitementLiquidationMandatement',
      accept: () => {
        this._dialogService.launchtraitementLiquidationMandatementCreateDialog(
          item,
          'valider'
        );
      },
    });
  }

  handleEditerRapport(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.EditerRapportMandatement',
      accept: () => {
        let editedEngagement = {
          id: item?.traitements[0]?.id,
          bon: item,
          observation: item?.traitements[0]?.observation,
          qteUnitePhysiqueReal: item?.traitements[0]?.qteUnitePhysiqueReal,
          montantTotalUnitPhysReal: item?.traitements[0]?.montantTotalUnitPhysReal,
          etat: item?.traitements[0]?.etat,
          dateLiquidation: item?.traitements[0]?.dateLiquidation,
          numOrdreLiquidation: item?.traitements[0]?.numOrdreLiquidation,
          rubriqueLiquidation: item?.traitements[0]?.rubriqueLiquidation,
          montantLiquidation: item?.traitements[0]?.montantLiquidation,
          liquidation: item?.traitements[0]?.liquidation,
          dateOrdonnancement: item?.traitements[0]?.dateOrdonnancement,
          ordonnancement: item?.traitements[0]?.ordonnancement,
          numOrdreOrdonnancement: item?.traitements[0]?.numOrdreOrdonnancement,
          rubriqueOrdonnancement: item?.traitements[0]?.rubriqueOrdonnancement,
          montantOrdonnancement: item?.traitements[0]?.montantOrdonnancement,
          motif: item?.traitements[0]?.motif,
          piecesJointe: item?.traitements[0]?.piecesJointe,
          action: 'editer_rapport'
        } as any;
        // item?.traitements[0];
        //editedEngagement.action = 'editer_rapport';
        console.log(editedEngagement)
        const method: Observable<any> = this._apisService.put<any>(
          '/traitement-bon-engagements',
          editedEngagement
        );
        method.subscribe(
          (res) => {
            this.busy = false;
            this._dialogService.launchEditerRapportTraitementLiquidationMandatementCreateDialog(
              item,
              'editer_rapport'
            );
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.engagements.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.notfound';
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
      },
    });

  }

  handleMandater(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.MandaterTraitementLiquidationMandatement',
      accept: () => {
        this._dialogService.launchtraitementLiquidationMandatementCreateDialog(
          item,
          'mandater'
        );
      },
    });
  }

  handleEditerMandatPaiement(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.EditerMandatPaiementTraitementLiquidationMandatement',

      accept: () => {
        let editedEngagement = {
          id: item?.traitements[0]?.id,
          bon: item,
          observation: item?.traitements[0]?.observation,
          qteUnitePhysiqueReal: item?.traitements[0]?.qteUnitePhysiqueReal,
          montantTotalUnitPhysReal: item?.traitements[0]?.montantTotalUnitPhysReal,
          etat: item?.traitements[0]?.etat,
          dateLiquidation: item?.traitements[0]?.dateLiquidation,
          numOrdreLiquidation: item?.traitements[0]?.numOrdreLiquidation,
          rubriqueLiquidation: item?.traitements[0]?.rubriqueLiquidation,
          montantLiquidation: item?.traitements[0]?.montantLiquidation,
          liquidation: item?.traitements[0]?.liquidation,
          dateOrdonnancement: item?.traitements[0]?.dateOrdonnancement,
          ordonnancement: item?.traitements[0]?.ordonnancement,
          numOrdreOrdonnancement: item?.traitements[0]?.numOrdreOrdonnancement,
          rubriqueOrdonnancement: item?.traitements[0]?.rubriqueOrdonnancement,
          montantOrdonnancement: item?.traitements[0]?.montantOrdonnancement,
          motif: item?.traitements[0]?.motif,
          piecesJointe: item?.traitements[0]?.piecesJointe,
          action: 'editer_mandat_paiement'
        } as any;
        // item?.traitements[0];
        //editedEngagement.action = 'editer_rapport';
        console.log(editedEngagement)
        const method: Observable<any> = this._apisService.put<any>(
          '/traitement-bon-engagements',
          editedEngagement
        );
        method.subscribe(
          (res) => {
            this.busy = false;
            this._dialogService.launchEditerPrintMandatPaiementComponentCreateDialog(
              item,
              'editer_mandat_paiement'
            );
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.engagements.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.notfound';
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
      },
    });
  }

  /* handleControleRegularite(item: any) {
    const etat = EtatBonEnum.ORDONNANCEMENT;
    this._appService.showConfirmation({
      message: 'dialogs.messages.ControleRegulariteTraitementLiquidationMandatement',
      accept: () => {
        this.goToWithParams('traitement-controle', etat)
      },
    });
  } */

  handleFilter = (event: any) => {
    if (event?.value) {
      this._store.dispatch(
        GetBonsEngagements({ etats: [EtatBonEnum.CERTIFICAT, EtatBonEnum.RECEPTIONLIQUIDATION, EtatBonEnum.ENREGISTREMENTLIQUIDATION, EtatBonEnum.LIQUIDATIONMODIFIEE, EtatBonEnum.VALIDATIONLIQUIDATION, EtatBonEnum.MANDATDEPAIEMENT, EtatBonEnum.RAPPORTDELIQUIDATION, EtatBonEnum.ORDONNANCEMENT, EtatBonEnum.REJETCONTROLEREGULARITE] })
      );
    } else {
      this._store.dispatch(
        GetBonsEngagements({ etats: [EtatBonEnum.CERTIFICAT, EtatBonEnum.RECEPTIONLIQUIDATION, EtatBonEnum.ENREGISTREMENTLIQUIDATION, EtatBonEnum.LIQUIDATIONMODIFIEE, EtatBonEnum.VALIDATIONLIQUIDATION, EtatBonEnum.MANDATDEPAIEMENT, EtatBonEnum.RAPPORTDELIQUIDATION, EtatBonEnum.ORDONNANCEMENT, EtatBonEnum.REJETCONTROLEREGULARITE] })
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
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        const tabs = [...data];
        console.log(tabs)
        tabs.forEach(elt => {
          if ((elt?.numActeJuridique?.codeProcedure == '1110' || elt?.numActeJuridique?.codeProcedure == '1111' || elt?.numActeJuridique?.codeProcedure == '1115') && (elt?.etat == EtatBonEnum.RECEPTIONLIQUIDATION || elt?.etat == EtatBonEnum.ORDONNANCEMENT)) {
            this.dossiersBordereaux.push(elt)
            this.dossiersBordereaux_tmp.push(elt)
            console.log("dossiersBordereaux1 ", this.dossiersBordereaux)
          } else if ((elt?.numActeJuridique?.codeProcedure == '1121' || elt?.numActeJuridique?.codeProcedure == '1122' || elt?.numActeJuridique?.codeProcedure == '1123' || elt?.numActeJuridique?.codeProcedure == '1124' || elt?.numActeJuridique?.codeProcedure == '1125' || elt?.numActeJuridique?.codeProcedure == '1126') && (elt?.etat == EtatBonEnum.CERTIFICAT)) {
            this.dossiersBordereaux.push(elt)
            this.dossiersBordereaux_tmp.push(elt)
            console.log("dossiersBordereaux2 ", this.dossiersBordereaux)
          } else if (elt?.etat == EtatBonEnum.ENREGISTREMENTLIQUIDATION || elt?.etat == EtatBonEnum.VALIDATIONLIQUIDATION || elt?.etat == EtatBonEnum.LIQUIDATIONMODIFIEE || elt?.etat == EtatBonEnum.MANDATDEPAIEMENT || elt?.etat == EtatBonEnum.RAPPORTDELIQUIDATION || elt?.etat == EtatBonEnum.REJETCONTROLEREGULARITE) {
            this.dossiersBordereaux.push(elt)
            this.dossiersBordereaux_tmp.push(elt)
            console.log("dossiersBordereaux2 ", this.dossiersBordereaux)
          }
        })
      });

    this.loading1$ = this._store.pipe(
      select(getLoadingSelector),
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

  goToWithParams(url: string, params: any) {
    const extra: NavigationExtras = {
      queryParams: { param: params }
    };
    this.router.navigate([url], extra);
  }

}
