import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { BaseModel } from './base.model';
import { EngagementJuridiqueModel } from './engagement-juridique.model';
import { TypeMarcheEngagementMandatEnum } from './engagement-mandat.model';
import { FactureModel } from './facture.model';
import { TraitementMandatModel } from './traitement-mandat.model';

export class MandatModel extends BaseModel {
  numero!: string;
  matriculeGestionnaire!: string;
  nomGestionnaire!: string;
  objet!: string;
  dateEngagement!: Date;
  signataire!: string;
  montantCPChiffres!: number;
  montantCPLettres!: string;
  dateLiquidation!: Date;
  dateOrdonnancement!: Date;
  modePaiement!: string;
  compteADebiter!: string;
  compteACrediter!: string;
  datePaiement!: Date;
  villePaiement!: string;
  situationActuelle!: string;
  etat!: EtatMandatEnum;
  traitements?: TraitementMandatModel[];
  rejet!: boolean;
  encours!: boolean;
  ordonnance!: boolean;
  paye!: boolean;
  numActeJuridique!: EngagementJuridiqueModel;
  typeMarche!: TypeMarcheEngagementMandatEnum;
  facture?: FactureModel;
}
