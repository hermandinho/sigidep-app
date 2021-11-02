import { UserEntity } from '@entities/user.entity';
import { RoleEntity } from '@entities/role.entity';
import { PermissionEntity } from '@entities/permission.entity';
import { PermissionContextsEnum } from '@utils/constants';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { CategoriesEntity } from '@entities/categories.entity';
import { RegionEntity } from '@entities/region.entity';
import { SectorEntity } from '@entities/sector.entity';

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
  ...simpleCrudGenerator(C.ADMINISTRATIVE_UNITS),
  ...simpleCrudGenerator(C.FUNCTIONS),
];

export const FINANCIAL_SOURCES_DATA: Partial<FinancialSourceEntity>[] = [
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

export const CATEGORIES_DATA: Partial<CategoriesEntity>[] = [
  { code: '22', label: 'Cabinet' },
  { code: '28', label: 'Dépenses communes du Cabinet' },
  { code: '32', label: 'Secretariat Général' },
  { code: '33', label: 'Directiond Techniques' },
  { code: '34', label: 'Directions des Moyens' },
  { code: '39', label: 'Dépenses Communes' },
  { code: '44', label: 'Délégations Régionales' },
  { code: '45', label: 'Délégations Régionales' },
  { code: '45', label: 'Délégations Déparmentales' },
  { code: '78', label: 'FINEX' },
];

export const REGIONS_DATA: Partial<RegionEntity>[] = [
  { code: '00', label: 'Administration Centrale' },
  { code: '10', label: 'Adamaoua' },
  { code: '11', label: 'Centre' },
  { code: '12', label: 'Est' },
  { code: '13', label: 'Extême-Nord' },
  { code: '14', label: 'Littotal' },
  { code: '15', label: 'Nord' },
  { code: '16', label: 'Nord-Ouest' },
  { code: '17', label: 'Ouest' },
  { code: '18', label: 'Sud' },
  { code: '19', label: 'Sud-Ouest' },
];

// Secteur 1 : SOUVERAINETE
// Secteur 2 : DEFENSE ET SECURITE
// Secteur 3 : ADMINISTRATION GENERALE ET FINANCIERE
// Secteur 4 : ENSEIGNEMENT, FORMATION ET RECHERCHE
// Secteur 5 : COMMUNICATION, CULTURE, SPORTS ET LOISIRS
// Secteur 6 : SANTE
// Secteur 7 : AFFAIRES SOCIALES
// Secteur 8 : INFRASTRUCTURES
// Secteur 9 : PRODUCTION ET COMMERCE
// Secteur 0 : ACTIVITES NON REPARTIES PAR FONCTIONS
export const SECTORS_DATA: Partial<SectorEntity>[] = [
  {
    code: '0',
    labelFr: 'ACTIVITÉS NON RÉPARTIES PAR FONCTIONS',
    labelEn: 'ACTIVITIES NOT DISTRIBUTED BY FUNCTIONS',
  },
  { code: '1', labelFr: 'SOUVERAINETÉ', labelEn: 'SOVEREIGNTY' },
  {
    code: '2',
    labelFr: 'DÉFENSE ET SÉCURITÉ',
    labelEn: 'DEFENSE AND SECURITY',
  },
  {
    code: '3',
    labelFr: 'ADMINISTRATION GÉNÉRALE ET FINANCIÈRE',
    labelEn: 'GENERAL AND FINANCIAL ADMINISTRATION',
  },
  {
    code: '4',
    labelFr: 'ENSEIGNEMENT, FORMATION ET RECHERCHE',
    labelEn: 'TEACHING, TRAINING AND RESEARCH',
  },
  {
    code: '5',
    labelFr: 'COMMUNICATION, CULTURE, SPORTS ET LOISIRS',
    labelEn: 'COMMUNICATION, CULTURE, SPORTS AND LEISURE',
  },
  { code: '6', labelFr: 'SANTÉ', labelEn: 'HEALTH' },
  { code: '7', labelFr: 'AFFAIRES SOCIALES', labelEn: 'SOCIAL AFFAIRS' },
  { code: '8', labelFr: 'INFRASTRUCTURES', labelEn: 'INFRASTRUCTURE' },
  {
    code: '9',
    labelFr: 'PRODUCTION ET COMMERCE',
    labelEn: 'PRODUCTION AND TRADE',
  },
];
