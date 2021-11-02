import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { ParagraphEntity } from '@entities/paragraph.entity';
import { CreateParagraphDto } from '@modules/paragraphs/dto/create-paragraph.dto';

@Injectable()
export class ParagraphsService {
  constructor(
    @InjectRepository(ParagraphEntity)
    private readonly repository: Repository<ParagraphEntity>,
  ) {}

  public async filter(): Promise<ParagraphEntity[]> {
    return this.repository.createQueryBuilder('f').getMany();
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

    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }
}
