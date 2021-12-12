import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionsGuard } from '@guards/permissions.guard';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '@entities/user.entity';
import { ParagraphsService } from '@modules/paragraphs/paragraphs.service';
import { CreateParagraphDto } from '@modules/paragraphs/dto/create-paragraph.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateBulkParagraphsDto } from '@modules/paragraphs/dto/create-bulk-paragraphs.dto';

@Controller('paragraphs')
@ApiTags('Paragraphs')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ParagraphsController {
  constructor(private readonly services: ParagraphsService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['paragraphs.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['paragraphs.create']))
  public async create(
    @Body(ValidationPipe) payload: CreateParagraphDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Post('/bulk')
  @UseGuards(new PermissionsGuard(['paragraphs.create']))
  public async createBulk(
    @Body(ValidationPipe) payload: CreateBulkParagraphsDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.insertBulk(payload);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['paragraphs.delete']))
  public async deleteOne(
    @Param('id') id: number,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.deleteOne(id);
  }
}
