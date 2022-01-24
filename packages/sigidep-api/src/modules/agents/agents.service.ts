import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditAgentDTO } from '@modules/agents/dto/edit-agent.dto';
import { UserEntity } from '@entities/user.entity';
import { AgentEntity } from '@entities/agent.entity';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);
  constructor(
    @InjectRepository(AgentEntity)
    private readonly repository: Repository<AgentEntity>,
  ) {}

  public getRepository(): Repository<AgentEntity> {
    return this.repository;
  }

  public async filter(): Promise<AgentEntity[]> {
    return this.repository
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.grade', 'grade')
      .leftJoinAndSelect('agent.categorie', 'categorie')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditAgentDTO,
    user: UserEntity,
  ): Promise<AgentEntity> {
    const check = await this.repository
      .createQueryBuilder('agent')
      .where('agent.matricule = :matricule', { matricule: payload.matricule })
      .getOne();

    if (check) {
      throw new ConflictException();
    }
    try {
      return this.repository.save({
        ...payload,
        createdBy: user,
      });
    } catch (error) {
      this.logger.warn(`Error ${error.toString()} categories `);
      throw error;
    }
  }

  public async update(
    payload: EditAgentDTO,
    user: UserEntity,
  ): Promise<AgentEntity> {
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
