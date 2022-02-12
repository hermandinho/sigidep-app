import { RegionEntity } from '@entities/region.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async getAll(): Promise<RegionEntity[]> {
    return await this.regionRepository.find();
  }

  async get(id: number): Promise<RegionEntity> {
    return await this.regionRepository.findOne(id);
  }
  async update(id: number, pa): Promise<RegionEntity> {
    return await this.regionRepository.findOne(id);
  }

  async delete(id: number): Promise<any> {
    return await this.regionRepository.delete({ id });
  }
}
