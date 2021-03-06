import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContribuablesService } from './contribuables.service';
import { EditContribuableDTO } from './dto/edit-contribuable.dto';
import { PermissionsGuard } from '@guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('contribuables')
@ApiTags('Contribuables')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ContribuablesController {
  constructor(private readonly services: ContribuablesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['contribuables.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['contribuables.create']))
  public async create(
    @Body(ValidationPipe) payload: EditContribuableDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['contribuables.update']))
  public async update(
    @Body(ValidationPipe) payload: EditContribuableDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['contribuables.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
