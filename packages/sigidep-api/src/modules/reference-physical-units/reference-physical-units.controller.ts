import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@guards/permissions.guard';
import { ReferencePhysicalUnitsService } from '@modules/reference-physical-units/reference-physical-units.service';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { CreateReferencePhysicalUnitDto } from '@modules/reference-physical-units/dto/create-reference-physical-unit.dto';

@Controller('reference-physical-units')
@ApiTags('Reference Physical Units')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ReferencePhysicalUnitsController {
  constructor(private readonly services: ReferencePhysicalUnitsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['referencePhysicalUnits.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['referencePhysicalUnits.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateReferencePhysicalUnitDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['referencePhysicalUnits.delete']))
  public async deleteOne(
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.deleteOne(id);
  }
}
