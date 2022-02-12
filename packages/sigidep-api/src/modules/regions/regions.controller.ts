import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
}
