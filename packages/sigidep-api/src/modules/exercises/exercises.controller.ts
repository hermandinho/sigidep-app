import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ExercisesService } from '@modules/exercises/exercises.service';
import { CreateExerciseDto } from '@modules/exercises/dto/create-exercise.dto';
import { ExerciseEntity, ExerciseStatusEnum } from '@entities/exercise.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';

@Controller('exercises')
@ApiTags('Exercises')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['exercises.read']))
  @ApiQuery({
    name: 'status',
    type: 'enum',
    enum: ExerciseStatusEnum,
    required: false,
  })
  public async filter(
    @GetCurrentUser() user: UserEntity,
    @Query('status') status: ExerciseStatusEnum,
  ): Promise<ExerciseEntity[]> {
    return this.service.filter(user, status);
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['exercises.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateExerciseDto,
    @GetCurrentUser() user: UserEntity,
  ): Promise<ExerciseEntity> {
    return this.service.create(payload, user);
  }
}
