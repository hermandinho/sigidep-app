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
import { TransmissionReceptionService } from '../service/transmission-receptions.service';
import { TransmissionReceptionDTO } from '../dto/transmission-receptions.dto';
import { EngagementFilter } from '@utils/engagement-filter';
@Controller('transmissions-receptions')
@ApiTags('transmissions-receptions')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TransmissionReceptionController {
  constructor(private readonly services: TransmissionReceptionService) {}

  @Get('/')
  public async filter(
  @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter(filter);
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: TransmissionReceptionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: any,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Put('/cancel/:id')
  public async cancel(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: TransmissionReceptionDTO,
  ) {
    return this.services.cancel(id);
  }

  @Get('/detail')
  public async getDossierBor(@Query(new ValidationPipe({ transform: true })) filter: number,
  ) {
    return this.services.getDossierBor(filter);
  }
  @Get('/bon')
  public async getBonEnAttente( @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,) {
    return this.services.getBonEnAttente(filter);
  }
}
