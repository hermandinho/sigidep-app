import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private regionService: RegionsService) {}

  @Get()
  async getRegions() {
    return await this.regionService.getAll();
  }

  @Get(':id')
  async retrieveRegion(@Param('id') id: number) {
    return await this.regionService.get(id);
  }

  @Post()
  async create(@Body(ValidationPipe) payload: CreateRegionDto) {
    return await this.regionService.add(payload);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: CreateRegionDto,
  ) {
    payload.id = +id;
    return await this.regionService.update(payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.regionService.delete(id);
  }
}
