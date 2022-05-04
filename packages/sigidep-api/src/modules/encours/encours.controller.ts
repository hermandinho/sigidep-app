import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
    // console.log("icicicicici", await this.encoursServices.getOne())
    return this.encoursServices.create(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.encoursServices.deleteOne(id);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return this.encoursServices.getOne(id);
  }

  @Get('/exercice/:id')
  public async getEncoursByExercice(@Param('id') id: number) {
    return this.encoursServices
      .getRepository()
      .createQueryBuilder('encours')
      .where('exercise_id=:id', { id })
      .getMany();
  }

  @Get('/imputations/code')
  public async getByImputation(@Query() imputation):Promise<any> {
    return this.encoursServices.findByImputation(imputation);
  }

  @Get('/imputationJoinEngagement/join/one')
  public async getByImputationJoinEng(@Query() imputation):Promise<any> {
    return this.encoursServices.getByImputationJoinEng(imputation);
  }

}
