import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { ExecTaxesEntity } from '@entities/exec-taxes.entity';
import { CreateExecTaxesDTO } from './dto/create-exec-taxes.dto';

@Injectable()
export class ExecTaxesService {
  constructor(
    @InjectRepository(ExecTaxesEntity)
    private readonly repository: Repository<ExecTaxesEntity>,
  ) {}

  public getRepository(): Repository<ExecTaxesEntity> {
    return this.repository;
  }

  public async filter(): Promise<ExecTaxesEntity[]> {
    return this.repository.createQueryBuilder('exectaxe').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateExecTaxesDTO,
    user: UserEntity,
  ): Promise<ExecTaxesEntity> {
    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: CreateExecTaxesDTO,
    user: UserEntity,
  ): Promise<ExecTaxesEntity> {
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
