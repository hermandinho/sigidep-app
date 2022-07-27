import { Injectable } from '@nestjs/common';
import { CreateVirementDto } from './dto/create-virement.dto';
import { UpdateVirementDto } from './dto/update-virement.dto';

@Injectable()
export class VirementsService {
  create(createVirementDto: CreateVirementDto) {
    return 'This action adds a new virement';
  }

  findAll() {
    return `This action returns all virements`;
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
}
