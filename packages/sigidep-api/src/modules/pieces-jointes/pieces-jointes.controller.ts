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
import { PiecesJointesService } from './pieces-jointes.service';
import { CreatePieceJointeDTO } from './dto/create-piece-jointe.dto';
import { PermissionsGuard } from '@guards/permissions.guard';

@Controller('pieces-jointes')
@ApiTags('PiecesJointes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class PiecesJointesController {
  constructor(private readonly services: PiecesJointesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['piecesJointes.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['piecesJointes.create']))
  public async create(
    @Body(ValidationPipe) payload: CreatePieceJointeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['piecesJointes.update']))
  public async update(
    @Body(ValidationPipe) payload: CreatePieceJointeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['piecesJointes.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
