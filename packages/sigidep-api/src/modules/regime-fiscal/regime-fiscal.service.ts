import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { RegimeFiscalEntity } from '@entities/regime-fiscal.entity';
import { CreateRegimeFiscalDTO } from './dto/create-regime-fiscal.dto';

@Injectable()
export class RegimeFiscalService {
  constructor(
    @InjectRepository(RegimeFiscalEntity)
    private readonly repository: Repository<RegimeFiscalEntity>,
  ) {}

  public getRepository(): Repository<RegimeFiscalEntity> {
    return this.repository;
  }

  public async filter(): Promise<RegimeFiscalEntity[]> {
    return this.repository.createQueryBuilder('c').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateRegimeFiscalDTO,
    user: UserEntity,
  ): Promise<RegimeFiscalEntity> {
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
    payload: CreateRegimeFiscalDTO,
    user: UserEntity,
  ): Promise<RegimeFiscalEntity> {
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
