import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubProgramsService } from '@modules/sub-programs/sub-programs.service';
import { PermissionsGuard } from '@guards/permissions.guard';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { CreateSubProgramDto } from '@modules/sub-programs/dto/create-sub-program.dto';
import { CreateSubProgramActivityDto } from '@modules/sub-programs/dto/create-sub-program-activity.dto';
import { CreateSubProgramActivityTaskDto } from '@modules/sub-programs/dto/create-sub-program-activity-task.dto';

@Controller('sub-programs')
@ApiTags('Sub programs')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class SubProgramsController {
  constructor(private readonly services: SubProgramsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['subPrograms.read']))
  public async filter(@GetCurrentUser() user: UserEntity) {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['subPrograms.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateSubProgramDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Post('/:id/activity')
  @UseGuards(new PermissionsGuard(['subPrograms.create']))
  public async createActivity(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: CreateSubProgramActivityDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.createActivity(id, payload, user);
  }

  @Post('/:id/activity/:actId/task')
  @UseGuards(new PermissionsGuard(['subPrograms.create']))
  public async createActivityTask(
    @Param('id') id: number,
    @Param('actId') actId: number,
    @Body(ValidationPipe) payload: CreateSubProgramActivityTaskDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.createActivityTask(id, actId, payload, user);
  }
}
