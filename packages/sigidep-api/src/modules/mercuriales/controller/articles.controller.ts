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
import { ArticlesMercurialesService } from '../service';
import { EditArticleMercurialeDTO } from '../dto';

@Controller('mercuriales/articles')
@ApiTags('mercuriales/articles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ArticlesController {
  constructor(private readonly services: ArticlesMercurialesService) {}

  @Get('/')
  @UseGuards(new PermissionsGuard(['articles.read']))
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  @UseGuards(new PermissionsGuard(['articles.create']))
  public async create(
    @Body(ValidationPipe) payload: EditArticleMercurialeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  @UseGuards(new PermissionsGuard(['articles.update']))
  public async update(
    @Body(ValidationPipe) payload: EditArticleMercurialeDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  @UseGuards(new PermissionsGuard(['articles.delete']))
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
