import { RegionEntity } from '@entities/region.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';

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
    const r = await this.regionRepository.findOne(id);
    if (!r) {
      throw new NotFoundException();
    }
    return r;
  }

  async update(payload: CreateRegionDto) {
    const r = await this.regionRepository.findOne(payload.id);
    if (!r) {
      throw new NotFoundException();
    }
    console.log(payload);
    try {
      await getConnection()
        .createQueryBuilder()
        .update(RegionEntity)
        .set(payload)
        .where('id = :id', { id: payload.id })
        .execute();
      return await this.regionRepository.findOne(payload.id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: number): Promise<any> {
    return await this.regionRepository.delete({ id });
  }

  async add(createRegionDto: CreateRegionDto): Promise<any> {
    return await this.regionRepository.save(createRegionDto);
  }
}
