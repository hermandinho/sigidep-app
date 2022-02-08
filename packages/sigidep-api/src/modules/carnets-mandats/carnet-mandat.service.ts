import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CarnetMandatEntity } from '@entities/carnet-mandat.entity';
import { EditCarnetMandatDTO } from './dto/edit-carnet-mandat.dto';

@Injectable()
export class CarnetMandatService {
  constructor(
    @InjectRepository(CarnetMandatEntity)
    private readonly repository: Repository<CarnetMandatEntity>,
  ) {}

  public getRepository(): Repository<CarnetMandatEntity> {
    return this.repository;
  }

  public async filter(): Promise<CarnetMandatEntity[]> {
    return this.repository
      .createQueryBuilder('carnet')
      .leftJoinAndSelect('carnet.gestionnaire', 'gest')
      .leftJoinAndSelect('carnet.exercice', 'exercice')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditCarnetMandatDTO,
    user: UserEntity,
  ): Promise<CarnetMandatEntity> {
    const check = await this.repository
      .createQueryBuilder('carnet')
      .where('carnet.code = :code', { code: payload.code })
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
    payload: EditCarnetMandatDTO,
    user: UserEntity,
  ): Promise<CarnetMandatEntity> {
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
