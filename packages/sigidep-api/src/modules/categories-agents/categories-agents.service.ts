import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateCategorieAgentsDTO } from './dto/create-categories-agents.dto';
import { CategorieAgentEntity } from '@entities/categorie-agent.entity';

@Injectable()
export class CategoriesAgentsService {
  constructor(
    @InjectRepository(CategorieAgentEntity)
    private readonly repository: Repository<CategorieAgentEntity>,
  ) {}

  public getRepository(): Repository<CategorieAgentEntity> {
    return this.repository;
  }

  public async filter(): Promise<CategorieAgentEntity[]> {
    return this.repository.createQueryBuilder('c').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateCategorieAgentsDTO,
    user: UserEntity,
  ): Promise<CategorieAgentEntity> {
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
    payload: CreateCategorieAgentsDTO,
    user: UserEntity,
  ): Promise<CategorieAgentEntity> {
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
