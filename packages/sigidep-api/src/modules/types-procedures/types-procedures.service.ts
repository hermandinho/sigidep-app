import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';

import { TypeProcedureEntity } from '@entities/type-procedure.entity';
import { CreateTypeProcedureDTO } from './dto/create-type-procedure.dto';

@Injectable()
export class TypesProceduresService {
  constructor(
    @InjectRepository(TypeProcedureEntity)
    private readonly repository: Repository<TypeProcedureEntity>,
  ) {}

  public getRepository(): Repository<TypeProcedureEntity> {
    return this.repository;
  }

  public async filter(): Promise<TypeProcedureEntity[]> {
    return this.repository.createQueryBuilder('b').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateTypeProcedureDTO,
    user: UserEntity,
  ): Promise<TypeProcedureEntity> {
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
    payload: CreateTypeProcedureDTO,
    user: UserEntity,
  ): Promise<TypeProcedureEntity> {
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
