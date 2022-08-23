import { EncoursEntity } from '@entities/encours.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { VirementEntity } from '@entities/virement.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVirementDto } from './dto/create-virement.dto';
import { UpdateVirementDto } from './dto/update-virement.dto';

@Injectable()
export class VirementsService {
  constructor(
    @InjectRepository(VirementEntity)
    private readonly repository: Repository<VirementEntity>,
    @InjectRepository(SubProgramEntity)
    private readonly subProgram: Repository<SubProgramEntity>,
    @InjectRepository(EncoursEntity)
    private readonly encourRepository: Repository<EncoursEntity>,
  ) { }

  create(createVirementDto: CreateVirementDto) {
    return 'This action adds a new virement';
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} virement`;
  }

  update(id: number, updateVirementDto: UpdateVirementDto) {
    return `This action updates a #${id} virement`;
  }

  remove(id: number) {
    return `This action removes a #${id} virement`;
  }

  getSubProgramByExercise(id: number) {
    return this.subProgram.createQueryBuilder('s').where('s.exercise_id = :id', { id: +id }).getMany();
  }

  getEncours(id: number) {
    // return this.encourRepository.find();
    return this.encourRepository.createQueryBuilder('e').where(
      'e.exercise = :id', { id: +id }
    ).leftJoinAndSelect('e.operation', 'o').getMany();
  }
}
