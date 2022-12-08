import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StructureService } from './structure.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { StructureEntity } from '@entities/structure.entity';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { UserEntity } from '../../entities/user.entity';

@Controller('structure')
@ApiTags('Structure')
export class StructureController {
  constructor(private readonly service: StructureService) {}

  @Get('/get/all')
  public async filter() {
    return this.service.filter();
  }

  @Get('/')
  public async findDefault(): Promise<StructureEntity> {
    return this.service.getStructure();
  }

  @Get('/check')
  public async structureInstalled(): Promise<StructureEntity> {
    return this.service.getStructure();
  }

  @Post('/')
  public async store(
    @Body(ValidationPipe) payload: CreateStructureDto,
  ): Promise<StructureEntity> {
    return this.service.store(payload);
  }

  @Put('/')
  public async update(
    @Body(ValidationPipe) payload: CreateStructureDto,
    @GetCurrentUser() user: UserEntity,
  ) {
    return this.service.update(payload, user);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: number) {
    return this.service.deleteOne(id);
  }

  @Get('/get/Structure/Default')
  public async getStructureDefault(): Promise<StructureEntity> {
    return this.service.getStructureDefault();
  }
}
