import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { BonEngagementModel } from '@models/bon-engagement.model';
import { TranslateService } from '@ngx-translate/core';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-print-bon-engagement-prime',
  templateUrl: './print-bon-engagement-prime.component.html',
  styleUrls: ['./print-bon-engagement-prime.component.scss'],
})
export class PrintBonEngagementPrimeComponent
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
    return this.prime.etat === EtatBonEnum.RESERVE;
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
      } = this.config.data?.item as BonEngagementModel;
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
