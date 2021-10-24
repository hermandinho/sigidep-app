import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StructureEntity } from '../../entities/structure.entity';
import { Repository } from 'typeorm';
import { CreateStructureDto } from './dto/create-structure.dto';

@Injectable()
export class StructureService {
  constructor(
    @InjectRepository(StructureEntity)
    private readonly structureRepository: Repository<StructureEntity>,
  ) {}

  public async structureInstalled(): Promise<StructureEntity> {
    return this.structureRepository.findOne();
  }

  public async store(params: CreateStructureDto): Promise<StructureEntity> {
    const check = await this.structureRepository.findOne();

    if (check) {
      throw new ConflictException();
    }

    return this.structureRepository.save(new StructureEntity(params));
  }
}
