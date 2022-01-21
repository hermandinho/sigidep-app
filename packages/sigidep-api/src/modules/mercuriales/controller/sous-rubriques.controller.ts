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
import { SousRubriquesService } from '../service';
import { EditSousRubriqueDTO } from '../dto';

@Controller('mercuriales/sous-rubriques')
@ApiTags('mercuriales/sous-rubriques')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class SousRubriquesController {
  constructor(private readonly services: SousRubriquesService) {}

  @Get('/')
  public async filter() {
    return this.services.filter();
  }

  @Post('/')
  public async create(
    @Body(ValidationPipe) payload: EditSousRubriqueDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.create(payload, user);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: EditSousRubriqueDTO,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.services.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.services.deleteOne(id);
  }
}
