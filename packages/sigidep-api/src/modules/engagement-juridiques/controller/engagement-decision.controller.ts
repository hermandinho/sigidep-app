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
import { EngagementDecisionDTO } from '../dto/create-engagement-decision.dto';
import { EngagementDecisionService } from '../service/engagement-decision.service';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';
@Controller('engagements/decisions')
@ApiTags('engagements/decisions')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EngagementDecisionController {
  constructor(private readonly services: EngagementDecisionService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: EngagementDecisionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: EngagementDecisionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    const val = { ...payload, etat: EtatEngagementEnum.RESERVED };
    return this.services.update(val, user, true);
  }
  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: EngagementDecisionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
