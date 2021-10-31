import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddressesService } from '@modules/addresses/addresses.service';

@Controller('addresses')
@ApiTags('Addresses')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly services: AddressesService) {}

  @Get('/regions')
  // @UseGuards(new PermissionsGuard([]))
  public async filter() {
    return this.services.filter();
  }
}
