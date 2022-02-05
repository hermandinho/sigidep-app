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
    return this.encoursRepository.createQueryBuilder('e').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.encoursRepository.delete({ id });
  }

  public async create(
    payload: CreateEncoursDTO,
    user: UserEntity,
    reload = false,
  ): Promise<EncoursEntity> {
    /**
     * Build encours entity from others
     */
    let encours: EncoursEntity = new EncoursEntity();
    const check = await this.encoursRepository.findOne({
      exercise: payload.exercise,
    });
    if (!reload && check) {
      throw new ConflictException();
    }
    if (check) {
      encours = check;
    }

    const exercise = await this.exerciseRepository.findOne({
      code: payload.exercise,
    });

    if (exercise) {
      encours.exercise = exercise.code;
    } else {
      throw new NotFoundException(); //Exercise not found
    }

    const subProgram = await this.subProgramRepository
      .createQueryBuilder('subprogram')
      .leftJoinAndSelect('subprogram.exercise', 'exercise')
      .where('exercise.code = :code', { code: exercise?.code })
      .getOne();

    if (subProgram) {
      encours.sousProgramme = subProgram.code + ' ' + subProgram.labelFr;
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
      encours.actions = actions?.map((item) => item.code) ?? [];
      encours.nombreActions = actions?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const activities = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.action', 'action')
      .where(actions.length > 0 ? 'action.code IN (:...actions)' : 'false', {
        actions: encours.actions,
      })
      .getMany();

    if (activities) {
      encours.activities = activities?.map((item) => item.code) ?? [];
      encours.nombreActivites = activities?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const tasks = await this.activityTaskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.activity', 'activity')
      .where(activities.length > 0 ? 'activity.code IN (:...ids)' : 'false', {
        ids: encours.activities,
      })
      .distinct(true)
      .getMany();

    if (tasks) {
      encours.tasks = tasks?.map((item) => item.code) ?? [];
      encours.nombreTasks = tasks?.length ?? undefined;
      encours.adminUnits =
        tasks?.map((item) => item.administrativeUnit.code) ?? [];
    } else {
      //throw new NotFoundException();
    }

    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.task', 'task')
      .where(tasks.length > 0 ? 'task.code IN (:...ids)' : 'false', {
        ids: encours.tasks,
      })
      .distinct(true)
      .getMany();

    if (operations) {
      encours.operations = operations?.map((item) => item.id + '') ?? [];
      encours.imputations = operations?.map((item) => item.imputation) ?? [];

      encours.localities = operations.map((item) => item.locality);
      encours.arrondissements = operations.map(
        (item) => item.arrondissement.code,
      );
      encours.regions = operations.map((item) => item.region.code);
      encours.departments = operations.map((item) => item.department.code);
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
        ids: encours.operations,
      })
      .leftJoinAndSelect('unit.referencePhysicalUnit', 'ref')
      .getMany();

    if (unitesPhys) {
      encours.codeUnitePhysiques =
        unitesPhys?.map((item) => item.referencePhysicalUnit.code) ?? [];
      encours.libelleUnitePhys =
        unitesPhys?.map((item) => item.referencePhysicalUnit.labelFr) ?? []; // LANG MUST BE HANDLED LATTER
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
