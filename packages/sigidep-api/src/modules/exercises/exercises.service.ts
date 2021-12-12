import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity, ExerciseStatusEnum } from '@entities/exercise.entity';
import { In, Repository } from 'typeorm';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  public getRepository(): Repository<ExerciseEntity> {
    return this.exerciseRepository;
  }

  public async filter(
    user: UserEntity,
    status?: ExerciseStatusEnum,
  ): Promise<ExerciseEntity[]> {
    // TODO if user does not have permission, we should still return juste the active item?
    const query = this.exerciseRepository.createQueryBuilder('e');
    if (status) {
      query.where('e.status = :status', { status });
    }
    return query.getMany();
  }

  public async create(
    payload: CreateExerciseDto,
    user: UserEntity,
  ): Promise<ExerciseEntity> {
    const check = await this.exerciseRepository
      .createQueryBuilder('e')
      .where('e.endDate >= :end', { end: payload.startDate })
      .getOne();

    if (check) {
      throw new ConflictException();
    }

    const latest = await this.exerciseRepository
      .createQueryBuilder('e')
      .orderBy('e.code', 'DESC')
      .getOne();

    let entity = this.exerciseRepository.create({
      startDate: payload.startDate,
      endDate: payload.endDate,
      createdBy: user,
      // ...(latest && { code: latest.code + 1 }),
      code: latest?.code ? latest.code + 1 : 55, // we are starting in 2021 which has code 55
      status: payload.status,
    });

    if (payload.status === ExerciseStatusEnum.PREPARING) {
      await this.exerciseRepository.update(
        {
          status: ExerciseStatusEnum.PREPARING,
        },
        {
          status: ExerciseStatusEnum.IN_PROGRESS,
        },
      );
    } else if (payload.status === ExerciseStatusEnum.IN_PROGRESS) {
      await this.exerciseRepository.update(
        {
          status: ExerciseStatusEnum.PREPARING,
        },
        {
          status: ExerciseStatusEnum.FOLLOWING,
        },
      );
    } else if (payload.status === ExerciseStatusEnum.FOLLOWING) {
      await this.exerciseRepository.update(
        {
          status: ExerciseStatusEnum.FOLLOWING,
        },
        {
          status: ExerciseStatusEnum.ARCHIVED,
        },
      );
    } else {
      await this.exerciseRepository.update(
        {},
        {
          status: ExerciseStatusEnum.ARCHIVED,
        },
      );
    }

    entity = await this.exerciseRepository.save(entity);

    return this.exerciseRepository
      .createQueryBuilder('e')
      .where('e.id = :id', { id: entity.id })
      .getOne();
  }

  public async deleteMany(ids: number[]): Promise<void> {
    const check = await this.exerciseRepository
      .createQueryBuilder('e')
      .where('id IN (:...ids)', { ids })
      .andWhere('e.status = :status', {
        status: ExerciseStatusEnum.IN_PROGRESS,
      })
      .getOne();

    if (check) {
      throw new ConflictException();
    }

    this.exerciseRepository.delete({
      id: In(ids),
    });
  }
}
