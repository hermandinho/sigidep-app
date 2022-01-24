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
import { AuthGuard } from '@nestjs/passport';
import { CategoriesAgentsService } from './categories-agents.service';
import { CreateCategorieAgentsDTO } from './dto/create-categories-agents.dto';

@Controller('categories-agents')
@ApiTags('categories-agents')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CategoriesAgentsController {
  constructor(private readonly services: CategoriesAgentsService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateCategorieAgentsDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateCategorieAgentsDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
