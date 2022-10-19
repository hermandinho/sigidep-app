import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BonEngagementService } from '../service/bons-engagements.service';
import { CreateBonEngagementDTO } from '../dto/create-bon-engagement.dto';
import { EngagementFilter } from '@utils/engagement-filter';
@Controller('bons-engagements')
@ApiTags('bons-engagements')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BonEngagementController {
  constructor(private readonly services: BonEngagementService) {}

  @Get('/')
  public async filter(
    @Query(new ValidationPipe({ transform: true })) filter: EngagementFilter,
  ) {
    return this.services.filter(filter);
  }

  @Get('/factures/:id/articles')
  public async getFactureArticles(@Param('id') id: number) {
    return this.services.getArticles(id);
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: CreateBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }

  @Delete('/factures/:idf/articles/:ida')
  public async deleteFActureArticle(
    @Param('idf') idf: number,
    @Param('ida') ida: number,
  ) {
    return this.services.deleteFactureArticle(ida);
  }
  @Put('/reservation')
  public async reserve(
    @Body(ValidationPipe) payload: CreateBonEngagementDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user, true);
  }

  @Put('/cancel/:id')
  public async cancelReservation(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: any,
  ) {
    return this.services.cancelReservation(id, payload);
  }

  @Put('/certificat/:id')
  public async certification(
    @Param('id') id: number,
    @Body(ValidationPipe) payload: any,
  ) {
    return this.services.certification(id, payload);
  }
}
