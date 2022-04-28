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
    let res = null;
    for (let i = 0; i < payload.imputations.length; i++) {
      let data = {
        startDate: payload.imputations[0].startDate,
        endDate: payload.imputations[0].endDate,
        imputation: payload.imputations[0].element.imputation,
        tache: payload.imputations[0].element.task,
        operation: payload.imputations[0].element.operation?.labelEn,
        gestionnaire: payload.gestionnaire,
      };
      res = this.repository.save({ ...data });
    }

    return res;
  }

  async findAll() {
    return this.repository.query(
      'SELECT COUNT(accreditation.id) as count, gestionnaires.* FROM accreditation,gestionnaires WHERE gestionnaires.id = accreditation.gestionnaire_id  GROUP BY gestionnaires.id',
    );
    // return this.repository.find({
    //   relations: ['gestionnaire'],
    // });
  }

  async findOne(id: number) {
    const r = await this.repository.findOne(id);
    if (!r) {
      throw new NotFoundException();
    }
    return r;
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

  delete(id: number) {
    return this.repository.delete({ id });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    this.repository.delete({
      id: In(ids),
    });
  }
}
