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
import { AccreditationsService } from './accreditations.service';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';

@Controller('accreditations')
export class AccreditationsController {
  constructor(private readonly service: AccreditationsService) {}

  @Post()
  create(@Body() createAccreditationDto: CreateAccreditationDto) {
    console.log(createAccreditationDto.imputations[0].element);
    return this.service.create(createAccreditationDto);
  }

  @Get()
  findAll() {
    let data = this.service.findAll();
    console.log(data);
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('/gestionnaire/:id')
  findByGestionnaire(@Param('id') id: string) {
    return this.service.findByGestionnaire(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccreditationDto: CreateAccreditationDto,
  ) {
    return this.service.update(+id, updateAccreditationDto);
  }

  @Delete('/')
  @ApiQuery({ name: 'ids', type: 'string' })
  public async deleteMany(@Query('ids') ids: string): Promise<void> {
    if (!ids?.length) {
      return Promise.resolve();
    }
    return this.service.deleteMany(ids?.split(',').map((item) => +item));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
