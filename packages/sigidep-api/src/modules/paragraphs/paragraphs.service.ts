import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { ParagraphEntity } from '@entities/paragraph.entity';
import { CreateParagraphDto } from '@modules/paragraphs/dto/create-paragraph.dto';
import { FinancialSourcesService } from '@modules/financial-sources/financial-sources.service';

@Injectable()
export class ParagraphsService {
  constructor(
    @InjectRepository(ParagraphEntity)
    private readonly repository: Repository<ParagraphEntity>,

    private financialSourcesService: FinancialSourcesService,
  ) {}

  public async filter(): Promise<ParagraphEntity[]> {
    return this.repository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.nature', 'n')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateParagraphDto,
    user: UserEntity,
  ): Promise<ParagraphEntity> {
    const check = await this.repository.findOne({
      code: payload.code,
    });

    if (check) {
      throw new ConflictException();
    }

    const nature = await this.financialSourcesService
      .getRepository()
      .findOne(payload.financialSourceId, { loadEagerRelations: false });

    if (!nature) {
      throw new NotFoundException('nature');
    }

    return this.repository.save({
      ...payload,
      createdBy: user,
      nature,
    });
  }
}
