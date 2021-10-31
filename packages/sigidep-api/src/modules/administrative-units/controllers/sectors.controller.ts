import { Controller, Get, UseGuards } from '@nestjs/common';
import { SectorsService } from '@modules/administrative-units/services/sectors.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('sectors')
@ApiTags('Sectors')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class SectorsController {
  constructor(private readonly services: SectorsService) {}

  @Get('/')
  // @UseGuards(new PermissionsGuard([]))
  public async filter() {
    return this.services.filter();
  }
}
