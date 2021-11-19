import {
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

@Injectable()
export class SubProgramsService {
  constructor(
    @InjectRepository(SubProgramEntity)
    private readonly repository: Repository<SubProgramEntity>,
    @InjectRepository(SubProgramActivityEntity)
    private readonly activitiesRepository: Repository<SubProgramActivityEntity>,
    @InjectRepository(SubProgramActivityTaskEntity)
    private readonly activityTasksRepository: Repository<SubProgramActivityTaskEntity>,

    private exercisesService: ExercisesService,
    private structuresService: StructureService,
  ) {}

  public async filter() {
    return this.repository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.owner', 'o')
      .leftJoinAndSelect('s.activities', 'a')
      .leftJoinAndSelect('a.tasks', 't')
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

    return this.activityTasksRepository.save(
      new SubProgramActivityTaskEntity({
        ...payload,
        activity: actCheck,
        ...(user && { createdBy: user }),
      }),
    );
  }
}
