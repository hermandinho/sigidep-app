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
import { EngagementFilter } from '@utils/engagement-filter';
import { CreatePaiementDTO } from '../dto/create-paiement.dto';
import { PaiementService } from '../service/paiement.service';
@Controller('paiements')
@ApiTags('paiements')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class PaiementController {
  constructor(private readonly services: PaiementService) {}

  @Get('/')
  public async filter(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter(filter);
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreatePaiementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreatePaiementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

/*   @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: CreatePaiementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user, true);
  } */

}
