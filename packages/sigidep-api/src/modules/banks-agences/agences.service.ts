import { InjectRepository } from '@nestjs/typeorm';
import { AgencesEntity } from './../../entities/agence.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { Repository, In } from 'typeorm';

@Injectable()
export class AgencesService {
  constructor(
    @InjectRepository(AgencesEntity)
    private readonly repository: Repository<AgencesEntity>,
  ) {}

  async create(payload: CreateAgenceDto): Promise<AgencesEntity> {
    const check = await this.repository.findOne(
      { code: payload.code },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({ ...payload });
  }

  findAll() {
    return `This action returns all banksAgences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banksAgence`;
  }

  async update(id: number, payload: CreateAgenceDto) {
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
