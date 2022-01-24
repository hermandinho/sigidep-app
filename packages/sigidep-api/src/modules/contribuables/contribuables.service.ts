import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContribuableEntity } from '@entities/contribuable.entity';
import { EditContribuableDTO } from './dto/edit-contribuable.dto';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class ContribuablesService {
  constructor(
    @InjectRepository(ContribuableEntity)
    private readonly repository: Repository<ContribuableEntity>,
  ) {}

  public getRepository(): Repository<ContribuableEntity> {
    return this.repository;
  }

  public async filter(): Promise<ContribuableEntity[]> {
    return this.repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.regimeFiscal', 'r')
      .leftJoinAndSelect('c.banque', 'b')
      .leftJoinAndSelect('c.agence', 'a')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditContribuableDTO,
    user: UserEntity,
  ): Promise<ContribuableEntity> {
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
    payload: EditContribuableDTO,
    user: UserEntity,
  ): Promise<ContribuableEntity> {
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
