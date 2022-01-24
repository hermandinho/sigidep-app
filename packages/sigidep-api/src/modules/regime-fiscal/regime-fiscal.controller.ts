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
import { PermissionsGuard } from '@guards/permissions.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegimeFiscalService } from './regime-fiscal.service';
import { CreateRegimeFiscalDTO } from './dto/create-regime-fiscal.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('regimes')
@ApiTags('regimes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RegimeFiscalController {
  constructor(private readonly services: RegimeFiscalService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['regimes.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['regimes.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateRegimeFiscalDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['regimes.update']))
  public async update(
    @Body(ValidationPipe) payload: CreateRegimeFiscalDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['regimes.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
