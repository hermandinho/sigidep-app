import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { RubriqueMercurialeEntity } from '@entities/rubrique-mercuriale.entity';
import { EditRubriqueDTO } from '../dto';

@Injectable()
export class RubriquesService {
  constructor(
    @InjectRepository(RubriqueMercurialeEntity)
    private readonly repository: Repository<RubriqueMercurialeEntity>,
  ) {}

  public getRepository(): Repository<RubriqueMercurialeEntity> {
    return this.repository;
  }

  public async filter(): Promise<RubriqueMercurialeEntity[]> {
    return this.repository.createQueryBuilder('rub').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditRubriqueDTO,
    user: UserEntity,
  ): Promise<RubriqueMercurialeEntity> {
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
    payload: EditRubriqueDTO,
    user: UserEntity,
  ): Promise<RubriqueMercurialeEntity> {
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
