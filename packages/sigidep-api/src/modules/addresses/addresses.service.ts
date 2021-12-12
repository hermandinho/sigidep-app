import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from '@entities/region.entity';
import { DepartmentEntity } from '@entities/department.entity';
import { ArrondissementEntity } from '@entities/arrondissement.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionsRepository: Repository<RegionEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentsRepository: Repository<DepartmentEntity>,
    @InjectRepository(ArrondissementEntity)
    private readonly arrondissementsRepository: Repository<ArrondissementEntity>,
  ) {}

  public getRegionsRepository(): Repository<RegionEntity> {
    return this.regionsRepository;
  }

  public getDepartmentsRepository(): Repository<DepartmentEntity> {
    return this.departmentsRepository;
  }

  public getArrondissementsRepository(): Repository<ArrondissementEntity> {
    return this.arrondissementsRepository;
  }

  public async filter(): Promise<RegionEntity[]> {
    return this.regionsRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.departments', 'd')
      .leftJoinAndSelect('d.arrondissements', 'a')
      .getMany();
  }
}
