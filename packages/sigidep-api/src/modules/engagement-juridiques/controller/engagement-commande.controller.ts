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
import { EngagementCommandeDTO } from '../dto/create-engagement-commande.dto';
import { EngagementCommandeService } from '../service/engagement-commande.service';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';
import { ProcedureCommande } from '../types';
import { EngagementFilter } from '@utils/engagement-filter';
@Controller('engagements/commandes')
@ApiTags('engagements/commandes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EngagementCommandeController {
  constructor(private readonly services: EngagementCommandeService) {}

  @Get('/')
  public async filter(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter(filter);
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: EngagementCommandeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: EngagementCommandeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    const val = { ...payload, etat: EtatEngagementEnum.RESERVED };
    return this.services.update(val, user, true);
  }
  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: EngagementCommandeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
