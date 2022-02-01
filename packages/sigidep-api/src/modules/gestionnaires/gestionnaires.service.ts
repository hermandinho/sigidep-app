import { InjectRepository } from '@nestjs/typeorm';
import { GestionnairesEntity } from './../../entities/gestionnaire.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGestionnaireDto } from './dto/create-gestionnaire.dto';
import { Repository, In } from 'typeorm';

@Injectable()
export class GestionnairesService {
  constructor(
    @InjectRepository(GestionnairesEntity)
    private readonly repository: Repository<GestionnairesEntity>,
  ) {}

  async create(payload: CreateGestionnaireDto): Promise<GestionnairesEntity> {
    const check = await this.repository.findOne(
      { matricule: payload.matricule },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({ ...payload });
  }

  findAll() {
    return `This action returns all gestionnaires`;
  }

  public async filter(): Promise<GestionnairesEntity[]> {
    return this.repository.find({
      relations: ['agent', 'accreditations'],
    });
  }

  findByAgent(agentId: number) {
    return this.repository.findOne({
      where: { agent: { id: agentId } },
      relations: ['agent', 'accreditations'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} gestionnaire`;
  }

  async update(
    id: number,
    payload: CreateGestionnaireDto,
  ): Promise<GestionnairesEntity> {
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
