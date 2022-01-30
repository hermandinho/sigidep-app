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
import { AuthGuard } from '@nestjs/passport';
import { BaremeMissionService } from './bareme-mission.service';
import { CreateBaremeMissionDTO } from './dto/create-bareme-mission.dto';
import { PermissionsGuard } from '@guards/permissions.guard';

@Controller('baremes-missions')
@ApiTags('BaremesMissions')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BaremeMissionController {
  constructor(private readonly services: BaremeMissionService) {}
  @Get('/')
  @UseGuards(new PermissionsGuard(['baremes.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['baremes.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateBaremeMissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['baremes.update']))
  public async update(
    @Body(ValidationPipe) payload: CreateBaremeMissionDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['baremes.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
