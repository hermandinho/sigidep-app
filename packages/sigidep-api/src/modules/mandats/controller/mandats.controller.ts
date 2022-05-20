import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MandatService } from '../service/mandats.service';
import { CreateMandatDTO } from '../dto/create-mandat.dto';
import { EngagementFilter } from '@utils/engagement-filter';
@Controller('mandats')
@ApiTags('mandats')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class MandatController {
  constructor(private readonly services: MandatService) {}

  @Get('/')
  public async filter(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateMandatDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateMandatDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }

  @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: CreateMandatDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user, true);
  }

  @Put('/cancel/:id')
  public async cancelReservation(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: CreateMandatDTO,
  ) {
    return this.services.cancelReservation(id);
  }
}
