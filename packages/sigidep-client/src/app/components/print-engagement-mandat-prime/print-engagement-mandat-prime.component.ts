import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import {
  EngagementMandatModel,
  EtatEngagementEnum,
} from '@models/engagement-mandat.model';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-print-engagement-mandat-prime',
  templateUrl: './print-engagement-mandat-prime.component.html',
  styleUrls: ['./print-engagement-mandat-prime.component.scss'],
})
export class PrintEngagementMandatPrimeComponent
  extends BaseComponent
  implements OnInit
{
  public prime!: any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public translate: TranslateService
  ) {
    super();
  }
  get currentLang() {
    return this.translate.currentLang;
  }

  get isBook() {
    return this.prime.etat === EtatEngagementEnum.RESERVED;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        numero,
        matriculeGestionnaire,
        objet,
        dateEngagement,
        montantCPChiffres,
        montantCPLettres,
        dateLiquidation,
        dateOrdonnancement,
        modePaiement,
        compteADebiter,
        compteACrediter,
        datePaiement,
        villePaiement,
        etat,
        rejet,
        encours,
        ordonnance,
        paye,
        numActeJuridique,
        situationActuelle,
      } = this.config.data?.item as EngagementMandatModel;
      this.prime = {
        numero,
        matriculeGestionnaire,
        objet,
        dateEngagement,
        montantCPChiffres,
        montantCPLettres,
        dateLiquidation,
        dateOrdonnancement,
        modePaiement,
        compteADebiter,
        compteACrediter,
        datePaiement,
        villePaiement,
        etat,
        rejet,
        encours,
        ordonnance,
        paye,
        numActeJuridique,
        situationActuelle,
      };
    }
  }

  close() {
    this.ref.close();
  }
}
