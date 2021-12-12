import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorEntity } from '@entities/sector.entity';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly repository: Repository<SectorEntity>,
  ) {}

  public getRepository(): Repository<SectorEntity> {
    return this.repository;
  }

  public async filter(): Promise<SectorEntity[]> {
    return this.repository.createQueryBuilder('c').getMany();
  }
}
