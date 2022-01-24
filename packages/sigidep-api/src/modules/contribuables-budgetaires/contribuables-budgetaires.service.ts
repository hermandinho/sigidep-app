import { ExerciseEntity, ExerciseStatusEnum } from '@entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContribuableBudgetaireEntity } from './../../entities/contribuable-budgetaire.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContribuablesBudgetaireDto } from './dto/create-contribuables-budgetaire.dto';
import { Repository, In } from 'typeorm';

@Injectable()
export class ContribuablesBudgetairesService {
  constructor(
    @InjectRepository(ContribuableBudgetaireEntity)
    private readonly repository: Repository<ContribuableBudgetaireEntity>,
  ) {}

  async create(payload: CreateContribuablesBudgetaireDto) {
    const count = await this.repository.count();
    let codeContribBudg = `${payload.exercice.code}CB`;
    let lastTenDigits = '';
    let lastInsertedNumber = 1;

    if (count) {
      const lastInserted = await this.repository.findOne({
        order: { id: 'DESC' },
      });
      lastInsertedNumber = parseInt(lastInserted.code.split('CB')[1], 10);
    }

    lastTenDigits = new Number(lastInsertedNumber + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 10,
      useGrouping: false,
    });

    codeContribBudg += lastTenDigits;

    const check = await this.repository.findOne(
      { code: payload.code },
      { loadEagerRelations: false },
    );

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({ ...payload, code: codeContribBudg });
  }

  public async filter(): Promise<ContribuableBudgetaireEntity[]> {
    return this.repository.find({
      relations: ['exercice', 'banque', 'agence'],
    });
  }

  findAll() {
    return `This action returns all contribuablesBudgetaires`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contribuablesBudgetaire`;
  }

  async update(id: number, payload: CreateContribuablesBudgetaireDto) {
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
