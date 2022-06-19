import { Injectable } from '@nestjs/common';
import { CreateModelVirementDto } from './dto/create-model-virement.dto';
import { UpdateModelVirementDto } from './dto/update-model-virement.dto';

@Injectable()
export class ModelVirementsService {
  create(createModelVirementDto: CreateModelVirementDto) {
    return 'This action adds a new modelVirement';
  }

  findAll() {
    return `This action returns all modelVirements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modelVirement`;
  }

  update(id: number, updateModelVirementDto: UpdateModelVirementDto) {
    return `This action updates a #${id} modelVirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} modelVirement`;
  }
}
