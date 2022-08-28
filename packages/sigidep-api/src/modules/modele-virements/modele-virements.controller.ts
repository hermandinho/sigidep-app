import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateModeleVirementDto } from './dto/create-modele-virement.dto';
import { UpdateModeleVirementDto } from './dto/update-modele-virement.dto';
import { ModeleVirementsService } from './modele-virements.service';

@Controller('modele-virements')
export class ModeleVirementsController {

    constructor(private readonly modelVirementService: ModeleVirementsService) { }

    @Post()
    create(@Body() createModelVirementDto: CreateModeleVirementDto) {
        return this.modelVirementService.create(createModelVirementDto);
    }

    @Get()
    findAll() {
        return this.modelVirementService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.modelVirementService.findOne(+id);
    }

    @Put('/')
    update(@Body() updateVirementDto: UpdateModeleVirementDto) {
        return this.modelVirementService.update(updateVirementDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.modelVirementService.remove(+id);
    }
}
