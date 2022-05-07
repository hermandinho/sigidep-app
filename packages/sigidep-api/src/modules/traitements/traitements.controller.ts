import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TraitementService } from './traitements.service';

@Controller('traitements')
@ApiTags('traitements')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TraitementController {
  constructor(private readonly services: TraitementService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }
}
