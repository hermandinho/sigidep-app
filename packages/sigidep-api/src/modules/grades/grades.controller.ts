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
import { GradesService } from './grades.service';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('grades')
@ApiTags('grades')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class GradesController {
  constructor(private readonly services: GradesService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateGradeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateGradeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
