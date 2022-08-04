import { ModelVirementEntity } from '@entities/model-virement.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModeleVirementDto } from './dto/create-modele-virement.dto';
import { UpdateModeleVirementDto } from './dto/update-modele-virement.dto';

@Injectable()
export class ModeleVirementsService {
    constructor(
        @InjectRepository(ModelVirementEntity)
        private readonly repository: Repository<ModelVirementEntity>,
    ) { }


    create(createVirementDto: CreateModeleVirementDto) {
        return this.repository.save({ ...createVirementDto });
    }

    findAll() {
        return this.repository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} virement`;
    }

    async update(payload: UpdateModeleVirementDto) {
        const check = await this.repository.findOne({
            id: payload.id,
        });

        if (!check) {
            throw new NotFoundException();
        }

        return this.repository.save({ ...payload });
    }

    public async remove(id: number): Promise<any> {
        return this.repository.delete({ id });
    }
}
