import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FinancialSourcesService } from '@modules/financial-sources/financial-sources.service';
import { PermissionsGuard } from '@guards/permissions.guard';
import { CreateFinancialSourceDto } from '@modules/financial-sources/dto/create-financial-source.dto';
import { UserEntity } from '@entities/user.entity';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';

@Controller('financial-sources')
@ApiTags('Financial Sources')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class FinancialSourcesController {
  constructor(private readonly services: FinancialSourcesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['financialSources.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['financialSources.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateFinancialSourceDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['financialSources.delete']))
  public async deleteOne(
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.deleteOne(id);
  }
}
