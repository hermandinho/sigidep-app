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
import { EncoursService } from './encours.service';
import { CreateEncoursDTO } from './dto/create-encours.dto';

@Controller('encours')
@ApiTags('encours')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EncoursController {
  constructor(private readonly encoursServices: EncoursService) {}

  @Get('/')
  public async filter() {
    return this.encoursServices.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateEncoursDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.encoursServices.create(payload, user);
  }
  @Put('/')
  public async reload(
    @Body(ValidationPipe) payload: CreateEncoursDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.encoursServices.create(payload, user, true);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.encoursServices.deleteOne(id);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return this.encoursServices.getOne(id);
  }
}
