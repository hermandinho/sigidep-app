import { BaremeMissionModel } from '.';
import { EngagementJuridiqueModel } from './engagement-juridique.model';

export class EngagementMissionModel extends EngagementJuridiqueModel {
  numeroOM!: string;

  type!: string;

  matriculeBeneficiaire!: string;

  omBeneficiaire!: string;

  objet!: string;

  itineraire!: string;

  dateDebut!: Date;

  dateFin!: Date;

  nombreJours!: number;

  cumulJours!: number;

  BaremeJour!: BaremeMissionModel;

  montant!: number;

  chevauchement!: boolean;

  quotaAtteint!: boolean;

  constructor(params?: Partial<EngagementMissionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
