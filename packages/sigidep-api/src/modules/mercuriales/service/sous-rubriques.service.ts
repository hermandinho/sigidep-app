import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { SousRubriqueMercurialeEntity } from '@entities/sous-rubriques-mercuriales.entity';
import { EditSousRubriqueDTO } from '../dto';

@Injectable()
export class SousRubriquesService {
  constructor(
    @InjectRepository(SousRubriqueMercurialeEntity)
    private readonly repository: Repository<SousRubriqueMercurialeEntity>,
  ) {}

  public getRepository(): Repository<SousRubriqueMercurialeEntity> {
    return this.repository;
  }

  public async filter(): Promise<SousRubriqueMercurialeEntity[]> {
    return this.repository
      .createQueryBuilder('sousRubrique')
      .leftJoinAndSelect('sousRubrique.rubrique', 'rubrique')
      .addOrderBy('rubrique.code', 'ASC')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditSousRubriqueDTO,
    user: UserEntity,
  ): Promise<SousRubriqueMercurialeEntity> {
    const check = await this.repository
      .createQueryBuilder('sousRubrique')
      .leftJoinAndSelect('sousRubrique.rubrique', 'rubrique')
      .where('sousRubrique.code = :code1 ', { code1: payload.code })
      .andWhere('rubrique.code = :code2', { code2: payload.rubrique.code })
      .getOne();

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: EditSousRubriqueDTO,
    user: UserEntity,
  ): Promise<SousRubriqueMercurialeEntity> {
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
