import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateFinancialSourceDto } from '@modules/financial-sources/dto/create-financial-source.dto';

@Injectable()
export class FinancialSourcesService {
  constructor(
    @InjectRepository(FinancialSourceEntity)
    private readonly financialSourcesRepository: Repository<FinancialSourceEntity>,
  ) {}

  public getRepository(): Repository<FinancialSourceEntity> {
    return this.financialSourcesRepository;
  }

  public async filter(): Promise<FinancialSourceEntity[]> {
    return this.financialSourcesRepository.createQueryBuilder('f').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.financialSourcesRepository.delete({ id });
  }

  public async create(
    payload: CreateFinancialSourceDto,
    user: UserEntity,
  ): Promise<FinancialSourceEntity> {
    const check = await this.financialSourcesRepository.findOne({
      code: payload.code,
    });

    if (check) {
      throw new ConflictException();
    }

    return this.financialSourcesRepository.save({
      ...payload,
      createdBy: user,
    });
  }
}
