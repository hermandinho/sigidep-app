import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EngagementMandatsDecissionService } from '../service/engagement-mandats-decission.service';
import { CreateEngagementMandatDecissionDTO } from '../dto/create-engagement-mandats-decission.dto';
import { EtatEngagementMandatDecissionEnum } from '@entities/engagement-mandat-decission.entity';
@Controller('engagements/mandats')
@ApiTags('engagements/mandats')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EngagementMandatDecissionController {
  constructor(private readonly services: EngagementMandatsDecissionService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateEngagementMandatDecissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateEngagementMandatDecissionDTO,
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
    @Body(ValidationPipe) payload: CreateEngagementMandatDecissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    const val = { ...payload, etat: EtatEngagementMandatDecissionEnum.RESERVED };
    return this.services.update(val, user, true);
  }

  @Put('/cancel/:id')
  public async cancelReservation(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: CreateEngagementMandatDecissionDTO,
  ) {
    return this.services.cancelReservation(id);
  }

}
