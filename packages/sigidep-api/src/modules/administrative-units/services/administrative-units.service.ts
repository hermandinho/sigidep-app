import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';
import { CreateAdministrativeUnitDto } from '@modules/administrative-units/dto/create-administrative-unit.dto';
import { PrimaryFunctionsEntity } from '@entities/primary-functions.entity';
import { SecondaryFunctionsEntity } from '@entities/secondary-functions.entity';
import { CreatePrimaryFunctionDto } from '@modules/administrative-units/dto/create-primary-function.dto';
import { CreateSecondaryFunctionDto } from '@modules/administrative-units/dto/create-secondary-function.dto';
import { CategoriesService } from '@modules/administrative-units/services/categories.service';
import { SectorsService } from '@modules/administrative-units/services/sectors.service';
import { AddressesService } from '@modules/addresses/addresses.service';

@Injectable()
export class AdministrativeUnitsService {
  constructor(
    @InjectRepository(AdministrativeUnitEntity)
    private readonly administrativeUnitRepository: Repository<AdministrativeUnitEntity>,

    @InjectRepository(PrimaryFunctionsEntity)
    private readonly primaryFunctionsRepository: Repository<PrimaryFunctionsEntity>,

    @InjectRepository(SecondaryFunctionsEntity)
    private readonly secondaryFunctionsRepository: Repository<SecondaryFunctionsEntity>,

    private readonly categoriesService: CategoriesService,
    private readonly sectorsService: SectorsService,
    private readonly addressesService: AddressesService,
  ) {}

  public async filter(): Promise<AdministrativeUnitEntity[]> {
    return this.administrativeUnitRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.category', 'c')
      .leftJoinAndSelect('f.sector', 's')
      .leftJoinAndSelect('f.function', 'func')
      .leftJoinAndSelect('f.region', 'r')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.administrativeUnitRepository.delete({ id });
  }

  public async create(
    payload: CreateAdministrativeUnitDto,
    user: UserEntity,
  ): Promise<AdministrativeUnitEntity> {
    const check = await this.administrativeUnitRepository.findOne({
      code: payload.code,
    });

    if (check) {
      throw new ConflictException();
    }

    const catRepo = this.categoriesService.getRepository();
    const sectorRepo = this.sectorsService.getRepository();
    const addressesRepo = this.addressesService.getRegionsRepository();

    const category = await catRepo.findOne(payload.categoryId, {
      loadEagerRelations: false,
    });

    if (!category) {
      throw new NotFoundException();
    }

    const sector = await sectorRepo.findOne(payload.sectorId, {
      loadEagerRelations: false,
    });

    if (!sector) {
      throw new NotFoundException();
    }

    const region = await addressesRepo.findOne(payload.regionId, {
      loadEagerRelations: false,
    });

    if (!region) {
      throw new NotFoundException();
    }

    const secondaryFunction = await this.secondaryFunctionsRepository.findOne(
      payload.secondaryFunctionId,
      {
        loadEagerRelations: false,
      },
    );

    if (!region) {
      throw new NotFoundException();
    }

    const entity = await this.administrativeUnitRepository.save({
      ...payload,
      createdBy: user,
      category,
      sector,
      region,
      function: secondaryFunction,
    });

    return this.administrativeUnitRepository
      .createQueryBuilder('a')
      .where('a.id = :id', { id: entity.id })
      .leftJoinAndSelect('a.category', 'category')
      .leftJoinAndSelect('a.region', 'r')
      .leftJoinAndSelect('a.sector', 's')
      .leftJoinAndSelect('a.function', 'f')
      .getOne();
  }

  public async createFunction(
    type: 'primary' | 'secondary',
    payload: CreatePrimaryFunctionDto | CreateSecondaryFunctionDto,
    user: UserEntity,
  ): Promise<PrimaryFunctionsEntity | SecondaryFunctionsEntity> {
    let check: PrimaryFunctionsEntity | SecondaryFunctionsEntity;
    let parent: PrimaryFunctionsEntity;

    if (type === 'primary') {
      check = await this.primaryFunctionsRepository.findOne(
        {
          code: payload.code,
        },
        { loadEagerRelations: false },
      );
    } else if (type) {
      check = await this.secondaryFunctionsRepository.findOne(
        {
          code: payload.code,
        },
        { loadEagerRelations: false },
      );

      parent = await this.primaryFunctionsRepository.findOne({
        id: (payload as CreateSecondaryFunctionDto).parentId,
      });
    }

    if (check) {
      throw new ConflictException();
    }

    if (type === 'secondary' && !parent) {
      throw new NotFoundException();
    }

    return type === 'primary'
      ? this.primaryFunctionsRepository.save({
          ...(payload as CreatePrimaryFunctionDto),
          createdBy: user,
        })
      : this.secondaryFunctionsRepository.save({
          ...payload,
          parent,
          createdBy: user,
        });
  }

  public async filterFunctions(
    type: 'primary' | 'secondary',
  ): Promise<PrimaryFunctionsEntity[] | SecondaryFunctionsEntity[]> {
    if (type === 'primary')
      return this.primaryFunctionsRepository
        .createQueryBuilder('f')
        .leftJoinAndSelect('f.children', 'c')
        .getMany();
    else
      return this.secondaryFunctionsRepository
        .createQueryBuilder('f')
        .getMany();
  }
}
