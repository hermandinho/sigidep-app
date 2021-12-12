import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParagraphsService } from '@modules/paragraphs/paragraphs.service';
import { ReferencePhysicalUnitEntity } from '@entities/reference-physical-unit.entity';
import { UserEntity } from '@entities/user.entity';
import { CreateReferencePhysicalUnitDto } from '@modules/reference-physical-units/dto/create-reference-physical-unit.dto';

@Injectable()
export class ReferencePhysicalUnitsService {
  constructor(
    @InjectRepository(ReferencePhysicalUnitEntity)
    private readonly repository: Repository<ReferencePhysicalUnitEntity>,

    private paragraphsService: ParagraphsService,
  ) {}

  public getRepository(): Repository<ReferencePhysicalUnitEntity> {
    return this.repository;
  }

  public async filter(): Promise<ReferencePhysicalUnitEntity[]> {
    return this.repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.paragraph', 'p')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateReferencePhysicalUnitDto,
    user: UserEntity,
  ): Promise<ReferencePhysicalUnitEntity> {
    const paragraph = await this.paragraphsService
      .getRepository()
      .findOne(payload.paragraphId, {
        loadEagerRelations: false,
      });

    if (!paragraph) {
      throw new NotFoundException();
    }

    const check = await this.repository.findOne(
      {
        paragraph,
        labelFr: payload.labelFr,
        labelEn: payload.labelEn,
      },
      { loadEagerRelations: false, order: { id: -1 } },
    );

    if (check) {
      throw new ConflictException();
    }

    const latest = await this.repository.findOne(
      {
        paragraph,
      },
      { loadEagerRelations: false, order: { id: -1 } },
    );

    const nextCode =
      +(latest && !isNaN(+latest?.code?.slice(-2))
        ? +latest?.code?.slice(-2) || 0
        : 0) + 1;

    return this.repository.save({
      ...payload,
      createdBy: user,
      paragraph,
      code: `${paragraph.code}${nextCode < 9 ? '0' + nextCode : nextCode}`,
    });
  }
}
