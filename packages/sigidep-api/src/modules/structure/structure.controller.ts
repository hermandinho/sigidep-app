import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StructureService } from './structure.service';
import { CreateStructureDto } from './dto/create-structure.dto';
import { StructureEntity } from '../../entities/structure.entity';

@Controller('structure')
@ApiTags('Structure')
export class StructureController {
  constructor(private readonly service: StructureService) {}

  @Get('/check')
  public async structureInstalled(): Promise<StructureEntity> {
    return this.service.structureInstalled();
  }

  @Post('/')
  public async store(
    @Body(ValidationPipe) payload: CreateStructureDto,
  ): Promise<StructureEntity> {
    return this.service.store(payload);
  }
}
