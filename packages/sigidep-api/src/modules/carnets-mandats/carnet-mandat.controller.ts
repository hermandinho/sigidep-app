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
import { PermissionsGuard } from '@guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { CarnetMandatService } from './carnet-mandat.service';
import { EditCarnetMandatDTO } from './dto/edit-carnet-mandat.dto';

@Controller('carnets-mandats')
@ApiTags('carnets-mandats')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CarnetMandatController {
  constructor(private readonly services: CarnetMandatService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['carnetsMandats.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['carnetsMandats.create']))
  public async create(
    @Body(ValidationPipe) payload: EditCarnetMandatDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['carnetsMandats.update']))
  public async update(
    @Body(ValidationPipe) payload: EditCarnetMandatDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['carnetsMandats.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
