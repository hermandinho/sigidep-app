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
import { ContribuablesBudgetairesService } from './contribuables-budgetaires.service';
import { CreateContribuablesBudgetaireDto } from './dto/create-contribuables-budgetaire.dto';

@Controller('contribuables-budgetaires')
export class ContribuablesBudgetairesController {
  constructor(private readonly service: ContribuablesBudgetairesService) {}

  @Post()
  create(
    @Body() createContribuablesBudgetaireDto: CreateContribuablesBudgetaireDto,
  ) {
    return this.service.create(createContribuablesBudgetaireDto);
  }

  @Get()
  findAll() {
    return this.service.filter();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContribuablesBudgetaireDto: CreateContribuablesBudgetaireDto,
  ) {
    return this.service.update(+id, updateContribuablesBudgetaireDto);
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
