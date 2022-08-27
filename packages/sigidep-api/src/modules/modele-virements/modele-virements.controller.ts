import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateModeleVirementDto } from './dto/create-modele-virement.dto';
import { UpdateModeleVirementDto } from './dto/update-modele-virement.dto';
import { ModeleVirementsService } from './modele-virements.service';

@Controller('modele-virements')
export class ModeleVirementsController {

    constructor(private readonly virementsService: ModeleVirementsService) { }

    @Post()
    create(@Body() createModelVirementDto: CreateModeleVirementDto) {
        return this.virementsService.create(createModelVirementDto);
    }

    @Get()
    findAll() {
        return this.virementsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.virementsService.findOne(+id);
    }

    @Put('/')
    update(@Body() updateVirementDto: UpdateModeleVirementDto) {
        return this.virementsService.update(updateVirementDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.virementsService.remove(+id);
    }
}
