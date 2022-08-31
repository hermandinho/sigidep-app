import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VirementsService } from './virements.service';
import { CreateVirementDto } from './dto/create-virement.dto';
import { UpdateVirementDto } from './dto/update-virement.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@guards/permissions.guard';
import { ValidationVirementDTO } from './dto/validation-virement.dto';

@Controller('virements')
// @ApiTags('Virements')
// @UseGuards(AuthGuard())
// @ApiBearerAuth()
export class VirementsController {
  constructor(private readonly virementsService: VirementsService) { }

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

  @Post('/update')
  update(@Body() updateVirementDto: UpdateVirementDto) {
    return this.virementsService.update(updateVirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.virementsService.remove(+id);
  }



  @Get('exercice/:id')
  public async subProgramByExercise(@Param('id') id: number) {
    return this.virementsService.getSubProgramByExercise(id);
  }

  @Get('encour/:id')
  public async getEncourWithSubProgramActivity(@Param('id') id: number) {
    return this.virementsService.getEncours(id);
  }

  @Post('reserver/:id')
  public async reserver(@Param('id') id: string) {
    return this.virementsService.reserver(+id);
  }

  @Post('valider/')
  public async valiter(@Body() validationDTO: ValidationVirementDTO) {
    return this.virementsService.valider(validationDTO);
  }

  @Post('annuler/:id')
  public async annuler(@Param('id') id: string) {
    return this.virementsService.annuler(+id);
  }
}
