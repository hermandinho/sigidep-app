import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity, ExerciseStatusEnum } from '@entities/exercise.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

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
    let entity = this.exerciseRepository.create({
      startDate: payload.startDate,
      endDate: payload.endDate,
      createdBy: user,
    });

    if (payload.isActive) {
      entity.status = ExerciseStatusEnum.ACTIVE;
    }

    entity = await this.exerciseRepository.save(entity);

    if (payload.isActive) {
      // Archive all previous active items
      await this.exerciseRepository.update(
        {
          id: Not(entity.id),
          status: ExerciseStatusEnum.ACTIVE,
        },
        {
          status: ExerciseStatusEnum.ARCHIVED,
        },
      );
    }

    return this.exerciseRepository
      .createQueryBuilder('e')
      .where('e.id = :id', { id: entity.id })
      .getOne();
  }

  public async deleteMany(ids: number[]): Promise<void> {
    const check = await this.exerciseRepository
      .createQueryBuilder('e')
      .where('id IN (:...ids)', { ids })
      .andWhere('e.status = :status', { status: ExerciseStatusEnum.ACTIVE })
      .getOne();

    if (check) {
      throw new ConflictException();
    }

    this.exerciseRepository.delete({
      id: In(ids),
    });
  }
}
