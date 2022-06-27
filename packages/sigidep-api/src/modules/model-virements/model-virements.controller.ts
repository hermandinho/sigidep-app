import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelVirementsService } from './model-virements.service';
import { CreateModelVirementDto } from './dto/create-model-virement.dto';
import { UpdateModelVirementDto } from './dto/update-model-virement.dto';

@Controller('model-virements')
export class ModelVirementsController {
  constructor(private readonly modelVirementsService: ModelVirementsService) {}

  @Post()
  create(@Body() createModelVirementDto: CreateModelVirementDto) {
    return this.modelVirementsService.create(createModelVirementDto);
  }

  @Get()
  findAll() {
    return this.modelVirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelVirementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelVirementDto: UpdateModelVirementDto) {
    return this.modelVirementsService.update(+id, updateModelVirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelVirementsService.remove(+id);
  }
}
