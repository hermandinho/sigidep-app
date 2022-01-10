import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { CreateSubProgramDto } from '@modules/sub-programs/dto/create-sub-program.dto';
import { UserEntity } from '@entities/user.entity';
import { ExercisesService } from '@modules/exercises/exercises.service';
import { StructureService } from '@modules/structure/structure.service';
import { CreateSubProgramActivityDto } from '@modules/sub-programs/dto/create-sub-program-activity.dto';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';
import { CreateSubProgramActivityTaskDto } from '@modules/sub-programs/dto/create-sub-program-activity-task.dto';
import { FinancialSourcesService } from '@modules/financial-sources/financial-sources.service';
import { AdministrativeUnitsService } from '@modules/administrative-units/services/administrative-units.service';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from '@entities/sub-program-activity-task-operation-physical-unit.entity';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';
import { CreateSubProgramActivityTaskOperationDto } from '@modules/sub-programs/dto/create-sub-program-activity-task-operation.dto';
import { AddressesService } from '@modules/addresses/addresses.service';
import { ParagraphsService } from '@modules/paragraphs/paragraphs.service';
import { SubProgramActionEntity } from '@entities/sub-program-action.entity';
import { CreateSubProgramActionDto } from '@modules/sub-programs/dto/create-sub-program-action.dto';

@Injectable()
export class SubProgramsService {
  constructor(
    @InjectRepository(SubProgramEntity)
    private readonly repository: Repository<SubProgramEntity>,
    @InjectRepository(SubProgramActivityEntity)
    private readonly activitiesRepository: Repository<SubProgramActivityEntity>,
    @InjectRepository(SubProgramActivityTaskEntity)
    private readonly activityTasksRepository: Repository<SubProgramActivityTaskEntity>,
    @InjectRepository(SubProgramActivityTaskOperationEntity)
    private readonly operationRepository: Repository<SubProgramActivityTaskOperationEntity>,
    @InjectRepository(SubProgramActivityTaskOperationPhysicalUnitEntity)
    private readonly operationPhysicalUnitRepository: Repository<SubProgramActivityTaskOperationPhysicalUnitEntity>,
    @InjectRepository(SubProgramActionEntity)
    private readonly subProgramActionRepository: Repository<SubProgramActionEntity>,

    private exercisesService: ExercisesService,
    private structuresService: StructureService,
    private financialSourcesService: FinancialSourcesService,
    private administrativeUnitsService: AdministrativeUnitsService,
    private addressesService: AddressesService,
    private paragraphsService: ParagraphsService,
  ) {}

  public async filter() {
    return this.repository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.owner', 'o')
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
      .getMany();
  }

  public async create(payload: CreateSubProgramDto, user: UserEntity) {
    const check = await this.repository.findOne(
      { code: payload.identification.code },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    const structure = await this.structuresService
      .getRepository()
      .findOne(payload.structureId, { loadEagerRelations: false });

    if (!structure) {
      throw new NotFoundException();
    }

    const exercise = await this.exercisesService
      .getRepository()
      .findOne(payload.exerciseId, { loadEagerRelations: false });

    if (!exercise) {
      throw new NotFoundException();
    }

    const { identification, objectives, strategies } = payload;
    return this.repository.save(
      new SubProgramEntity({
        exercise,
        structure,
        code: identification.code,
        labelFr: identification.labelFr,
        labelEn: identification.labelEn,
        presentationFr: identification.presentationFr,
        presentationEn: identification.presentationEn,
        startDate: identification.startDate,
        endDate: identification.endDate,
        objectives,
        strategies,
        createdBy: user,
      }),
    );
  }

  public async createAction(
    subProgramId: number,
    payload: CreateSubProgramActionDto,
    user: UserEntity,
  ) {
    const check = await this.subProgramActionRepository
      .createQueryBuilder('a')
      .leftJoin('a.subProgram', 'sp')
      .where('sp.id = :id', { id: subProgramId })
      // .andWhere('a.code = :code', { code: payload.code })
      .andWhere(
        new Brackets((sq) => {
          sq.where('a.labelFr = :lfr', { lfr: payload.labelFr }).andWhere(
            'a.labelEn = :len',
            { len: payload.labelEn },
          );
        }),
      )
      .getOne();
    if (check) {
      throw new ConflictException();
    }
    const sp = await this.repository.findOne(subProgramId, {
      loadEagerRelations: false,
    });

    if (!sp) {
      throw new NotFoundException();
    }

    const latest = await this.subProgramActionRepository.findOne(
      {
        subProgram: sp,
      },
      { loadEagerRelations: false, order: { id: -1 } },
    );

    const nextCode =
      +(latest && !isNaN(+latest?.code?.slice(-2))
        ? +latest?.code?.slice(-2) || 0
        : 0) + 1;

    return this.subProgramActionRepository.save(
      new SubProgramActionEntity({
        ...payload,
        code: `${nextCode < 9 ? '0' + nextCode : nextCode}`,
        subProgram: sp,
        createdBy: user,
      }),
    );
  }

  public async createActivity(
    subProgramId: number,
    actionId: number,
    payload: CreateSubProgramActivityDto,
    user: UserEntity,
  ) {
    const check = await this.activitiesRepository
      .createQueryBuilder('a')
      .leftJoin('a.action', 'ac')
      .where('ac.id = :id', { id: actionId })
      // .andWhere('a.code = :code', { code: payload.code })
      .andWhere(
        new Brackets((sq) => {
          sq.where('a.labelFr = :lfr', { lfr: payload.labelFr }).andWhere(
            'a.labelEn = :len',
            { len: payload.labelEn },
          );
        }),
      )
      .getOne();
    if (check) {
      throw new ConflictException();
    }

    const action = await this.subProgramActionRepository.findOne(actionId, {
      loadEagerRelations: false,
    });

    if (!action) {
      throw new NotFoundException();
    }

    const latest = await this.activitiesRepository.findOne(
      {
        action,
      },
      { loadEagerRelations: false, order: { id: -1 } },
    );

    const nextCode =
      +(latest && !isNaN(+latest?.code?.slice(-2))
        ? +latest?.code?.slice(-2) || 0
        : 0) + 1;

    return this.activitiesRepository.save(
      new SubProgramActivityEntity({
        ...payload,
        code: `${nextCode < 9 ? '0' + nextCode : nextCode}`,
        action,
        createdBy: user,
      }),
    );
  }

  public async createActivityTask(
    subProgramId: number,
    activityId: number,
    payload: CreateSubProgramActivityTaskDto,
    user?: UserEntity,
  ): Promise<any> {
    const check = await this.activityTasksRepository
      .createQueryBuilder('t')
      .leftJoin('t.activity', 'act')
      .where('act.id = :id', { id: activityId })
      // .andWhere('t.code = :code', { code: payload.code })
      .andWhere(
        new Brackets((sq) => {
          sq.where('t.labelFr = :lfr', { lfr: payload.labelFr }).andWhere(
            't.labelEn = :len',
            { len: payload.labelEn },
          );
        }),
      )
      .getOne();
    if (check) {
      throw new ConflictException();
    }

    const spCheck = await this.repository.findOne(subProgramId, {
      loadEagerRelations: false,
    });
    if (!spCheck) throw new NotFoundException('sub_program_not_found');

    const actCheck = await this.activitiesRepository.findOne(activityId, {
      loadEagerRelations: false,
    });
    if (!actCheck) throw new NotFoundException('activity_not_found');

    const administrativeUnitCheck = await this.administrativeUnitsService
      .getRepository()
      .findOne(payload.administrativeUnitId, {
        loadEagerRelations: false,
      });
    if (!administrativeUnitCheck)
      throw new NotFoundException('administrative_unit_not_found');

    const sourceCheck = await this.financialSourcesService
      .getRepository()
      .findOne(payload.financialSourceId, {
        loadEagerRelations: false,
      });
    if (!sourceCheck) throw new NotFoundException('financial_source_not_found');

    const latest = await this.activityTasksRepository.findOne(
      {
        activity: actCheck,
      },
      { loadEagerRelations: false, order: { id: -1 } },
    );

    const nextCode =
      +(latest && !isNaN(+latest?.code?.slice(-2))
        ? +latest?.code?.slice(-2) || 0
        : 0) + 1;

    return this.activityTasksRepository.save(
      new SubProgramActivityTaskEntity({
        ...payload,
        code: `${nextCode < 9 ? '0' + nextCode : nextCode}`,
        activity: actCheck,
        financialSource: sourceCheck,
        administrativeUnit: administrativeUnitCheck,
        ...(user && { createdBy: user }),
      }),
    );
  }

  public async createActivityTaskOperation(
    taskId: number,
    actId: number,
    param: CreateSubProgramActivityTaskOperationDto,
    user?: UserEntity,
  ) {
    const activity = await this.activitiesRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.action', 'ac')
      .where('a.id = :id', { id: actId })
      .getOne();

    if (!activity) {
      throw new NotFoundException('activity not found');
    }

    const task = await this.activityTasksRepository.findOne(taskId, {
      loadEagerRelations: false,
    });

    if (!task) {
      throw new NotFoundException('task not found');
    }

    const paragraph = await this.paragraphsService
      .getRepository()
      .findOne(param.paragraphId, {
        loadEagerRelations: false,
      });

    if (!paragraph) {
      throw new NotFoundException('paragraph not found');
    }

    const check = await this.operationRepository.findOne(
      {
        imputation: param.imputation,
        task,
        paragraph,
      },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    const region = await this.addressesService
      .getRegionsRepository()
      .findOne(param.regionId, {
        loadEagerRelations: false,
      });

    if (!region) {
      throw new NotFoundException('region not found');
    }

    const department = await this.addressesService
      .getDepartmentsRepository()
      .createQueryBuilder('d')
      .where('d.id = :id', { id: param.departmentId })
      .getOne();
    /*.findOne(param.departmentId, {
        loadEagerRelations: false,
      });*/

    if (!department) {
      throw new NotFoundException('department not found');
    }

    const arrondissement = await this.addressesService
      .getArrondissementsRepository()
      .findOne(param.arrondissementId, {
        loadEagerRelations: false,
      });

    if (!arrondissement) {
      throw new NotFoundException('region not found');
    }

    const operation = await this.operationRepository.save(
      new SubProgramActivityTaskOperationEntity({
        labelEn: param.labelEn,
        labelFr: param.labelFr,
        deliverablesEn: param.deliverablesEn,
        deliverablesFr: param.deliverablesFr,
        chronogram: param.chronogram,
        imputation: param.imputation,
        locality: param.locality,
        managementMode: param.managementMode,
        managerName: param.managerName,
        paymentCreditN1: param.paymentCreditN1 || 0,
        paymentCreditN2: param.paymentCreditN2 || 0,
        paymentCreditN3: param.paymentCreditN3 || 0,
        engagementAuthorization: param.engagementAuthorization || 0,
        verificationSourceEn: param.verificationSourceEn,
        verificationSourceFr: param.verificationSourceFr,
        task,
        paragraph,
        region,
        department,
        arrondissement,
        createdBy: user,
      }),
    );

    if (param.physicalUnits?.length && operation) {
      try {
        await this.operationPhysicalUnitRepository.insert(
          param.physicalUnits.map((item) => {
            return new SubProgramActivityTaskOperationPhysicalUnitEntity({
              referencePhysicalUnit: { id: item.id },
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              totalPrice: item.totalPrice || item.unitPrice * item.quantity,
              operation,
              createdBy: user,
            });
          }),
        );
      } catch (e) {
        await this.operationRepository.remove(operation);
      }
    }

    if (!operation) {
      throw new BadRequestException();
    }

    const action = await this.subProgramActionRepository.findOne(
      activity.action?.id,
      { loadEagerRelations: false },
    );
    if (action) {
      action.cpN1 = (action.cpN1 || 0) + operation.paymentCreditN1;
      action.cpN2 = (action.cpN2 || 0) + operation.paymentCreditN2;
      action.cpN3 = (action.cpN3 || 0) + operation.paymentCreditN3;
      action.engagementAuthorization =
        (action.engagementAuthorization || 0) +
        (operation.paymentCreditN1 +
          operation.paymentCreditN2 +
          operation.paymentCreditN3);

      await action.save();
    }
    return operation;
  }
}
