import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VirementsService } from './virements.service';
import { CreateVirementDto } from './dto/create-virement.dto';
import { UpdateVirementDto } from './dto/update-virement.dto';

@Controller('virements')
export class VirementsController {
  constructor(private readonly virementsService: VirementsService) {}

  @Post()
  create(@Body() createVirementDto: CreateVirementDto) {
    return this.virementsService.create(createVirementDto);
  }

  @Get()
  findAll() {
    return this.virementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.virementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVirementDto: UpdateVirementDto) {
    return this.virementsService.update(+id, updateVirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.virementsService.remove(+id);
  }
}
