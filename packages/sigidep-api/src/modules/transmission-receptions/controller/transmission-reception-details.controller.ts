import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EngagementFilter } from '@utils/engagement-filter';
import { TransmissionReceptionDetailService } from '../service/transmission-receptions-details.service';
@Controller('transmissions-receptions-details')
@ApiTags('transmissions-receptions-details')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TransmissionReceptionDetailController {
  constructor(private readonly services: TransmissionReceptionDetailService) {}

  @Get('/')
  public async getDossierBor(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.getDossierBor(filter);
  }
}
