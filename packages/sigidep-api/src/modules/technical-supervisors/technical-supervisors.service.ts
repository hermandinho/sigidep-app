import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TechnicalSupervisionEntity } from '@entities/technical_supervision.entity';
import { CreateTechnicalSupervisorDto } from '@modules/technical-supervisors/dto/create-technical-supervisor.dto';

@Injectable()
export class TechnicalSupervisorsService {
  constructor(
    @InjectRepository(TechnicalSupervisionEntity)
    private readonly repository: Repository<TechnicalSupervisionEntity>,
  ) {}

  public async filter(): Promise<TechnicalSupervisionEntity[]> {
    return this.repository.createQueryBuilder().getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateTechnicalSupervisorDto,
    user: UserEntity,
  ): Promise<TechnicalSupervisionEntity> {
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
}
