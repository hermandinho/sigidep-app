import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-banks.dto';

@Controller('banks')
@ApiTags('banks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BanksController {
  constructor(private readonly service: BanksService) {}

  // BANK
  @Post()
  create(@Body(ValidationPipe) createBanksAgenceDto: CreateBankDto) {
    return this.service.create(createBanksAgenceDto);
  }

  @Get()
  findAll() {
    return this.service.filter();
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banksAgencesService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanksAgenceDto: CreateBankDto) {
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
