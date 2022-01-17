import { InjectRepository } from '@nestjs/typeorm';
import { BanksEntity } from '@entities/bank.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankDto } from './dto/create-banks.dto';
import { Repository, In } from 'typeorm';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(BanksEntity)
    private readonly repository: Repository<BanksEntity>,
  ) {}

  async create(payload: CreateBankDto): Promise<BanksEntity> {
    const check = await this.repository.findOne(
      { code: payload.code },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({ ...payload });
  }

  public async filter(): Promise<BanksEntity[]> {
    return this.repository.find({ relations: ['agences'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} banksAgence`;
  }

  async update(id: number, payload: CreateBankDto) {
    const check = await this.repository.findOne(
      { id },
      { loadEagerRelations: false },
    );

    if (!check) {
      throw new NotFoundException();
    }

    Object.assign(check, { ...payload });
    return check.save();
  }

  public async deleteMany(ids: number[]): Promise<void> {
    this.repository.delete({
      id: In(ids),
    });
  }
}
