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
import { BonEngagementService } from '../service/bons-engagements.service';
import { CreateBonEngagementDTO } from '../dto/create-bon-engagement.dto';
import { EngagementFilter } from '@utils/engagement-filter';
import { CreateTraitementBonEngagementDTO } from '../dto/create-traitement-bon-engagement.dto';
import { TraitementBonEngagementService } from '../service/traitement-bon-engagement.service';
@Controller('traitement-bon-engagements')
@ApiTags('traitement-bon-engagements')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TraitementBonEngagementController {
  constructor(private readonly services: TraitementBonEngagementService) {}

  @Get('/')
  public async filter(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter(filter);
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateTraitementBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateTraitementBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

/*   @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: CreateTraitementBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user, true);
  } */

}
