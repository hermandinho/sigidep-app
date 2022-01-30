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
import { PermissionsGuard } from '@guards/permissions.guard';
import { TypesProceduresService } from './types-procedures.service';
import { CreateTypeProcedureDTO } from './dto/create-type-procedure.dto';

@Controller('types-procedures')
@ApiTags('TypesProcedures')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TypesProceduresController {
  constructor(private readonly services: TypesProceduresService) {}
  @Get('/')
  @UseGuards(new PermissionsGuard(['typesProcedures.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['typesProcedures.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateTypeProcedureDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['typesProcedures.update']))
  public async update(
    @Body(ValidationPipe) payload: CreateTypeProcedureDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['typesProcedures.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
