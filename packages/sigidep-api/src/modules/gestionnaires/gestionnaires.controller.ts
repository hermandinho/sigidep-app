import { ApiQuery } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GestionnairesService } from './gestionnaires.service';
import { CreateGestionnaireDto } from './dto/create-gestionnaire.dto';

@Controller('gestionnaires')
export class GestionnairesController {
  constructor(private readonly service: GestionnairesService) {}

  @Post()
  create(@Body() createGestionnaireDto: CreateGestionnaireDto) {
    return this.service.create(createGestionnaireDto);
  }

  @Get()
  findAll() {
    return this.service.filter();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('agent/:id')
  findByAgent(@Param('id') id: string) {
    return this.service.findByAgent(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGestionnaireDto: CreateGestionnaireDto,
  ) {
    return this.service.update(+id, updateGestionnaireDto);
  }

  @Delete('/')
  @ApiQuery({ name: 'ids', type: 'string' })
  public async deleteMany(@Query('ids') ids: string): Promise<void> {
    if (!ids?.length) {
      return Promise.resolve();
    }
    return this.service.deleteMany(ids?.split(',').map((item) => +item));
  }
}
