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
import { EngagementMissionDTO } from '../dto/create-engagement-mission.dto';
import { EngagementMissionService } from '../service/engagement-mission.service';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';
@Controller('engagements/missions')
@ApiTags('engagements/missions')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EngagementMissionController {
  constructor(private readonly services: EngagementMissionService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: EngagementMissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: EngagementMissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: EngagementMissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    const val = { ...payload, etat: EtatEngagementEnum.RESERVED };
    return this.services.update(val, user, true);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
