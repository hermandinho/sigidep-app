import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { GradeEntity } from '@entities/grade.entity';
import { CreateGradeDTO } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly repository: Repository<GradeEntity>,
  ) {}

  public getRepository(): Repository<GradeEntity> {
    return this.repository;
  }

  public async filter(): Promise<GradeEntity[]> {
    return this.repository.createQueryBuilder('c').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateGradeDTO,
    user: UserEntity,
  ): Promise<GradeEntity> {
    const check = await this.repository.findOne({
      code: payload.code,
    });

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: CreateGradeDTO,
    user: UserEntity,
  ): Promise<GradeEntity> {
    const check = await this.repository.findOne({
      code: payload.code,
    });

    if (!check) {
      throw new NotFoundException();
    }

    return this.repository.save({
      ...payload,
      updateBy: user,
    });
  }
}
