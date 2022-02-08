import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/role.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import {
  PROCEDURESTYPES_DATA,
  CATEGORIES_AGENTS_DATA,
  CATEGORIES_DATA,
  CONTRIBUABLES_DATA,
  FINANCIAL_SOURCES_DATA,
  GRADES_DATA,
  PERMISSIONS_DATA,
  REGIMES_DATA,
  REGIONS_DATA,
  ROOT_ROLE,
  ROOT_USER,
  SECTORS_DATA,
} from '@modules/seeder/data';
import { PermissionEntity } from '@entities/permission.entity';
import { RolePermissionEntity } from '@entities/role-permission.entity';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { CategoriesEntity } from '@entities/categories.entity';
import { RegionEntity } from '@entities/region.entity';
import { SectorEntity } from '@entities/sector.entity';
import { PrimaryFunctionsEntity } from '@entities/primary-functions.entity';
import { SecondaryFunctionsEntity } from '@entities/secondary-functions.entity';
import { ContribuableEntity } from '@entities/contribuable.entity';
import { RegimeFiscalEntity } from '@entities/regime-fiscal.entity';
import { CategorieAgentEntity } from '@entities/categorie-agent.entity';
import { GradeEntity } from '@entities/grade.entity';
import { TypeProcedureEntity } from '@entities/type-procedure.entity';


@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionsRepository: Repository<RolePermissionEntity>,
    @InjectRepository(FinancialSourceEntity)
    private readonly financialSourcesRepository: Repository<FinancialSourceEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionsRepository: Repository<RegionEntity>,
    @InjectRepository(SectorEntity)
    private readonly sectorsRepository: Repository<SectorEntity>,
    @InjectRepository(PrimaryFunctionsEntity)
    private readonly primaryFunctionsRepository: Repository<PrimaryFunctionsEntity>,
    @InjectRepository(SecondaryFunctionsEntity)
    private readonly secondaryFunctionsRepository: Repository<SecondaryFunctionsEntity>,
    @InjectRepository(ContribuableEntity)
    private readonly contribuableRepository: Repository<ContribuableEntity>,
    @InjectRepository(RegimeFiscalEntity)
    private readonly regimeFiscalRepository: Repository<RegimeFiscalEntity>,

    @InjectRepository(CategorieAgentEntity)
    private readonly categoriesAgentsRepository: Repository<CategorieAgentEntity>,
    
    @InjectRepository(GradeEntity)
    private readonly gradesRepository: Repository<GradeEntity>,

    @InjectRepository(TypeProcedureEntity)
    private readonly proceduretypesRepository: Repository<TypeProcedureEntity>,
  ) {}

  private async _initRoot(): Promise<{ role: RoleEntity; user: UserEntity }> {
    let role = await this.rolesRepository.findOne(
      {
        label: ROOT_ROLE.label,
      },
      { loadEagerRelations: false },
    );

    if (!role) {
      this.logger.warn('Setting up root role ....');
      role = await this.rolesRepository.save(ROOT_ROLE);
    }

    const rootUser = await this.usersRepository.findOne(
      {
        role,
      },
      {
        loadEagerRelations: false,
      },
    );

    if (!rootUser) {
      this.logger.warn('Setting up root user ....');
      const user = new UserEntity();
      Object.assign(user, ROOT_USER);
      user.password = await user.hashPassword();
      user.role = role;

      await this.usersRepository.save(user);
    }
    return { user: rootUser, role };
  }

  private async _initPermissions(role: RoleEntity) {
    const permissions = await this.permissionsRepository
      .createQueryBuilder('p')
      .getMany();

    const existingPermissions = permissions.map((p) => p.label);

    const keys = PERMISSIONS_DATA.map((p) => p.label);

    const newPermissions = keys
      .filter((p) => !existingPermissions.includes(p))
      .map((p) => PERMISSIONS_DATA.find((item) => item.label === p));

    const rootPermissions: RolePermissionEntity[] = [];
    let count = 0;
    if (newPermissions?.length) {
      for (const p of newPermissions) {
        const permission = await this.permissionsRepository.save(p);
        rootPermissions.push(
          new RolePermissionEntity({
            role,
            permission,
          }),
        );
        count += 1;
      }
    }

    if (rootPermissions?.length) {
      await this.rolePermissionsRepository.insert(rootPermissions);
    }

    this.logger.warn(
      `${count} new permissions created and assigned to root user`,
    );
  }

  private async _initFinancialSources(): Promise<void> {
    let count = 0;

    for (const source of FINANCIAL_SOURCES_DATA) {
      const check = await this.financialSourcesRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.financialSourcesRepository.save(source);
        count += 1;
      }
    }

    this.logger.warn(`Synced ${count} financial sources`);
  }

  private async _initCategories(): Promise<void> {
    let count = 0;
    for (const cat of CATEGORIES_DATA) {
      const exists = await this.categoriesRepository.findOne(
        { code: cat.code },
        { loadEagerRelations: false },
      );
      if (!exists) {
        await this.categoriesRepository.save(
          new CategoriesEntity({
            ...cat,
          }),
        );
        count += 1;
      }
    }
    this.logger.warn(`Synced ${count} categories`);
  }

  private async _initLocations(): Promise<void> {
    let regionsCount = 0;
    for (const item of REGIONS_DATA) {
      const exists = await this.regionsRepository.findOne(
        { code: item.code },
        { loadEagerRelations: false },
      );
      if (!exists) {
        await this.regionsRepository.save(
          new RegionEntity({
            ...item,
          }),
        );
        regionsCount += 1;
      }
    }
    this.logger.warn(`Synced ${regionsCount} regions.`);
  }

  private async _initSectors(): Promise<void> {
    let sectorsCount = 0;
    let pFunctionsCount = 0;
    let sFunctionsCount = 0;
    for (const item of SECTORS_DATA) {
      let sector = await this.sectorsRepository.findOne(
        { code: item.code },
        { loadEagerRelations: false },
      );
      if (!sector) {
        sector = await this.sectorsRepository.save(
          new SectorEntity({
            ...item,
          }),
        );
        sectorsCount += 1;
      }

      if (item.functions?.length) {
        for (const pFunc of item.functions) {
          let pFuncton = await this.primaryFunctionsRepository.findOne(
            { code: pFunc.code },
            { loadEagerRelations: false },
          );
          if (!pFuncton) {
            pFuncton = await this.primaryFunctionsRepository.save(
              new PrimaryFunctionsEntity({
                code: pFunc.code,
                labelFr: pFunc.labelFr,
                labelEn: pFunc.labelEn,
                sector,
              }),
            );
            pFunctionsCount += 1;
          }

          // Handle Secondary functions
          if (pFunc.children?.length) {
            try {
              const existingCodes = (
                await this.secondaryFunctionsRepository.find({
                  loadEagerRelations: false,
                })
              )?.map((i) => i.code);
              const bulk = await this.secondaryFunctionsRepository.insert(
                pFunc.children
                  .filter((item) => !existingCodes.includes(item.code))
                  .map((sFunc) => {
                    return new SecondaryFunctionsEntity({
                      ...sFunc,
                      parent: pFuncton,
                    });
                  }),
              );
              sFunctionsCount += bulk.generatedMaps?.length;
            } catch (e) {
              console.log('OUpps');
              console.log(e);
            }
          }
        }
      }
    }
    this.logger.warn(`Synced ${sectorsCount} sectors.`);
    this.logger.warn(`Synced ${pFunctionsCount} primary functions.`);
    this.logger.warn(`Synced ${sFunctionsCount} secondary functions.`);
  }

  private async _initContribuables(): Promise<void> {
    let count = 0;

    for (const source of CONTRIBUABLES_DATA) {
      const check = await this.contribuableRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.contribuableRepository.save(source);
        count += 1;
      }
    }

    this.logger.warn(`Synced ${count} contribubales`);
  }

  private async _initRegimesFiscaux(): Promise<void> {
    let count = 0;

    for (const source of REGIMES_DATA) {
      const check = await this.regimeFiscalRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.regimeFiscalRepository.save(source);
        count += 1;
      }
    }

    this.logger.warn(`Synced ${count} regimes fiscaux`);
  }

  private async _initCategoriesAgents(): Promise<void> {
    let count = 0;

    for (const source of CATEGORIES_AGENTS_DATA) {
      const check = await this.categoriesAgentsRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.categoriesAgentsRepository.save(source);
        count += 1;
      }
    }
    this.logger.warn(`Synced ${count} catégories agents`);
  }

  private async _initGrades(): Promise<void> {
    let count = 0;

    for (const source of GRADES_DATA) {
      const check = await this.gradesRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.gradesRepository.save(source);
        count += 1;
      }
    }

    this.logger.warn(`Synced ${count} grades`);
  }

  private async _initProcedureTypes(): Promise<void> {
    let count = 0;

    for (const source of PROCEDURESTYPES_DATA) {
      const check = await this.proceduretypesRepository.findOne(source, {
        loadEagerRelations: false,
      });
      if (!check) {
        await this.proceduretypesRepository.save(source);
        count += 1;
      }
    }

    this.logger.warn(`Synced ${count} grades`);
  }

  
  async onModuleInit(): Promise<any> {
    const { role } = await this._initRoot();
    this._initPermissions(role);
    this._initFinancialSources();
    this._initCategories();
    this._initLocations();
    this._initSectors();
    this._initRegimesFiscaux();
    this._initCategoriesAgents();
    this._initGrades();
    this._initProcedureTypes();
  }
}
