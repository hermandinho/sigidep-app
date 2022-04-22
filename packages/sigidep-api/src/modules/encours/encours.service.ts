import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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
import { encours_query } from './sql';

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

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public getRepository(): Repository<EncoursEntity> {
    return this.encoursRepository;
  }

  public async filter(): Promise<EncoursEntity[]> {
    return this.encoursRepository
      .createQueryBuilder('encours')
      .leftJoinAndSelect('encours.operation', 'operation')
      .getMany();
  }

  public async getOne(
    id?: number,
    codeExercise?: number,
  ): Promise<EncoursEntity> {
    return this.encoursRepository
      .createQueryBuilder('encours')
      .where(!codeExercise ? 'encours.id = :code' : 'exercise = :code', {
        code: !codeExercise ? id : codeExercise,
      })
      .getOne();
  }

  public async getOne2() {
    return this.connection.query(encours_query);
  }

  public async deleteOne(id: number): Promise<any> {
    return this.encoursRepository.delete({ id });
  }

  public async findByImputation(imputation: any): Promise<EncoursEntity[]> {
    console.log(imputation.imputation);
    return this.encoursRepository
      .createQueryBuilder("encours")
      .where("encours.imputation like :name", { name:`%${imputation.imputation}%` })
      .getMany();
  }

  async getByImputation(payload: any): Promise<any> {
    const check = await this.encoursRepository.findOne(
      { imputation: payload.imputation }
    );

    if (check) {
      throw new ConflictException();
    }
    return check;
   /*  return this.encoursRepository
      .createQueryBuilder('encours')
      .where("encours.imputation = :imputation",{imputation: "55 01 04 330030 222210 911 - MAT, EQUIP TECH & ENGAG TRANSIT" })
      .getOne(); */
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
      encours.exercise = exercise.code + '';
    } else {
      throw new NotFoundException(); //Exercise not found
    }

    
    /*
    const subPrograms = await this.subProgramRepository
      .createQueryBuilder('subprogram')
      .leftJoinAndSelect('subprogram.exercise', 'exercise')
      .where('exercise.code = :code', { code: exercise?.code })
      .getMany();

    if (subPrograms) {
      encours.subProgram = subPrograms?.map((item) => item.code);
    } else {
      //throw new NotFoundException();
    }

    const actions = await this.actionRepository
      .createQueryBuilder('action')
      .distinct(true)
      .leftJoinAndSelect('action.subProgram', 'subprogram')
      .where(
        subPrograms.length > 0 ? 'subprogram.code IN (:...codes)' : 'false',
        {
          codes: encours.subProgram,
        },
      )
      .getMany();
    if (actions) {
      encours.action = actions?.map((item) => item.code);
      encours.nombreActions = actions?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const activities = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.action', 'action')
      .where(actions.length > 0 ? 'action.code IN (:...codes)' : 'false', {
        codes: encours.action,
      })
      .getMany();

    if (activities) {
      encours.activity = activities?.map((item) => item.code);
      encours.nombreActivites = activities?.length ?? undefined;
    } else {
      //throw new NotFoundException();
    }

    const tasks = await this.activityTaskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.activity', 'activity')
      .where(activities.length > 0 ? 'activity.code IN (:...ids)' : 'false', {
        ids: encours?.activity,
      })
      .distinct(true)
      .getMany();

    if (tasks) {
      encours.task = tasks?.map((item) => item.code);
      encours.nombreTasks = tasks?.length ?? undefined;
      encours.adminUnit = tasks?.map((item) => item.administrativeUnit.code);
    } else {
      //throw new NotFoundException();
    }

    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.task', 'task')
      .where(tasks.length > 0 ? 'task.code IN (:...ids)' : 'false', {
        ids: encours?.task,
      })
      .distinct(true)
      .getMany();

    if (operations) {
      encours.operation = operations?.map((item) => item.id + '');
      encours.operations = operations ?? undefined;
      encours.imputation = operations?.map((item) => item.imputation);

      encours.localite = operations.map((item) => item.locality);
      encours.arrondissement = operations.map(
        (item) => item.arrondissement.code,
      );
      encours.region = operations.map((item) => item.region.code);
      encours.department = operations.map((item) => item.department.code);
      encours.gestionnaire = operations.map((item) => item.managerName);
      encours.sourceVerif = operations.map((item) => item.verificationSourceFr); // should use LANG
      encours.modeGestion = operations.map((item) => item.managementMode);
      encours.livrables = operations.map((item) => item.deliverablesFr);

      encours.nombreOperations = operations?.length;
      encours.nombreImputations = encours.imputation?.length;
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
      /*
      encours.volumeAE = operations
        .map((item) => item.engagementAuthorization)
        .reduce((prev, current) => current + prev, 0); // SHOULD RECHECK THE FORMULE
   
    } else {
      //throw new NotFoundException();
    }

    const unitesPhys = await this.unitePhysiquesRepository
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.operation', 'operation')
      .where(operations.length > 0 ? 'operation.id IN (:...ids)' : 'false', {
        ids: encours?.operation,
      })
      .leftJoinAndSelect('unit.referencePhysicalUnit', 'ref')
      .getMany();

    if (unitesPhys) {
      encours.unitePhysique = unitesPhys?.map((item) => item.id + '');
      encours.libelleUnitePhys =
        unitesPhys?.map((item) => item.referencePhysicalUnit.labelFr) ??
        undefined; // LANG MUST BE HANDLED LATTER
      encours.puUnitePhys = unitesPhys?.map((item) => item.unitPrice) ?? [];
      encours.montantUnitePhys =
        unitesPhys?.map((item) => item.totalPrice) ?? [];
      encours.nombreUnitesPhysiques = unitesPhys?.length;
    } else {
      //throw new NotFoundException();
    }

    encours.valeurSeuil = payload.valeurSeuil;
 */
    return this.encoursRepository.save({
      ...encours,
      createdBy: user,
    });
  }
}
