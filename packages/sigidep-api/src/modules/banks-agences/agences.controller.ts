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
import { AgencesService } from './agences.service';
import { CreateAgenceDto } from './dto/create-agence.dto';

@Controller('agences')
export class AgencesController {
  constructor(private readonly service: AgencesService) {}

  // BANK
  @Post()
  create(@Body() createBanksAgenceDto: CreateAgenceDto) {
    return this.service.create(createBanksAgenceDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBanksAgenceDto: CreateAgenceDto,
  ) {
    return this.service.update(+id, updateBanksAgenceDto);
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
