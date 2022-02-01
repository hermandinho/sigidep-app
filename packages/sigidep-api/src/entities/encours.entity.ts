import { Entity } from 'typeorm';
import {
  AdministrativeUnitEntity,
  ArrondissementEntity,
  DepartmentEntity,
  ExerciseEntity,
  RegionEntity,
  SubProgramEntity,
} from '.';
import { BaseEntity } from './base.entity';
import { SubProgramActionEntity } from './sub-program-action.entity';
import { SubProgramActivityTaskOperationEntity } from './sub-program-activity-task-operation.entity';
import { SubProgramActivityTaskEntity } from './sub-program-activity-task.entity';
import { SubProgramActivityEntity } from './sub-program-activity.entity';

@Entity({
  name: 'encours',
  orderBy: {
    code: 'ASC',
  },
})
export class EncoursEntity extends BaseEntity {
  public code: string;
  public exercice: ExerciseEntity;
  public sousProgramme: SubProgramEntity;
  public action: SubProgramActionEntity;
  public activity: SubProgramActivityEntity;
  public task: SubProgramActivityTaskEntity;
  public operation: SubProgramActivityTaskOperationEntity;
  public imputation: string;
  public adminUnit: AdministrativeUnitEntity;
  public livrables: string;
  public sourceVerif: string;
  public modeGestion: string;
  public managerName: string;
  public region: RegionEntity;
  public department: DepartmentEntity;
  public arrondissement: ArrondissementEntity;
  public locality: string;
  public codeUnitePhys: string;
  public libelleUnitePhys: string;
  public quantiteUnitePhys: number;
  public puUnitePhys: number;
  public montantUnitePhys: number;
  public aeInit: number;
  public cpInit: number;
  public cpInitRevisee: number;
  public aeInitRevisee: number;
  public valeurSeuil: number;
  public aeDisponible: number;
  public cpDisponible: number;
  public aeEngagJuridique: number;
  public cpMandat: number;
  public aeDispoANouveau: number;
  public cpDispoANouveau: number;
}
