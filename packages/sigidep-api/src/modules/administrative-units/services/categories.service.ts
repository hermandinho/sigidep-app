import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '@entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  public getRepository(): Repository<CategoriesEntity> {
    return this.categoriesRepository;
  }

  public async filter(): Promise<CategoriesEntity[]> {
    return this.categoriesRepository.createQueryBuilder('c').getMany();
  }
}
