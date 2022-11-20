import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';
import { UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('TypesProcedures')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class UsersController {

    constructor(private readonly services: UsersService) {}
    @Get('/')
    public async filter() {
      return this.services.filter();
    }
  
    @Post('/')
    public async create(
      @Body(ValidationPipe) payload: UserDTO,
      @GetCurrentUser() user: UserEntity,
    ) {
      return this.services.create(payload, user);
    }
  
    @Delete('/:id')
    public async deleteOne(@Param('id') id: number) {
      return this.services.deleteOne(id);
    }

    @Put('/')
    public async desactiver(
      @Body(ValidationPipe) payload: UserDTO,
      @GetCurrentUser() user: UserEntity,
    ) {
      return this.services.desactiver(payload, user);
    }
}
