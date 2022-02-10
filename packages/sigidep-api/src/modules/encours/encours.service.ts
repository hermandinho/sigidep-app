import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EncoursEntity } from '@entities/encours.entity';
import { ExerciseEntity } from '@entities/exercise.entity';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';
import { CreateEncoursDTO } from './dto/create-encours.dto';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { SubProgramActionEntity } from '@entities/sub-program-action.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from '@entities/sub-program-activity-task-operation-physical-unit.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';

@Injectable()
export class EncoursService {
  constructor(
    @InjectRepository(EncoursEntity)
    private readonly encoursRepository: Repository<EncoursEntity>,

    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,

    @InjectRepository(SubProgramEntity)
    private readonly subProgramRepository: Repository<SubProgramEntity>,

    @InjectRepository(SubProgramActionEntity)
    private readonly actionRepository: Repository<SubProgramActionEntity>,

    @InjectRepository(SubProgramActivityEntity)
    private readonly activityRepository: Repository<SubProgramActivityEntity>,

    @InjectRepository(SubProgramActivityTaskEntity)
    private readonly activityTaskRepository: Repository<SubProgramActivityTaskEntity>,

    @InjectRepository(SubProgramActivityTaskOperationPhysicalUnitEntity)
    private readonly unitePhysiquesRepository: Repository<SubProgramActivityTaskOperationPhysicalUnitEntity>,

    @InjectRepository(SubProgramActivityTaskOperationEntity)
    private readonly operationRepository: Repository<SubProgramActivityTaskOperationEntity>,
  ) {}

  public getRepository(): Repository<EncoursEntity> {
    return this.encoursRepository;
  }

  public async filter(): Promise<EncoursEntity[]> {
    return this.encoursRepository
      .createQueryBuilder('encours')
      .leftJoinAndSelect('encours.exercise', 'exercise')
      .leftJoinAndSelect('encours.sousProgramme', 's')
      .getMany();
  }

  public async getOne(
    id?: number,
    codeExercise?: number,
  ): Promise<EncoursEntity> {
    return this.encoursRepository
      .createQueryBuilder('encours')
      .where(!codeExercise ? 'encours.id = :code' : 'exercise.code = :code', {
        code: !codeExercise ? id : codeExercise,
      })
      .leftJoinAndSelect('encours.exercise', 'exercise')
      .leftJoinAndSelect('encours.sousProgramme', 's')
      .leftJoinAndSelect('s.actions', 'ac')
      .leftJoinAndSelect('ac.activities', 'a')
      .leftJoinAndSelect('a.tasks', 't')
      .leftJoinAndSelect('t.operations', 'op')
      .leftJoinAndSelect('op.arrondissement', 'ar')
      .leftJoinAndSelect('op.region', 're')
      .leftJoinAndSelect('op.department', 'dep')
      .leftJoinAndSelect('op.paragraph', 'par')
      .leftJoinAndSelect('op.physicalUnits', 'units')
      .leftJoinAndSelect('units.referencePhysicalUnit', 'ref')
      .leftJoinAndSelect('t.financialSource', 'fs')
      .leftJoinAndSelect('s.exercise', 'e')
      .leftJoinAndSelect('t.administrativeUnit', 'au')
      .leftJoinAndSelect('au.function', 'f')
      .getOne();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.encoursRepository.delete({ id });
  }

  public async create(
    payload: CreateEncoursDTO,
    user: UserEntity,
  ): Promise<EncoursEntity> {
    /**
     * Build encours entity from others
     */
    const encours: EncoursEntity = new EncoursEntity();
    const check = await this.getOne(undefined, payload.exercise);

    if (check) {
      throw new ConflictException();
    }

    const exercise = await this.exerciseRepository.findOne({
      code: payload.exercise,
    });

    if (exercise) {
      encours.exercise = exercise;
    } else {
      throw new NotFoundException(); //Exercise not found
    }

    const subProgram = await this.subProgramRepository
      .createQueryBuilder('subprogram')
      .leftJoinAndSelect('subprogram.exercise', 'exercise')
      .where('exercise.code = :code', { code: exercise?.code })
      .getOne();

    if (subProgram) {
      encours.sousProgramme = subProgram;
    } else {
      //throw new NotFoundException();
    }

    const actions = await this.actionRepository
      .createQueryBuilder('action')
      .distinct(true)
      .leftJoinAndSelect('action.subProgram', 'subprogram')
      .where('subprogram.code = :code', { code: subProgram?.code })
      .getMany();
    if (actions) {
      encours.actions = actions ?? undefined;
      encours.nombreActions = actions?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const activities = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.action', 'action')
      .where(actions.length > 0 ? 'action.code IN (:...codes)' : 'false', {
        codes: encours.actions?.map((item) => item.code),
      })
      .getMany();

    if (activities) {
      encours.activities = activities ?? undefined;
      encours.nombreActivites = activities?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const tasks = await this.activityTaskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.activity', 'activity')
      .where(activities.length > 0 ? 'activity.code IN (:...ids)' : 'false', {
        ids: encours?.activities?.map((item) => item.code),
      })
      .distinct(true)
      .getMany();

    if (tasks) {
      encours.tasks = tasks ?? undefined;
      encours.nombreTasks = tasks?.length ?? undefined;
      encours.adminUnits =
        tasks?.map((item) => item.administrativeUnit) ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.task', 'task')
      .where(tasks.length > 0 ? 'task.code IN (:...ids)' : 'false', {
        ids: encours?.tasks?.map((item) => item.code),
      })
      .distinct(true)
      .getMany();

    if (operations) {
      encours.operations = operations ?? undefined;
      encours.imputations = operations?.map((item) => item.imputation) ?? [];

      encours.localities = operations.map((item) => item.locality);
      encours.arrondissements = operations.map((item) => item.arrondissement);
      encours.regions = operations.map((item) => item.region);
      encours.departments = operations.map((item) => item.department);
      encours.gestionnaires = operations.map((item) => item.managerName);
      encours.sourceVerif = operations.map((item) => item.verificationSourceFr); // should use LANG
      encours.modeGestions = operations.map((item) => item.managementMode);
      encours.livrables = operations.map((item) => item.deliverablesFr);

      encours.nombreOperations = operations?.length ?? undefined;
      encours.nombreImputations = encours.imputations.length;
      encours.aeInit = operations.map((item) => item.engagementAuthorization);
      encours.cpInit = operations.map((item) => item.paymentCreditN1);
      encours.aeInitRevisee = operations.map(
        (item) => item.engagementAuthorization,
      );
      encours.cpInitRevisee = operations.map((item) => item.paymentCreditN1);
      encours.aeDisponible = operations.map(
        (item) => item.engagementAuthorization,
      );
      encours.cpDisponible = operations.map((item) => item.paymentCreditN1);

      encours.aeDispoANouveau = operations.map(
        (item) => item.engagementAuthorization,
      );
      encours.cpDispoANouveau = operations.map((item) => item.paymentCreditN1);

      encours.volumeAE = operations
        .map((item) => item.engagementAuthorization)
        .reduce((prev, current) => current + prev, 0); // SHOULD RECHECK THE FORMULE

      encours.volumeAE = operations
        .map((item) => item.paymentCreditN1)
        .reduce((prev, current) => prev + current, 0); // SHOULD RECHECK THE FORMULE
    } else {
      //throw new NotFoundException();
    }

    const unitesPhys = await this.unitePhysiquesRepository
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.operation', 'operation')
      .where(operations.length > 0 ? 'operation.id IN (:...ids)' : 'false', {
        ids: encours?.operations?.map((item) => item.id),
      })
      .leftJoinAndSelect('unit.referencePhysicalUnit', 'ref')
      .getMany();

    if (unitesPhys) {
      encours.unitePhysiques = unitesPhys;
      encours.libelleUnitePhys =
        unitesPhys?.map((item) => item.referencePhysicalUnit.labelFr) ??
        undefined; // LANG MUST BE HANDLED LATTER
      encours.quantiteUnitePhys =
        unitesPhys?.map((item) => item.quantity) ?? [];
      encours.puUnitePhys = unitesPhys?.map((item) => item.unitPrice) ?? [];
      encours.montantUnitePhys =
        unitesPhys?.map((item) => item.totalPrice) ?? [];
      encours.nombreUnitesPhysiques = unitesPhys?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    encours.valeurSeuil = payload.valeurSeuil;

    return this.encoursRepository.save({
      ...encours,
      createdBy: user,
    });
  }
}
