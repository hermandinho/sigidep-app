import { UserEntity } from '@entities/user.entity';
import { RoleEntity } from '@entities/role.entity';
import { PermissionEntity } from '@entities/permission.entity';
import { PermissionContextsEnum } from '@utils/constants';
import { FinancialSourceEntity } from '@entities/financial-source.entity';

export const ROOT_ROLE: Partial<RoleEntity> = {
  label: 'Root',
  description:
    "Ceci est le rôle du super admin du Système. Il ne sera jamais visible sur l'interface.", // TODO do we really need descriptions for roles? If yes how to i18n them?
};

export const ROOT_USER: Partial<UserEntity> = {
  username: 'super_root',
  password: '!@?-^-+=!_change_me',
  firstName: 'Super',
  lastName: 'Administrateur',
};

const C = PermissionContextsEnum;

const simpleCrudGenerator = (
  context: PermissionContextsEnum,
  skip: string[] = [],
): Partial<PermissionEntity>[] => {
  return ['create', 'read', 'update', 'delete']
    .filter((o) => !skip.includes(o))
    .map((op) => ({
      context,
      label: `${context}.${op}`,
      description: `${context}.${op}`,
    }));
};

export const PERMISSIONS_DATA: Partial<PermissionEntity>[] = [
  ...simpleCrudGenerator(C.USERS),
  ...simpleCrudGenerator(C.EXERCISE),
  {
    context: C.EXERCISE,
    label: 'exercises.lookBack',
    description: 'exercises.lookBack',
  }, // User can view old exercises?
  ...simpleCrudGenerator(C.PROGRAMS),
  ...simpleCrudGenerator(C.ACTIVITIES),
  ...simpleCrudGenerator(C.FINANCIAL_SOURCES),
  ...simpleCrudGenerator(C.TECHNICAL_SUPERVISION),
  ...simpleCrudGenerator(C.ADDRESSES),
  ...simpleCrudGenerator(C.PARAGRAPHS),
  ...simpleCrudGenerator(C.STRUCTURE, ['create', 'read', 'delete']),
  ...simpleCrudGenerator(C.ROLES),
  {
    context: C.ROLES,
    label: 'permissions.manage',
    description: 'permissions.manage',
  },
];

export const FINANCIAL_SOURCES_DATE: Partial<FinancialSourceEntity>[] = [
  {
    code: '01',
    labelFr: 'Budget de Fonctionnement',
    labelEn: 'Operating budget',
    abbreviationFr: 'BF',
    abbreviationEn: 'OB',
    acceptsDeliverables: false,
  },
  {
    code: '02',
    labelFr: "Budget d'investissement Public",
    labelEn: 'Public investment budget',
    abbreviationFr: 'BIP',
    abbreviationEn: 'PIB',
    acceptsDeliverables: true,
  },
  {
    code: '03',
    labelFr: 'Financement Extérieur',
    labelEn: 'External financing',
    abbreviationFr: 'FINEX',
    abbreviationEn: 'FINEX',
    acceptsDeliverables: false,
  },
];
