import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TraitementEntity } from '@entities/traitement.entity';

@Injectable()
export class TraitementService {
  constructor(
    @InjectRepository(TraitementEntity)
    private readonly repository: Repository<TraitementEntity>,
  ) {}

  public getRepository(): Repository<TraitementEntity> {
    return this.repository;
  }

  public async filter(): Promise<TraitementEntity[]> {
    return this.repository.createQueryBuilder('traitement').getMany();
  }
}
