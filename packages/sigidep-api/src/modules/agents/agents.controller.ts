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
import { AgentsService } from './agents.service';
import { PermissionsGuard } from '@guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { EditAgentDTO } from './dto/edit-agent.dto';

@Controller('agents')
@ApiTags('Agents')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AgentsController {
  constructor(private readonly services: AgentsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['agents.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['agents.create']))
  public async create(
    @Body(ValidationPipe) payload: EditAgentDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['agents.update']))
  public async update(
    @Body(ValidationPipe) payload: EditAgentDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['agents.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
