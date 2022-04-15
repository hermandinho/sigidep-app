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
import { EngagementJuridiqueService } from '../service/engagement-juridique.service';
import { CreateEngagementJuridiqueDTO } from '../dto/create-engagement-juridique.dto';
@Controller('engagements')
@ApiTags('engagements')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class EngagementJuridiqueController {
  constructor(private readonly services: EngagementJuridiqueService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateEngagementJuridiqueDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateEngagementJuridiqueDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }

  @Put('/:id')
  public async cancelReservation(@Param('id') id: number) {
    return this.services.cancelReservation(id);
  }
}
