import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from '@entities/region.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionsRepository: Repository<RegionEntity>,
  ) {}

  public getRegionsRepository(): Repository<RegionEntity> {
    return this.regionsRepository;
  }

  public async filter(): Promise<RegionEntity[]> {
    return this.regionsRepository.createQueryBuilder('c').getMany();
  }
}
