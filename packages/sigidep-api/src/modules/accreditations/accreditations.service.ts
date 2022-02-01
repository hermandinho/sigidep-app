import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { AccreditationEntity } from '@entities/accreditation.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class AccreditationsService {
  constructor(
    @InjectRepository(AccreditationEntity)
    private readonly repository: Repository<AccreditationEntity>,
  ) {}

  async create(payload: CreateAccreditationDto) {
    const check = await this.repository.findOne(
      { imputation: payload.imputation },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({ ...payload });
  }

  findAll() {
    return `This action returns all accreditations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accreditation`;
  }

  findByGestionnaire(id: number) {
    return `This action returns a #${id} accreditation`;
  }

  async update(id: number, payload: CreateAccreditationDto) {
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
