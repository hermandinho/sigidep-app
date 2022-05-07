import { BaremeMissionModel } from '.';
import { EngagementJuridiqueModel } from './engagement-juridique.model';

export enum TypeMissionEnum {
  AVANCE_MISSION_ORDINAIRE = 'Avance Mission ordinaire',
  AVANCE_MISSION_CONTROLE_RECOUVREMENT = 'Avance Mission de Contrôle-Recouvrement',
  MISSION_EFFECTUEE = 'Mission Effectuée',
}
export class EngagementMissionModel extends EngagementJuridiqueModel {
  typeMission!: TypeMissionEnum;
  matriculeBeneficiaire!: string;
  nomBeneficiaire!: string;
  itineraire!: string;
  dateDebut!: Date;
  dateFin!: Date;
  nombreJours!: number;
  baremeJour!: BaremeMissionModel;
  montant!: number;

  constructor(params?: Partial<EngagementMissionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
