import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '@guards/permissions.guard';
import { UserEntity } from '@entities/user.entity';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { AdministrativeUnitsService } from '@modules/administrative-units/services/administrative-units.service';
import { CreateAdministrativeUnitDto } from '@modules/administrative-units/dto/create-administrative-unit.dto';
import { CreatePrimaryFunctionDto } from '@modules/administrative-units/dto/create-primary-function.dto';
import { CreateSecondaryFunctionDto } from '@modules/administrative-units/dto/create-secondary-function.dto';

@Controller('administrative-units')
@ApiTags('Administrative Units')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AdministrativeUnitsController {
  constructor(private readonly services: AdministrativeUnitsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['administrativeUnits.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['administrativeUnits.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateAdministrativeUnitDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['administrativeUnits.delete']))
  public async deleteOne(
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.deleteOne(id);
  }

  @Post('/primary-function')
  @UseGuards(new PermissionsGuard(['functions.create']))
  public async createPrimaryFunction(
    @Body(ValidationPipe) payload: CreatePrimaryFunctionDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.createFunction('primary', payload, user);
  }

  @Post('/secondary-function')
  @UseGuards(new PermissionsGuard(['functions.create']))
  public async createSecondaryFunction(
    @Body(ValidationPipe) payload: CreateSecondaryFunctionDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.createFunction('secondary', payload, user);
  }

  @Get('/functions')
  @ApiQuery({ name: 'type', type: 'string', enum: ['primary', 'secondary'] })
  @UseGuards(new PermissionsGuard(['functions.read']))
  public async filterFunctions(@Query('type') type: 'primary' | 'secondary') {
    return this.services.filterFunctions(type);
  }
}
