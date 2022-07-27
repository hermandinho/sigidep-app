import { Injectable } from '@nestjs/common';
import { CreateModeleVirementDto } from './dto/create-modele-virement.dto';
import { UpdateModeleVirementDto } from './dto/update-modele-virement.dto';

@Injectable()
export class ModeleVirementsService {


    create(createVirementDto: CreateModeleVirementDto) {
        return 'This action adds a new virement';
    }

    findAll() {
        return `This action returns all virements`;
    }

    findOne(id: number) {
        return `This action returns a #${id} virement`;
    }

    update(id: number, updateVirementDto: UpdateModeleVirementDto) {
        return `This action updates a #${id} virement`;
    }

    remove(id: number) {
        return `This action removes a #${id} virement`;
    }
}
