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
import { PermissionsGuard } from '@guards/permissions.guard';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { TechnicalSupervisorsService } from '@modules/technical-supervisors/technical-supervisors.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTechnicalSupervisorDto } from '@modules/technical-supervisors/dto/create-technical-supervisor.dto';

@Controller('technical-supervisors')
@ApiTags('Technical Supervisors')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TechnicalSupervisorsController {
  constructor(private readonly services: TechnicalSupervisorsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['technicalSupervisions.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['technicalSupervisions.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateTechnicalSupervisorDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['technicalSupervisions.delete']))
  public async deleteOne(
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.deleteOne(id);
  }
}
