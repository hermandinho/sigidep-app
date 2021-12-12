import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      .leftJoinAndSelect('s.activities', 'a')
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

  public async createActivity(
    subProgramId: number,
    payload: CreateSubProgramActivityDto,
    user: UserEntity,
  ) {
    const check = await this.activitiesRepository
      .createQueryBuilder('a')
      .leftJoin('a.subProgram', 'sp')
      .where('sp.id = :id', { id: subProgramId })
      .andWhere('a.code = :code', { code: payload.code })
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

    return this.activitiesRepository.save(
      new SubProgramActivityEntity({
        ...payload,
        subProgram: sp,
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
      .andWhere('t.code = :code', { code: payload.code })
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

    return this.activityTasksRepository.save(
      new SubProgramActivityTaskEntity({
        ...payload,
        activity: actCheck,
        financialSource: sourceCheck,
        administrativeUnit: administrativeUnitCheck,
        ...(user && { createdBy: user }),
      }),
    );
  }

  public async createActivityTaskOperation(
    taskId: number,
    param: CreateSubProgramActivityTaskOperationDto,
    user?: UserEntity,
  ) {
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
      .findOne(param.departmentId, {
        loadEagerRelations: false,
      });

    if (!department) {
      throw new NotFoundException('region not found');
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
    return operation;
  }
}
