import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { ArticleMercurialeEntity } from '@entities/article-mercuriale.entity';
import { EditArticleMercurialeDTO } from '../dto';

@Injectable()
export class ArticlesMercurialesService {
  private readonly logger = new Logger(ArticlesMercurialesService.name);
  constructor(
    @InjectRepository(ArticleMercurialeEntity)
    private readonly repository: Repository<ArticleMercurialeEntity>,
  ) {}

  public getRepository(): Repository<ArticleMercurialeEntity> {
    return this.repository;
  }

  public async filter(): Promise<ArticleMercurialeEntity[]> {
    return this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.sousRubrique', 'sousRubrique')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EditArticleMercurialeDTO,
    user: UserEntity,
  ): Promise<ArticleMercurialeEntity> {
    const check = await this.repository
      .createQueryBuilder('article')
      .where('article.code = :code', { code: payload.code })
      .getOne();

    if (check) {
      throw new ConflictException();
    }
    try {
      return this.repository.save({
        ...payload,
        createdBy: user,
      });
    } catch (error) {
      this.logger.warn(`Error ${error.toString()} `);
      throw error;
    }
  }

  public async update(
    payload: EditArticleMercurialeDTO,
    user: UserEntity,
  ): Promise<ArticleMercurialeEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    return this.repository.save({
      ...payload,
      updateBy: user,
    });
  }
}
