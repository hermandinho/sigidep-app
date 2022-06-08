import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import { AccreditationEntity } from '@entities/accreditation.entity';
import { Repository, In } from 'typeorm';
import { GestionnairesEntity } from '@entities/gestionnaire.entity';
import { AgentEntity } from '@entities/agent.entity';

@Injectable()
export class AccreditationsService {
  constructor(
    @InjectRepository(AccreditationEntity)
    private readonly repository: Repository<AccreditationEntity>,

    @InjectRepository(GestionnairesEntity)
    private readonly gestionnaireRepository: Repository<GestionnairesEntity>,
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>
  ) { }

  async create(payload: CreateAccreditationDto) {
    let gestionnaire = null;
    gestionnaire = await this.gestionnaireRepository.createQueryBuilder('gestionnaire')
      .where('gestionnaire.agentId = :id', { id: payload.gestionnaire.id })
      .getOne();
    if (!gestionnaire) {
      const agent = await this.agentRepository.findOne(payload.gestionnaire.id);
      if (!agent) {
        throw new NotFoundException();
      }

      const gestionnaireData = {
        matricule: agent.matricule,
        nom: agent.nom,
        prenom: agent.prenom,
        fonction: agent.fonction,
        agent: agent,
      }
      gestionnaire = await this.gestionnaireRepository.save(gestionnaireData);
    }
    let res = null;
    for (let i = 0; i < payload.imputations.length; i++) {
      let data = {
        startDate: payload.imputations[i].startDate,
        endDate: payload.imputations[i].endDate,
        imputation: payload.imputations[i].element.imputation,
        tache: payload.imputations[i].element.task,
        operation: payload.imputations[i].element.operation?.labelEn,
        gestionnaire: gestionnaire,
      };
      res = this.repository.save({ ...data });
    }

    return res;
  }

  async findAll() {
    return this.repository.query(
      'SELECT COUNT(accreditation.id) as count, gestionnaires.* FROM accreditation,gestionnaires WHERE gestionnaires.id = accreditation.gestionnaire_id  GROUP BY gestionnaires.id',
    );
  }

  async findOne(id: number) {
    const r = await this.repository.findOne(id);
    if (!r) {
      throw new NotFoundException();
    }
    return r;
  }

  findByGestionnaire(id: number) {
    return this.gestionnaireRepository.findOne(id, {
      relations: ['accreditations'],
    });
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
