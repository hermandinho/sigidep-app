import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateExecProcedureDTO } from './dto/create-exec-procedure.dto';
import { ExecProcedureEntity } from '@entities/exec-procedure.entity';

@Injectable()
export class ExecProcedureService {
  constructor(
    @InjectRepository(ExecProcedureEntity)
    private readonly repository: Repository<ExecProcedureEntity>,
  ) {}

  public getRepository(): Repository<ExecProcedureEntity> {
    return this.repository;
  }

  public async filter(): Promise<ExecProcedureEntity[]> {
    return this.repository.createQueryBuilder('execp').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateExecProcedureDTO,
    user: UserEntity,
  ): Promise<ExecProcedureEntity> {
    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: CreateExecProcedureDTO,
    user: UserEntity,
  ): Promise<ExecProcedureEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
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
