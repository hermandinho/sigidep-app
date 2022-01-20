import { UserEntity } from '@entities/user.entity';
import { RoleEntity } from '@entities/role.entity';
import { PermissionEntity } from '@entities/permission.entity';
import { PermissionContextsEnum } from '@utils/constants';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { CategoriesEntity } from '@entities/categories.entity';
import { RegionEntity } from '@entities/region.entity';
import { SectorEntity } from '@entities/sector.entity';
import { ContribuableEntity } from '@entities/contribuable.entity';
import { RegimeFiscalEntity } from '@entities/regime-fiscal.entity';
import { CategorieAgentEntity } from '@entities/categorie-agent.entity';
import { GradeEntity } from '@entities/grade.entity';
import { AgentEntity } from '@entities/Agent.entity';
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
  ...simpleCrudGenerator(C.SUB_PROGRAMS),
  ...simpleCrudGenerator(C.CONTRIBUABLES),
  ...simpleCrudGenerator(C.REGIMES),
  ...simpleCrudGenerator(C.AGENTS),
  {
    context: C.ROLES,
    label: 'permissions.manage',
    description: 'permissions.manage',
  },
  ...simpleCrudGenerator(C.ADMINISTRATIVE_UNITS),
  ...simpleCrudGenerator(C.REFERENCE_PHYSICAL_UNITS),
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
  {
    code: '21',
    label: 'Secrétariats Particuliers des Cabinets des grandes institutions',
  },
  { code: '22', label: 'Secrétariats Particuliers des Cabinets ministériels' },
  { code: '23', label: 'Inspections Générales' },
  { code: '24', label: 'Conseillers des Cabinets' },
  {
    code: '25',
    label: 'Commissions, Conseils ou Comités rattachés aux Cabinets',
  },
  {
    code: '26',
    label: 'Activités et Services techniques rattachés aux cabinets',
  },
  {
    code: '27',
    label: 'Activités et Services techniques rattachés aux cabinets',
  },
  {
    code: '28',
    label: 'Activités et Services techniques rattachés aux cabinets',
  },
  { code: '29', label: 'Dépenses non réparties des Cabinets' },
  {
    code: '31',
    label: "Services d'Administration Générale des Grandes Institutions",
  },
  {
    code: '32',
    label: 'Secrétariats Généraux, Divisions et cellules rattachées',
  },
  { code: '33', label: 'Directions centrales techniques, les états-majors' },
  { code: '34', label: 'Directions et divisions centrales de moyens' },
  {
    code: '35',
    label: 'Commissions, conseils, comités rattachés au Secrétariat Général',
  },
  {
    code: '36',
    label: 'Activités et services rattachés aux Directions Techniques',
  },
  {
    code: '37',
    label: 'Activités et services rattachés aux Directions Techniques',
  },
  {
    code: '38',
    label: 'Activités et services rattachés aux Directions Techniques',
  },
  { code: '39', label: "Dépenses non réparties de l'administration centrale" },
  {
    code: '41',
    label:
      "Ambassades et autres représentations au niveau d'un pays ou d'une organisation internationale",
  },
  {
    code: '42',
    label:
      "Représentations de grandes institutions au niveau provincial : gouvernorats, cours d'appel, tribunaux de grande instance",
  },
  { code: '43', label: "Préfectures, les tribunaux d'instance, les consulats" },
  {
    code: '44',
    label: 'Représentations régionales des ministères et services rattachés',
  },
  { code: '45', label: 'Représentations départementales des ministères' },
  {
    code: '46',
    label:
      "Autres représentations en province ou à l'étranger : districts de santé ou autres",
  },
  {
    code: '47',
    label: "Sous-préfectures et les services d'arrondissement des ministères",
  },
  {
    code: '48',
    label:
      'Services districts et les autres services administratifs en province',
  },
  { code: '49', label: 'Dépenses non réparties en province' },
  { code: '51', label: 'Unités Administratives opérationnelles' },
  { code: '52', label: 'Unités Administratives opérationnelles' },
  { code: '53', label: 'Unités Administratives opérationnelles' },
  { code: '54', label: 'Unités Administratives opérationnelles' },
  { code: '55', label: 'Unités Administratives opérationnelles' },
  { code: '56', label: 'Unités Administratives opérationnelles' },
  { code: '57', label: 'Unités Administratives opérationnelles' },
  { code: '58', label: 'Unités Administratives opérationnelles' },
  { code: '59', label: 'Unités Administratives opérationnelles' },
  { code: '61', label: "Agences d'exécution de Projets plurisectoriels" },
  { code: '62', label: "Agences d'exécutions de projets intégrés" },
  {
    code: '63',
    label: "Agences d'exécutions de projets d'organisation ou de recherche",
  },
  { code: '64', label: "Agences d'exécution de projets d'infrastructure" },
  {
    code: '65',
    label:
      "Agences d'exécution de projets de construction ou de réhabilitation",
  },
  {
    code: '66',
    label: "Agences d'exécution de projets de rénovation et d'équipement",
  },
  {
    code: '67',
    label: "Agences d'exécution de projets de formation et d'encadrement",
  },
  { code: '68', label: "Autres agences d'exécution" },
  { code: '71', label: 'Les fonds spéciaux' },
  { code: '72', label: 'Les budgets annexes' },
  { code: '73', label: 'Les Etablissements Publics Administratifs (EPA)' },
  { code: '75', label: 'Sociétés à capital public' },
  { code: '76', label: "Sociétés d'économie mixte" },
  { code: '77', label: 'Collectivités locales' },
  { code: '79', label: 'Autres organismes nationaux' },
];

export const REGIONS_DATA: Partial<RegionEntity>[] = [
  {
    code: '00',
    labelFr: 'Administration Centrale',
    labelEn: 'Central Administration',
  },
  {
    code: '10',
    labelFr: 'Adamaoua',
    labelEn: 'Adamawa',
    departments: [
      {
        code: '10.01',
        labelFr: 'Djerem',
        labelEn: 'Djerem',
        arrondissements: [
          {
            code: '10.01.01',
            labelFr: 'Ngaoundal',
            labelEn: 'Ngaoundal',
            chiefTown: 'Ngaoundal',
          },
          {
            code: '10.01.02',
            labelFr: 'Tibati',
            labelEn: 'Tibati',
            chiefTown: 'Tibati',
          },
        ],
      },
      {
        code: '10.02',
        labelFr: 'Faro et Déo',
        labelEn: 'Faro and Deo',
        arrondissements: [
          {
            code: '10.02.01',
            labelFr: 'Mayo-Baléo',
            labelEn: 'Mayo-Baleo',
            chiefTown: 'Mayo-Baleo',
          },
          {
            code: '10.02.02',
            labelFr: 'Tignère',
            labelEn: 'Tignere',
            chiefTown: 'Tignere',
          },
          {
            code: '10.02.03',
            labelFr: 'Galim-Tignère',
            labelEn: 'Galim-Tignere',
            chiefTown: 'Galim-Tignere',
          },
          {
            code: '10.02.04',
            labelFr: 'Kontcha',
            labelEn: 'Kontcha',
            chiefTown: 'Kontcha',
          },
        ],
      },
      {
        code: '10.03',
        labelFr: 'Mayo-Banyo',
        labelEn: 'Mayo-Banyo',
        arrondissements: [
          {
            code: '10.03.01',
            labelFr: 'Banyo',
            labelEn: 'Banyo',
            chiefTown: 'Banyo',
          },
          {
            code: '10.03.02',
            labelFr: 'Bankim',
            labelEn: 'Bankim',
            chiefTown: 'Bankim',
          },
          {
            code: '10.03.03',
            labelFr: 'Mayo-Darlé',
            labelEn: 'Mayo-Darle',
            chiefTown: 'Mayo-Darle',
          },
        ],
      },
      {
        code: '10.04',
        labelFr: 'Mbéré',
        labelEn: 'Mbere',
        arrondissements: [
          {
            code: '10.04.01',
            labelFr: 'Meiganga',
            labelEn: 'Meiganga',
            chiefTown: 'Meiganga',
          },
          {
            code: '10.04.02',
            labelFr: 'Dir',
            labelEn: 'Dir',
            chiefTown: 'Dir',
          },
          {
            code: '10.04.03',
            labelFr: 'Djohong',
            labelEn: 'Djohong',
            chiefTown: 'Djohong',
          },
          {
            code: '10.04.04',
            labelFr: 'Ngaoui',
            labelEn: 'Ngaoui',
            chiefTown: 'Ngaoui',
          },
        ],
      },
      {
        code: '10.05',
        labelFr: 'Vina',
        labelEn: 'Vina',
        arrondissements: [
          {
            code: '10.05.01',
            labelFr: 'Ngaoundéré 1er',
            labelEn: 'Ngaoundere 1st',
            chiefTown: 'Mbideng',
          },
          {
            code: '10.05.02',
            labelFr: 'Ngaoundéré 2ème',
            labelEn: 'Ngaoundere 2nd',
            chiefTown: 'Mabanga',
          },
          {
            code: '10.05.03',
            labelFr: 'Ngaoundéré 3ème',
            labelEn: 'Ngaoundere 3rd',
            chiefTown: 'Dang',
          },
          {
            code: '10.05.04',
            labelFr: 'Nganha',
            labelEn: 'Nganha',
            chiefTown: 'Nganha',
          },
          {
            code: '10.05.05',
            labelFr: 'Nyambaka',
            labelEn: 'Nyambaka',
            chiefTown: 'Nyambaka',
          },
          {
            code: '10.05.06',
            labelFr: 'Martap',
            labelEn: 'Martap',
            chiefTown: 'Martap',
          },
          {
            code: '10.05.07',
            labelFr: 'Belel',
            labelEn: 'Belel',
            chiefTown: 'Belel',
          },
          {
            code: '10.05.08',
            labelFr: 'Mbé',
            labelEn: 'Mbé',
            chiefTown: 'Mbé',
          },
        ],
      },
    ],
  },
  {
    code: '11',
    labelFr: 'Centre',
    labelEn: 'Centre',
    departments: [
      {
        code: '11.01',
        labelFr: 'Haute-Sanaga',
        labelEn: 'Upper Sanaga',
        arrondissements: [
          {
            code: '11.01.01',
            labelFr: 'Mbandjock',
            labelEn: 'Mbandjock',
            chiefTown: 'Mbandjock',
          },
          {
            code: '11.01.02',
            labelFr: 'Minta',
            labelEn: 'Minta',
            chiefTown: 'Minta',
          },
          {
            code: '11.01.03',
            labelFr: 'Nanga-Eboko',
            labelEn: 'Nanga-Eboko',
            chiefTown: 'Nanga-Eboko',
          },
          {
            code: '11.01.04',
            labelFr: 'Nkoteng',
            labelEn: 'Nkoteng',
            chiefTown: 'Nkoteng',
          },
          {
            code: '11.01.05',
            labelFr: 'Bibey',
            labelEn: 'Bibey',
            chiefTown: 'Bibey',
          },
          {
            code: '11.01.06',
            labelFr: 'Nsem',
            labelEn: 'Nsem',
            chiefTown: 'Nsem',
          },
          {
            code: '11.01.07',
            labelFr: 'Lembe-Yézoum',
            labelEn: 'Lembe-Yezoum',
            chiefTown: 'Lembe-Yézoum',
          },
        ],
      },
      {
        code: '11.02',
        labelFr: 'Lékié',
        labelEn: 'Lekie',
        arrondissements: [
          {
            code: '11.02.01',
            labelFr: 'Evodoula',
            labelEn: 'Evodoula',
            chiefTown: 'Evodoula',
          },
          {
            code: '11.02.02',
            labelFr: 'Monatélé',
            labelEn: 'Monatele',
            chiefTown: 'Monatélé',
          },
          {
            code: '11.02.03',
            labelFr: 'Obala',
            labelEn: 'Obala',
            chiefTown: 'Obala',
          },
          {
            code: '11.02.04',
            labelFr: 'Okola',
            labelEn: 'Okola',
            chiefTown: 'Okola',
          },
          {
            code: '11.02.05',
            labelFr: "Sa'a",
            labelEn: "Sa'a",
            chiefTown: "Sa'a",
          },
          {
            code: '11.02.06',
            labelFr: 'Elig-Mfomo',
            labelEn: 'Elig-Mfomo',
            chiefTown: 'Elig-Mfomo',
          },
          {
            code: '11.02.07',
            labelFr: 'Ebebda',
            labelEn: 'Ebebda',
            chiefTown: 'Ebebda',
          },
          {
            code: '11.02.08',
            labelFr: 'Batchenga',
            labelEn: 'Batchenga',
            chiefTown: 'Batchenga',
          },
          {
            code: '11.02.09',
            labelFr: 'Lobo',
            labelEn: 'Lobo',
            chiefTown: 'Lobo',
          },
        ],
      },
      {
        code: '11.03',
        labelFr: 'Mbam et Inoubou',
        labelEn: 'Mbam and Inoubou',
        arrondissements: [
          {
            code: '11.03.01',
            labelFr: 'Bafia',
            labelEn: 'Bafia',
            chiefTown: 'Bafia',
          },
          {
            code: '11.03.02',
            labelFr: 'Bokito',
            labelEn: 'Bokito',
            chiefTown: 'Bokito',
          },
          {
            code: '11.03.03',
            labelFr: 'Deuk',
            labelEn: 'Deuk',
            chiefTown: 'Deuk',
          },
          {
            code: '11.03.04',
            labelFr: 'Kiiki',
            labelEn: 'Kiiki',
            chiefTown: 'Kiiki',
          },
          {
            code: '11.03.05',
            labelFr: 'Kon-Yambetta',
            labelEn: 'Kon-Yambetta',
            chiefTown: 'Kon-Yambetta',
          },
          {
            code: '11.03.06',
            labelFr: 'Ndikinimeki',
            labelEn: 'Ndikinimeki',
            chiefTown: 'Ndikinimeki',
          },
          {
            code: '11.03.07',
            labelFr: 'Ombessa',
            labelEn: 'Ombessa',
            chiefTown: 'Ombessa',
          },
          {
            code: '11.03.08',
            labelFr: 'Makénéné',
            labelEn: 'Makenene',
            chiefTown: 'Makénéné',
          },
          {
            code: '11.03.09',
            labelFr: 'Nitoukou',
            labelEn: 'Nitoukou',
            chiefTown: 'Nitoukou',
          },
        ],
      },
      {
        code: '11.04',
        labelFr: 'Mbam et Kim',
        labelEn: 'Mbam and Kim',
        arrondissements: [
          {
            code: '11.04.01',
            labelFr: 'Ntui',
            labelEn: 'Ntui',
            chiefTown: 'Ntui',
          },
          {
            code: '11.04.02',
            labelFr: 'Ngambé-Tikar',
            labelEn: 'Ngambe-Tikar',
            chiefTown: 'Ngambé-Tikar',
          },
          {
            code: '11.04.03',
            labelFr: 'Ngoro',
            labelEn: 'Ngoro',
            chiefTown: 'Ngoro',
          },
          {
            code: '11.04.04',
            labelFr: 'Yoko',
            labelEn: 'Yoko',
            chiefTown: 'Yoko',
          },
          {
            code: '11.04.05',
            labelFr: 'Mbangassina',
            labelEn: 'Mbangassina',
            chiefTown: 'Mbangassina',
          },
        ],
      },
      {
        code: '11.05',
        labelFr: 'Mefou et Afamba',
        labelEn: 'Mefou and Afamba',
        arrondissements: [
          {
            code: '11.05.01',
            labelFr: 'Mfou',
            labelEn: 'Mfou',
            chiefTown: 'Mfou',
          },
          {
            code: '11.05.02',
            labelFr: 'Essé',
            labelEn: 'Esse',
            chiefTown: 'Essé',
          },
          {
            code: '11.05.03',
            labelFr: 'Awae',
            labelEn: 'Awae',
            chiefTown: 'Awae',
          },
          {
            code: '11.05.04',
            labelFr: 'Soa',
            labelEn: 'Soa',
            chiefTown: 'Soa',
          },
          {
            code: '11.05.05',
            labelFr: 'Nkolafamba',
            labelEn: 'Nkolafamba',
            chiefTown: 'Nkolafamba',
          },
          {
            code: '11.05.06',
            labelFr: 'Edzendouan',
            labelEn: 'Edzendouan',
            chiefTown: 'Edzendouan',
          },
          {
            code: '11.05.07',
            labelFr: 'Assamba',
            labelEn: 'Assamba',
            chiefTown: 'Assamba',
          },
          {
            code: '11.05.08',
            labelFr: 'Afanloum',
            labelEn: 'Afanloum',
            chiefTown: 'Afanloum',
          },
        ],
      },
      {
        code: '11.06',
        labelFr: 'Mefou et Akono',
        labelEn: 'Mefou and Akono',
        arrondissements: [
          {
            code: '11.06.01',
            labelFr: 'Ngoumou',
            labelEn: 'Ngoumou',
            chiefTown: 'Ngoumou',
          },
          {
            code: '11.06.02',
            labelFr: 'Akono',
            labelEn: 'Akono',
            chiefTown: 'Akono',
          },
          {
            code: '11.06.03',
            labelFr: 'Mbankomo',
            labelEn: 'Mbankomo',
            chiefTown: 'Mbankomo',
          },
          {
            code: '11.06.04',
            labelFr: 'Bikok',
            labelEn: 'Bikok',
            chiefTown: 'Bikok',
          },
        ],
      },
      {
        code: '11.07',
        labelFr: 'Mfoundi',
        labelEn: 'Mfoundi',
        arrondissements: [
          {
            code: '11.07.01',
            labelFr: 'Yaoundé 1er',
            labelEn: 'Yaoundé 1st',
            chiefTown: 'Nlongkak',
          },
          {
            code: '11.07.02',
            labelFr: 'Yaoundé 2ème',
            labelEn: 'Yaoundé 2nd',
            chiefTown: 'Tsinga',
          },
          {
            code: '11.07.03',
            labelFr: 'Yaoundé 3ème',
            labelEn: 'Yaoundé 3rd',
            chiefTown: 'Efoulan',
          },
          {
            code: '11.07.04',
            labelFr: 'Yaoundé 4ème',
            labelEn: 'Yaoundé 4th',
            chiefTown: 'Kondengui',
          },
          {
            code: '11.07.05',
            labelFr: 'Yaoundé 5ème',
            labelEn: 'Yaoundé 5th',
            chiefTown: 'Nkolmesseng',
          },
          {
            code: '11.07.06',
            labelFr: 'Yaoundé 6ème',
            labelEn: 'Yaoundé 6th',
            chiefTown: 'Biyem-Assi',
          },
          {
            code: '11.07.07',
            labelFr: 'Yaoundé 7ème',
            labelEn: 'Yaoundé 7th',
            chiefTown: 'Nkolbisson',
          },
        ],
      },
      {
        code: '11.08',
        labelFr: 'Nyong et Kellé',
        labelEn: 'Nyong and Kelle',
        arrondissements: [
          {
            code: '11.08.01',
            labelFr: 'Bot-Makak',
            labelEn: 'Bot-Makak',
            chiefTown: 'Bot-Makak',
          },
          {
            code: '11.08.02',
            labelFr: 'Eséka',
            labelEn: 'Eseka',
            chiefTown: 'Eséka',
          },
          {
            code: '11.08.03',
            labelFr: 'Makak',
            labelEn: 'Makak',
            chiefTown: 'Makak',
          },
          {
            code: '11.08.04',
            labelFr: 'Messondo',
            labelEn: 'Messondo',
            chiefTown: 'Messondo',
          },
          {
            code: '11.08.05',
            labelFr: 'Ngog-Mapubi',
            labelEn: 'Ngog-Mapubi',
            chiefTown: 'Ngog-Mapubi',
          },
          {
            code: '11.08.06',
            labelFr: 'Matomb',
            labelEn: 'Matomb',
            chiefTown: 'Matomb',
          },
          {
            code: '11.08.07',
            labelFr: 'Dibang',
            labelEn: 'Dibang',
            chiefTown: 'Dibang',
          },
          {
            code: '11.08.08',
            labelFr: 'Biyouha',
            labelEn: 'Biyouha',
            chiefTown: 'Biyouha',
          },
          {
            code: '11.08.09',
            labelFr: 'Ngumbassal',
            labelEn: 'Ngumbassal',
            chiefTown: 'Ngumbassal',
          },
          {
            code: '11.08.10',
            labelFr: 'Bondjock',
            labelEn: 'Bondjock',
            chiefTown: 'Bondjock',
          },
        ],
      },
      {
        code: '11.09',
        labelFr: 'Nyong et Mfoumou',
        labelEn: 'Nyong and Mfoumou',
        arrondissements: [
          {
            code: '11.09.01',
            labelFr: 'Akonolinga',
            labelEn: 'Akonolinga',
            chiefTown: 'Akonolinga',
          },
          {
            code: '11.09.02',
            labelFr: 'Ayos',
            labelEn: 'Ayos',
            chiefTown: 'Ayos',
          },
          {
            code: '11.09.03',
            labelFr: 'Endom',
            labelEn: 'Endom',
            chiefTown: 'Endom',
          },
          {
            code: '11.09.04',
            labelFr: 'Mengang',
            labelEn: 'Mengang',
            chiefTown: 'Mengang',
          },
          {
            code: '11.09.05',
            labelFr: 'Nyakokombo',
            labelEn: 'Nyakokombo',
            chiefTown: 'Nyakokombo',
          },
        ],
      },
      {
        code: '11.10',
        labelFr: "Nyong et So'o",
        labelEn: "Nyong and So'o",
        arrondissements: [
          {
            code: '11.10.01',
            labelFr: 'Dzeng',
            labelEn: 'Dzeng',
            chiefTown: 'Dzeng',
          },
          {
            code: '11.10.02',
            labelFr: 'Mbalmayo',
            labelEn: 'Mbalmayo',
            chiefTown: 'Mbalmayo',
          },
          {
            code: '11.10.03',
            labelFr: 'Ngomedzap',
            labelEn: 'Ngomedzap',
            chiefTown: 'Ngomedzap',
          },
          {
            code: '11.10.04',
            labelFr: 'Akoeman',
            labelEn: 'Akoeman',
            chiefTown: 'Akoeman',
          },
          {
            code: '11.10.05',
            labelFr: 'Menguémé',
            labelEn: 'Mengueme',
            chiefTown: 'Menguémé',
          },
          {
            code: '11.10.06',
            labelFr: 'Nkol-Métet',
            labelEn: 'Nkol-Metet',
            chiefTown: 'Nkol-Métet',
          },
        ],
      },
    ],
  },
  {
    code: '12',
    labelFr: 'Est',
    labelEn: 'East',
    departments: [
      {
        code: '12.01',
        labelFr: 'Boumba et Ngoko',
        labelEn: 'Boumba and Ngoko',
        arrondissements: [
          {
            code: '12.01.01',
            labelFr: 'Moloundou',
            labelEn: 'Moloundou',
            chiefTown: 'Moloundou',
          },
          {
            code: '12.01.02',
            labelFr: 'Yokadouma',
            labelEn: 'Yokadouma',
            chiefTown: 'Yokadouma',
          },
          {
            code: '12.01.03',
            labelFr: 'Gari-Gombo',
            labelEn: 'Gari-Gombo',
            chiefTown: 'Gari-Gombo',
          },
          {
            code: '12.01.04',
            labelFr: 'Salapoumbé',
            labelEn: 'Salapoumbe',
            chiefTown: 'Salapoumbé',
          },
        ],
      },
      {
        code: '12.02',
        labelFr: 'Haut-Nyong',
        labelEn: 'Upper Nyong',
        arrondissements: [
          {
            code: '12.02.01',
            labelFr: 'Abong-Mbang',
            labelEn: 'Abong-Mbang',
            chiefTown: 'Abong-Mbang',
          },
          {
            code: '12.02.02',
            labelFr: 'Doumé',
            labelEn: 'Doume',
            chiefTown: 'Doumé',
          },
          {
            code: '12.02.03',
            labelFr: 'Lomié',
            labelEn: 'Lomie',
            chiefTown: 'Lomié',
          },
          {
            code: '12.02.04',
            labelFr: 'Messamena',
            labelEn: 'Messamena',
            chiefTown: 'Messamena',
          },
          {
            code: '12.02.05',
            labelFr: 'Nguelemendouka',
            labelEn: 'Nguelemendouka',
            chiefTown: 'Nguelemendouka',
          },
          {
            code: '12.02.06',
            labelFr: 'Dimako',
            labelEn: 'Dimako',
            chiefTown: 'Dimako',
          },
          {
            code: '12.02.07',
            labelFr: 'Bebend',
            labelEn: 'Bebend',
            chiefTown: 'Atok',
          },
          {
            code: '12.02.08',
            labelFr: 'Mboanz',
            labelEn: 'Mboanz',
            chiefTown: 'Angossas',
          },
          {
            code: '12.02.09',
            labelFr: 'Dja',
            labelEn: 'Dja',
            chiefTown: 'Mindourou',
          },
          {
            code: '12.02.10',
            labelFr: 'Doumaintang',
            labelEn: 'Doumaintang',
            chiefTown: 'Doumaintang',
          },
          {
            code: '12.02.11',
            labelFr: 'Messok',
            labelEn: 'Messok',
            chiefTown: 'Messok',
          },
          {
            code: '12.02.12',
            labelFr: 'Somalomo',
            labelEn: 'Somalomo',
            chiefTown: 'Somalomo',
          },
          {
            code: '12.02.13',
            labelFr: 'Mboma',
            labelEn: 'Mboma',
            chiefTown: 'Mboma',
          },
          {
            code: '12.02.14',
            labelFr: 'Ngoyla',
            labelEn: 'Ngoyla',
            chiefTown: 'Ngoyla',
          },
        ],
      },
      {
        code: '12.03',
        labelFr: 'Kadey',
        labelEn: 'Kadey',
        arrondissements: [
          {
            code: '12.03.01',
            labelFr: 'Batouri',
            labelEn: 'Batouri',
            chiefTown: 'Batouri',
          },
          {
            code: '12.03.02',
            labelFr: 'Ndélélé',
            labelEn: 'Ndelele',
            chiefTown: 'Ndélélé',
          },
          {
            code: '12.03.03',
            labelFr: 'Ketté',
            labelEn: 'Kette',
            chiefTown: 'Ketté',
          },
          {
            code: '12.03.04',
            labelFr: 'Mbang',
            labelEn: 'Mbang',
            chiefTown: 'Mbang',
          },
          {
            code: '12.03.05',
            labelFr: 'Ndem-Nam',
            labelEn: 'Ndem-Nam',
            chiefTown: 'Nguelebok',
          },
          {
            code: '12.03.06',
            labelFr: 'Bombé',
            labelEn: 'Bombe',
            chiefTown: 'Kentzou',
          },
          {
            code: '12.03.07',
            labelFr: 'Mbotoro',
            labelEn: 'Mbotoro',
            chiefTown: 'Ouli',
          },
        ],
      },
      {
        code: '12.04',
        labelFr: 'Lom et Djerem',
        labelEn: 'Lom and Djerem',
        arrondissements: [
          {
            code: '12.04.01',
            labelFr: 'Bertoua 1er',
            labelEn: 'Bertoua 1st',
            chiefTown: 'Nkolbikon',
          },
          {
            code: '12.04.02',
            labelFr: 'Bertoua 2ème',
            labelEn: 'Bertoua 2nd',
            chiefTown: 'Yadémé',
          },
          {
            code: '12.04.03',
            labelFr: 'Mandjou',
            labelEn: 'Mandjou',
            chiefTown: 'Mandjou',
          },
          {
            code: '12.04.04',
            labelFr: 'Bétaré-Oya',
            labelEn: 'Bétare-Oya',
            chiefTown: 'Bétaré-Oya',
          },
          {
            code: '12.04.05',
            labelFr: 'Bélabo',
            labelEn: 'Belabo',
            chiefTown: 'Bélabo',
          },
          {
            code: '12.04.06',
            labelFr: 'Garoua-Boulaï',
            labelEn: 'Garoua-Boulai',
            chiefTown: 'Garoua-Boulaï',
          },
          {
            code: '12.04.07',
            labelFr: 'Diang',
            labelEn: 'Diang',
            chiefTown: 'Diang',
          },
          {
            code: '12.04.08',
            labelFr: 'Ngoura',
            labelEn: 'Ngoura',
            chiefTown: 'Ngoura',
          },
        ],
      },
    ],
  },
  {
    code: '13',
    labelFr: 'Extrême-Nord',
    labelEn: 'Far North',
    departments: [
      {
        code: '13.01',
        labelFr: 'Diamaré',
        labelEn: 'Diamare',
        arrondissements: [
          {
            code: '13.01.01',
            labelFr: 'Bogo',
            labelEn: 'Bogo',
            chiefTown: 'Bogo',
          },
          {
            code: '13.01.02',
            labelFr: 'Maroua 1er',
            labelEn: 'Maroua 1st',
            chiefTown: 'Domayo',
          },
          {
            code: '13.01.03',
            labelFr: 'Maroua 2ème',
            labelEn: 'Maroua 2nd',
            chiefTown: 'Doualaré',
          },
          {
            code: '13.01.04',
            labelFr: 'Maroua 3ème',
            labelEn: 'Maroua 3rd',
            chiefTown: 'Douggoï',
          },
          {
            code: '13.01.05',
            labelFr: 'Méri',
            labelEn: 'Meri',
            chiefTown: 'Méri',
          },
          {
            code: '13.01.06',
            labelFr: 'Gazawa',
            labelEn: 'Gazawa',
            chiefTown: 'Gazawa',
          },
          {
            code: '13.01.07',
            labelFr: 'Petté',
            labelEn: 'Pette',
            chiefTown: 'Petté',
          },
          {
            code: '13.01.08',
            labelFr: 'Dargala',
            labelEn: 'Dargala',
            chiefTown: 'Gawel',
          },
          {
            code: '13.01.09',
            labelFr: 'Ndoukoula',
            labelEn: 'Ndoukoula',
            chiefTown: 'Ndoukoula',
          },
        ],
      },
      {
        code: '13.02',
        labelFr: 'Mayo-Kani',
        labelEn: 'Mayo-Kani',
        arrondissements: [
          {
            code: '13.02.01',
            labelFr: 'Kaélé',
            labelEn: 'Kaele',
            chiefTown: 'Kaélé',
          },
          {
            code: '13.02.02',
            labelFr: 'Guidiguis',
            labelEn: 'Guidiguis',
            chiefTown: 'Guidiguis',
          },
          {
            code: '13.02.03',
            labelFr: 'Mindif',
            labelEn: 'Mindif',
            chiefTown: 'Mindif',
          },
          {
            code: '13.02.04',
            labelFr: 'Moutourwa',
            labelEn: 'Moutourwa',
            chiefTown: 'Moutourwa',
          },
          {
            code: '13.02.05',
            labelFr: 'Moulvoudaye',
            labelEn: 'Moulvoudaye',
            chiefTown: 'Moulvoudaye',
          },
          {
            code: '13.02.06',
            labelFr: 'Porhi',
            labelEn: 'Porhi',
            chiefTown: 'Touloum',
          },
          {
            code: '13.02.07',
            labelFr: 'Taïbong',
            labelEn: 'Taibong',
            chiefTown: 'Goundayel',
          },
        ],
      },
      {
        code: '13.03',
        labelFr: 'Logone et Chari',
        labelEn: 'Logone and Chari',
        arrondissements: [
          {
            code: '13.03.01',
            labelFr: 'Kousséri',
            labelEn: 'Kousseri',
            chiefTown: 'Kousséri',
          },
          {
            code: '13.03.02',
            labelFr: 'Makari',
            labelEn: 'Makari',
            chiefTown: 'Makari',
          },
          {
            code: '13.03.03',
            labelFr: 'Logone-Birni',
            labelEn: 'Logone-Birni',
            chiefTown: 'Logone-Birni',
          },
          {
            code: '13.03.04',
            labelFr: 'Goulfey',
            labelEn: 'Goulfey',
            chiefTown: 'Goulfey',
          },
          {
            code: '13.03.05',
            labelFr: 'Waza',
            labelEn: 'Waza',
            chiefTown: 'Waza',
          },
          {
            code: '13.03.06',
            labelFr: 'Fotokol',
            labelEn: 'Fotokol',
            chiefTown: 'Fotokol',
          },
          {
            code: '13.03.07',
            labelFr: 'Darak',
            labelEn: 'Darak',
            chiefTown: 'Darak',
          },
          {
            code: '13.03.08',
            labelFr: 'Hilé-Alifa',
            labelEn: 'Hile-Alifa',
            chiefTown: 'Hilé-Alifa',
          },
          {
            code: '13.03.09',
            labelFr: 'Blangoua',
            labelEn: 'Blangoua',
            chiefTown: 'Blangoua',
          },
          {
            code: '13.03.10',
            labelFr: 'Zina',
            labelEn: 'Zina',
            chiefTown: 'Zina',
          },
        ],
      },
      {
        code: '13.04',
        labelFr: 'Mayo-Danay',
        labelEn: 'Mayo-Danay',
        arrondissements: [
          {
            code: '13.04.01',
            labelFr: 'Kar-Hay',
            labelEn: 'Kar-Hay',
            chiefTown: 'Doukoula',
          },
          {
            code: '13.04.02',
            labelFr: 'Yagoua',
            labelEn: 'Yagoua',
            chiefTown: 'Yagoua',
          },
          {
            code: '13.04.03',
            labelFr: 'Guéré',
            labelEn: 'Guere',
            chiefTown: 'Guibi',
          },
          {
            code: '13.04.04',
            labelFr: 'Maga',
            labelEn: 'Maga',
            chiefTown: 'Maga',
          },
          {
            code: '13.04.05',
            labelFr: 'Kalfou',
            labelEn: 'Kalfou',
            chiefTown: 'Kalfou',
          },
          {
            code: '13.04.06',
            labelFr: 'Wina',
            labelEn: 'Wina',
            chiefTown: 'Wina',
          },
          {
            code: '13.04.07',
            labelFr: 'Vélé',
            labelEn: 'Vele',
            chiefTown: 'Guémé',
          },
          {
            code: '13.04.08',
            labelFr: 'Datcheka',
            labelEn: 'Datcheka',
            chiefTown: 'Datcheka',
          },
          {
            code: '13.04.09',
            labelFr: 'Tchatibali',
            labelEn: 'Tchatibali',
            chiefTown: 'Tchatibali',
          },
          {
            code: '13.04.10',
            labelFr: 'Gobo',
            labelEn: 'Gobo',
            chiefTown: 'Gobo',
          },
          {
            code: '13.04.11',
            labelFr: 'Kaï-Kaï',
            labelEn: 'Kai-Kai',
            chiefTown: 'Kaï-Kaï',
          },
        ],
      },
      {
        code: '13.05',
        labelFr: 'Mayo-Sava',
        labelEn: 'Mayo-Sava',
        arrondissements: [
          {
            code: '13.05.01',
            labelFr: 'Mora',
            labelEn: 'Mora',
            chiefTown: 'Mora',
          },
          {
            code: '13.05.02',
            labelFr: 'Tokombéré',
            labelEn: 'Tokombere',
            chiefTown: 'Tokombéré',
          },
          {
            code: '13.05.03',
            labelFr: 'Kolofata',
            labelEn: 'Kolofata',
            chiefTown: 'Kolofata',
          },
        ],
      },
      {
        code: '13.06',
        labelFr: 'Mayo-Tsanaga',
        labelEn: 'Mayo-Tsanaga',
        arrondissements: [
          {
            code: '13.06.01',
            labelFr: 'Mokolo',
            labelEn: 'Mokolo',
            chiefTown: 'Mokolo',
          },
          {
            code: '13.06.02',
            labelFr: 'Bourrha',
            labelEn: 'Bourrha',
            chiefTown: 'Bourrha',
          },
          {
            code: '13.06.03',
            labelFr: 'Koza',
            labelEn: 'Koza',
            chiefTown: 'Koza',
          },
          {
            code: '13.06.04',
            labelFr: 'Hina',
            labelEn: 'Hina',
            chiefTown: 'Hina',
          },
          {
            code: '13.06.05',
            labelFr: 'Mogodé',
            labelEn: 'Mogode',
            chiefTown: 'Mogodé',
          },
          {
            code: '13.06.06',
            labelFr: 'Mayo-Maskota',
            labelEn: 'Mayo-Maskota',
            chiefTown: 'Mozogo',
          },
          {
            code: '13.06.07',
            labelFr: 'Soulédé-Roua',
            labelEn: 'Soulede-Roua',
            chiefTown: 'Soulédé-Roua',
          },
        ],
      },
    ],
  },
  {
    code: '14',
    labelFr: 'Littoral',
    labelEn: 'Littoral',
    departments: [
      {
        code: '14.01',
        labelFr: 'Moungo',
        labelEn: 'Moungo',
        arrondissements: [
          {
            code: '14.01.01',
            labelFr: 'Dibombari',
            labelEn: 'Dibombari',
            chiefTown: 'Dibombari',
          },
          {
            code: '14.01.02',
            labelFr: 'Loum',
            labelEn: 'Loum',
            chiefTown: 'Loum',
          },
          {
            code: '14.01.03',
            labelFr: 'Manjo',
            labelEn: 'Manjo',
            chiefTown: 'Manjo',
          },
          {
            code: '14.01.04',
            labelFr: 'Mbanga',
            labelEn: 'Mbanga',
            chiefTown: 'Mbanga',
          },
          {
            code: '14.01.05',
            labelFr: 'Melong',
            labelEn: 'Melong',
            chiefTown: 'Melong',
          },
          {
            code: '14.01.06',
            labelFr: 'Nkongsamba 1er',
            labelEn: 'Nkongsamba 1st',
            chiefTown: 'Eboum I',
          },
          {
            code: '14.01.07',
            labelFr: 'Nkongsamba 2ème',
            labelEn: 'Nkongsamba 2nd',
            chiefTown: 'Ekangté-Mbeng',
          },
          {
            code: '14.01.08',
            labelFr: 'Nkongsamba 3ème',
            labelEn: 'Nkongsamba 3rd',
            chiefTown: 'Mbaressoumtou',
          },
          {
            code: '14.01.09',
            labelFr: 'Nlonako',
            labelEn: 'Nlonako',
            chiefTown: 'Ebonè',
          },
          {
            code: '14.01.10',
            labelFr: 'Baré-Bakem',
            labelEn: 'Bare-Bakem',
            chiefTown: 'Baré',
          },
          {
            code: '14.01.11',
            labelFr: 'Njombé-Penja',
            labelEn: 'Njombe-Penja',
            chiefTown: 'Penja',
          },
          {
            code: '14.01.12',
            labelFr: 'Fiko',
            labelEn: 'Fiko',
            chiefTown: 'Bonaléa',
          },
          {
            code: '14.01.13',
            labelFr: 'Mombo',
            labelEn: 'Mombo',
            chiefTown: 'Mombo',
          },
        ],
      },
      {
        code: '14.02',
        labelFr: 'Nkam',
        labelEn: 'Nkam',
        arrondissements: [
          {
            code: '14.02.01',
            labelFr: 'Nkondjock',
            labelEn: 'Nkondjock',
            chiefTown: 'Nkondjock',
          },
          {
            code: '14.02.02',
            labelFr: 'Yabassi',
            labelEn: 'Yabassi',
            chiefTown: 'Yabassi',
          },
          {
            code: '14.02.03',
            labelFr: 'Yingui',
            labelEn: 'Yingui',
            chiefTown: 'Yingui',
          },
          {
            code: '14.02.04',
            labelFr: 'Nord-Makombé',
            labelEn: 'North Makombe',
            chiefTown: 'Ndobiang',
          },
        ],
      },
      {
        code: '14.03',
        labelFr: 'Sanaga-Maritime',
        labelEn: 'Sanaga-Maritime',
        arrondissements: [
          {
            code: '14.03.01',
            labelFr: 'Dizanguè',
            labelEn: 'Dizangue',
            chiefTown: 'Dizanguè',
          },
          {
            code: '14.03.02',
            labelFr: 'Edéa 1er',
            labelEn: 'Edea 1st',
            chiefTown: 'Pongo',
          },
          {
            code: '14.03.03',
            labelFr: 'Edéa 2ème',
            labelEn: 'Edea 2nd',
            chiefTown: 'Ekité',
          },
          {
            code: '14.03.04',
            labelFr: 'Dibamba',
            labelEn: 'Dibamba',
            chiefTown: 'Logbadjeck',
          },
          {
            code: '14.03.05',
            labelFr: 'Ngwei',
            labelEn: 'Ngwei',
            chiefTown: 'Makondo',
          },
          {
            code: '14.03.06',
            labelFr: 'Ndom',
            labelEn: 'Ndom',
            chiefTown: 'Ndom',
          },
          {
            code: '14.03.07',
            labelFr: 'Ngambé',
            labelEn: 'Ngambe',
            chiefTown: 'Ngambe',
          },
          {
            code: '14.03.08',
            labelFr: 'Pouma',
            labelEn: 'Pouma',
            chiefTown: 'Pouma',
          },
          {
            code: '14.03.09',
            labelFr: 'Mouanko',
            labelEn: 'Mouanko',
            chiefTown: 'Mouanko',
          },
          {
            code: '14.03.10',
            labelFr: 'Nyanon',
            labelEn: 'Nyanon',
            chiefTown: 'Nyanon',
          },
          {
            code: '14.03.11',
            labelFr: 'Massock-Songloulou',
            labelEn: 'Massock-Songloulou',
            chiefTown: 'Massock',
          },
        ],
      },
      {
        code: '14.04',
        labelFr: 'Wouri',
        labelEn: 'Wouri',
        arrondissements: [
          {
            code: '14.04.01',
            labelFr: 'Douala 1er',
            labelEn: 'Douala 1st',
            chiefTown: 'Bonanjo',
          },
          {
            code: '14.04.02',
            labelFr: 'Douala 2ème',
            labelEn: 'Douala 2nd',
            chiefTown: 'New-Bell',
          },
          {
            code: '14.04.03',
            labelFr: 'Douala 3ème',
            labelEn: 'Douala 3rd',
            chiefTown: 'Bassa',
          },
          {
            code: '14.04.04',
            labelFr: 'Douala 4ème',
            labelEn: 'Douala 4th',
            chiefTown: 'Bonabéri',
          },
          {
            code: '14.04.05',
            labelFr: 'Douala 5ème',
            labelEn: 'Douala 5th',
            chiefTown: 'Kotto',
          },
          {
            code: '14.04.06',
            labelFr: 'Douala 6ème',
            labelEn: 'Douala 6th',
            chiefTown: 'Manoka',
          },
        ],
      },
    ],
  },
  {
    code: '15',
    labelFr: 'Nord',
    labelEn: 'North',
    departments: [
      {
        code: '15.01',
        labelFr: 'Benoué',
        labelEn: 'Benoue',
        arrondissements: [
          {
            code: '15.01.01',
            labelFr: 'Garoua 1er',
            labelEn: 'Garoua 1st',
            chiefTown: 'Plateau',
          },
          {
            code: '15.01.02',
            labelFr: 'Garoua 2ème',
            labelEn: 'Garoua 2nd',
            chiefTown: 'Poumpoumré',
          },
          {
            code: '15.01.03',
            labelFr: 'Garoua 3ème',
            labelEn: 'Garoua 3rd',
            chiefTown: 'Bocklé',
          },
          {
            code: '15.01.04',
            labelFr: 'Mayo-Hourna',
            labelEn: 'Mayo-Hourna',
            chiefTown: 'Bardanké',
          },
          {
            code: '15.01.05',
            labelFr: 'Bibemi',
            labelEn: 'Bibemi',
            chiefTown: 'Bibemi',
          },
          {
            code: '15.01.06',
            labelFr: 'Pitoa',
            labelEn: 'Pitoa',
            chiefTown: 'Pitoa',
          },
          {
            code: '15.01.07',
            labelFr: 'Lagdo',
            labelEn: 'Lagdo',
            chiefTown: 'Lagdo',
          },
          {
            code: '15.01.08',
            labelFr: 'Dembo',
            labelEn: 'Dembo',
            chiefTown: 'Dembo',
          },
          {
            code: '15.01.09',
            labelFr: 'Tcheboa',
            labelEn: 'Tcheboa',
            chiefTown: 'Ngong',
          },
          {
            code: '15.01.10',
            labelFr: 'Basheo',
            labelEn: 'Basheo',
            chiefTown: 'Datcheka',
          },
          {
            code: '15.01.11',
            labelFr: 'Demsa',
            labelEn: 'Demsa',
            chiefTown: 'Gashiga',
          },
          {
            code: '15.01.12',
            labelFr: 'Touroua',
            labelEn: 'Touroua',
            chiefTown: 'Touroua',
          },
        ],
      },
      {
        code: '15.02',
        labelFr: 'Faro',
        labelEn: 'Faro',
        arrondissements: [
          {
            code: '15.02.01',
            labelFr: 'Poli',
            labelEn: 'Poli',
            chiefTown: 'Poli',
          },
          {
            code: '15.02.02',
            labelFr: 'Béka',
            labelEn: 'Beka',
            chiefTown: 'Béka',
          },
        ],
      },
      {
        code: '15.03',
        labelFr: 'Mayo-Louti',
        labelEn: 'Mayo-Louti',
        arrondissements: [
          {
            code: '15.03.01',
            labelFr: 'Guider',
            labelEn: 'Guider',
            chiefTown: 'Guider',
          },
          {
            code: '15.03.02',
            labelFr: 'Mayo-Oulo',
            labelEn: 'Mayo-Oulo',
            chiefTown: 'Mayo-Oulo',
          },
          {
            code: '15.03.03',
            labelFr: 'Figuil',
            labelEn: 'Figuil',
            chiefTown: 'Figuil',
          },
        ],
      },
      {
        code: '15.04',
        labelFr: 'Mayo-Rey',
        labelEn: 'Mayo-Rey',
        arrondissements: [
          {
            code: '15.04.01',
            labelFr: 'Rey-Bouba',
            labelEn: 'Rey-Bouba',
            chiefTown: 'Rey-Bouba',
          },
          {
            code: '15.04.02',
            labelFr: 'Tcholliré',
            labelEn: 'Tchollire',
            chiefTown: 'Tcholliré',
          },
          {
            code: '15.04.03',
            labelFr: 'Touboro',
            labelEn: 'Touboro',
            chiefTown: 'Touboro',
          },
          {
            code: '15.04.04',
            labelFr: 'Madingring',
            labelEn: 'Madingring',
            chiefTown: 'Madingring',
          },
        ],
      },
    ],
  },
  {
    code: '16',
    labelFr: 'Nord-Ouest',
    labelEn: 'Northwest',
    departments: [
      {
        code: '16.01',
        labelFr: 'Donga-Mantung',
        labelEn: 'Donga-Mantung',
        arrondissements: [
          {
            code: '16.01.01',
            labelFr: 'Nkambe',
            labelEn: 'Nkambe',
            chiefTown: 'Nkambe',
          },
          {
            code: '16.01.02',
            labelFr: 'Ndu',
            labelEn: 'Ndu',
            chiefTown: 'Ndu',
          },
          {
            code: '16.01.03',
            labelFr: 'Nwa',
            labelEn: 'Nwa',
            chiefTown: 'Nwa',
          },
          {
            code: '16.01.04',
            labelFr: 'Ako',
            labelEn: 'Ako',
            chiefTown: 'Ako',
          },
          {
            code: '16.01.05',
            labelFr: 'Misaje',
            labelEn: 'Misaje',
            chiefTown: 'Misaje',
          },
        ],
      },
      {
        code: '16.02',
        labelFr: 'Bui',
        labelEn: 'Bui',
        arrondissements: [
          {
            code: '16.02.01',
            labelFr: 'Jakiri',
            labelEn: 'Jakiri',
            chiefTown: 'Jakiri',
          },
          {
            code: '16.02.02',
            labelFr: 'Kumbo',
            labelEn: 'Kumbo',
            chiefTown: 'Kumbo',
          },
          {
            code: '16.02.03',
            labelFr: 'Nkum',
            labelEn: 'Nkum',
            chiefTown: 'Tatum',
          },
          {
            code: '16.02.04',
            labelFr: 'Oku',
            labelEn: 'Oku',
            chiefTown: 'Elak',
          },
          {
            code: '16.02.05',
            labelFr: 'Mbven',
            labelEn: 'Mbven',
            chiefTown: 'Mbiama',
          },
          {
            code: '16.02.06',
            labelFr: 'Noni',
            labelEn: 'Noni',
            chiefTown: 'Nkor',
          },
        ],
      },
      {
        code: '16.03',
        labelFr: 'Menchum',
        labelEn: 'Menchum',
        arrondissements: [
          {
            code: '16.03.07',
            labelFr: 'Wum',
            labelEn: 'Wum',
            chiefTown: 'Wum',
          },
          {
            code: '16.03.08',
            labelFr: 'Menchum-Valley',
            labelEn: 'Menchum-Valley',
            chiefTown: 'Benakuma',
          },
          {
            code: '16.03.09',
            labelFr: 'Furu-Awa',
            labelEn: 'Furu-Awa',
            chiefTown: 'Furu-Awa',
          },
          {
            code: '16.03.10',
            labelFr: 'Fungom',
            labelEn: 'Fungom',
            chiefTown: 'Zhoa',
          },
        ],
      },
      {
        code: '16.04',
        labelFr: 'Boyo',
        labelEn: 'Boyo',
        arrondissements: [
          {
            code: '16.04.01',
            labelFr: 'Fundong',
            labelEn: 'Fundong',
            chiefTown: 'Fundong',
          },
          {
            code: '16.04.02',
            labelFr: 'Belo',
            labelEn: 'Belo',
            chiefTown: 'Belo',
          },
          {
            code: '16.04.03',
            labelFr: 'Bum',
            labelEn: 'Bum',
            chiefTown: 'Fonfuka',
          },
          {
            code: '16.04.04',
            labelFr: 'Njinikom',
            labelEn: 'Njinikom',
            chiefTown: 'Njinikom',
          },
        ],
      },
      {
        code: '16.05',
        labelFr: 'Mezam',
        labelEn: 'Mezam',
        arrondissements: [
          {
            code: '16.05.01',
            labelFr: 'Bamenda 1er',
            labelEn: 'Bamenda 1st',
            chiefTown: 'Bamendankwe',
          },
          {
            code: '16.05.02',
            labelFr: 'Bamenda 2ème',
            labelEn: 'Bamenda 2nd',
            chiefTown: 'Mankon',
          },
          {
            code: '16.05.03',
            labelFr: 'Bamenda 3ème',
            labelEn: 'Bamenda 3rd',
            chiefTown: 'Nkwen',
          },
          {
            code: '16.05.04',
            labelFr: 'Bali',
            labelEn: 'Bali',
            chiefTown: 'Bali',
          },
          {
            code: '16.05.05',
            labelFr: 'Bafut',
            labelEn: 'Bafut',
            chiefTown: 'Bafut',
          },
          {
            code: '16.05.06',
            labelFr: 'Santa',
            labelEn: 'Santa',
            chiefTown: 'Santa',
          },
          {
            code: '16.05.07',
            labelFr: 'Tubah',
            labelEn: 'Tubah',
            chiefTown: 'Tubah',
          },
        ],
      },
      {
        code: '16.06',
        labelFr: 'Ngo-Ketunjia',
        labelEn: 'Ngo-Ketunjia',
        arrondissements: [
          {
            code: '16.06.01',
            labelFr: 'Ndop',
            labelEn: 'Ndop',
            chiefTown: 'Ndop',
          },
          {
            code: '16.06.02',
            labelFr: 'Babessi',
            labelEn: 'Babessi',
            chiefTown: 'Babessi',
          },
          {
            code: '16.06.03',
            labelFr: 'Balikumbat',
            labelEn: 'Balikumbat',
            chiefTown: 'Balikumbat',
          },
        ],
      },
      {
        code: '16.07',
        labelFr: 'Momo',
        labelEn: 'Momo',
        arrondissements: [
          {
            code: '16.07.01',
            labelFr: 'Batibo',
            labelEn: 'Batibo',
            chiefTown: 'Batibo',
          },
          {
            code: '16.07.02',
            labelFr: 'Widikum',
            labelEn: 'Widikum',
            chiefTown: 'Widikum-Boffe',
          },
          {
            code: '16.07.03',
            labelFr: 'Mbengwi',
            labelEn: 'Mbengwi',
            chiefTown: 'Mbengwi',
          },
          {
            code: '16.07.04',
            labelFr: 'Ngie',
            labelEn: 'Ngie',
            chiefTown: 'Andek',
          },
          {
            code: '16.07.05',
            labelFr: 'Njikwa',
            labelEn: 'Njikwa',
            chiefTown: 'Njikwa',
          },
        ],
      },
    ],
  },
  {
    code: '17',
    labelFr: 'Ouest',
    labelEn: 'West',
    departments: [
      {
        code: '17.01',
        labelFr: 'Bamboutos',
        labelEn: 'Bamboutos',
        arrondissements: [
          {
            code: '17.01.01',
            labelFr: 'Mbouda',
            labelEn: 'Mbouda',
            chiefTown: 'Mbouda',
          },
          {
            code: '17.01.02',
            labelFr: 'Galim',
            labelEn: 'Galim',
            chiefTown: 'Galim',
          },
          {
            code: '17.01.03',
            labelFr: 'Batcham',
            labelEn: 'Batcham',
            chiefTown: 'Batcham',
          },
          {
            code: '17.01.04',
            labelFr: 'Babadjou',
            labelEn: 'Babadjou',
            chiefTown: 'Babadjou',
          },
        ],
      },
      {
        code: '17.02',
        labelFr: 'Haut-Nkam',
        labelEn: 'Upper Nkam',
        arrondissements: [
          {
            code: '17.02.01',
            labelFr: 'Bafang',
            labelEn: 'Bafang',
            chiefTown: 'Bafang',
          },
          {
            code: '17.02.02',
            labelFr: 'Banka',
            labelEn: 'Banka',
            chiefTown: 'Banka',
          },
          {
            code: '17.02.03',
            labelFr: 'Bana',
            labelEn: 'Bana',
            chiefTown: 'Bana',
          },
          {
            code: '17.02.04',
            labelFr: 'Bandja',
            labelEn: 'Bandja',
            chiefTown: 'Bandja',
          },
          {
            code: '17.02.05',
            labelFr: 'Kékem',
            labelEn: 'Kekem',
            chiefTown: 'Kékem',
          },
          {
            code: '17.02.06',
            labelFr: 'Bakou',
            labelEn: 'Bakou',
            chiefTown: 'Bakou',
          },
          {
            code: '17.02.07',
            labelFr: 'Banwa',
            labelEn: 'Banwa',
            chiefTown: 'Banwa',
          },
        ],
      },
      {
        code: '17.03',
        labelFr: 'Menoua',
        labelEn: 'Menoua',
        arrondissements: [
          {
            code: '17.03.01',
            labelFr: 'Dschang',
            labelEn: 'Dschang',
            chiefTown: 'Dschang',
          },
          {
            code: '17.03.02',
            labelFr: 'Fongo-Tongo',
            labelEn: 'Fongo-Tongo',
            chiefTown: 'Fongo-Tongo',
          },
          {
            code: '17.03.03',
            labelFr: 'Nkong-Ni',
            labelEn: 'Nkong-Ni',
            chiefTown: 'Nkongzem',
          },
          {
            code: '17.03.04',
            labelFr: 'Penka-Michel',
            labelEn: 'Penka-Michel',
            chiefTown: 'Penka-Michel',
          },
          {
            code: '17.03.05',
            labelFr: 'Santchou',
            labelEn: 'Santchou',
            chiefTown: 'Santchou',
          },
          {
            code: '17.03.06',
            labelFr: 'Fokoué',
            labelEn: 'Fokoue',
            chiefTown: 'Fokoué',
          },
        ],
      },
      {
        code: '17.04',
        labelFr: 'Mifi',
        labelEn: 'Mifi',
        arrondissements: [
          {
            code: '17.04.01',
            labelFr: 'Bafoussam 1er',
            labelEn: 'Bafoussam 1st',
            chiefTown: 'Bafoussam',
          },
          {
            code: '17.04.02',
            labelFr: 'Bafoussam 2ème',
            labelEn: 'Bafoussam 2nd',
            chiefTown: 'Baleng',
          },
          {
            code: '17.04.03',
            labelFr: 'Bafoussam 3ème',
            labelEn: 'Bafoussam 3rd',
            chiefTown: 'Bamoungoum',
          },
        ],
      },
      {
        code: '17.05',
        labelFr: 'Koung-Khi',
        labelEn: 'Koung-Khi',
        arrondissements: [
          {
            code: '17.05.01',
            labelFr: 'Poumougne',
            labelEn: 'Poumougne',
            chiefTown: 'Pété',
          },
          {
            code: '17.05.02',
            labelFr: 'Bayangam',
            labelEn: 'Bayangam',
            chiefTown: 'Bayangam',
          },
          {
            code: '17.05.03',
            labelFr: 'Djembem',
            labelEn: 'Djembem',
            chiefTown: 'Demdeng',
          },
        ],
      },
      {
        code: '17.06',
        labelFr: 'Hauts-Plateaux',
        labelEn: 'Hauts-Plateaux',
        arrondissements: [
          {
            code: '17.06.01',
            labelFr: 'Baham',
            labelEn: 'Baham',
            chiefTown: 'Baham',
          },
          {
            code: '17.06.02',
            labelFr: 'Bamendjou',
            labelEn: 'Bamendjou',
            chiefTown: 'Bamendjou',
          },
          {
            code: '17.06.03',
            labelFr: 'Bangou',
            labelEn: 'Bangou',
            chiefTown: 'Bangou',
          },
          {
            code: '17.06.04',
            labelFr: 'Batié',
            labelEn: 'Batie',
            chiefTown: 'Batié',
          },
        ],
      },
      {
        code: '17.07',
        labelFr: 'Ndé',
        labelEn: 'Ndé',
        arrondissements: [
          {
            code: '17.07.01',
            labelFr: 'Bangangté',
            labelEn: 'Bangangte',
            chiefTown: 'Bangangté',
          },
          {
            code: '17.07.02',
            labelFr: 'Bazou',
            labelEn: 'Bazou',
            chiefTown: 'Bazou',
          },
          {
            code: '17.07.03',
            labelFr: 'Tonga',
            labelEn: 'Tonga',
            chiefTown: 'Tonga',
          },
          {
            code: '17.07.04',
            labelFr: 'Bassamba',
            labelEn: 'Bassamba',
            chiefTown: 'Bassamba',
          },
        ],
      },
      {
        code: '17.08',
        labelFr: 'Noun',
        labelEn: 'Noun',
        arrondissements: [
          {
            code: '17.08.01',
            labelFr: 'Foumban',
            labelEn: 'Foumban',
            chiefTown: 'Foumban',
          },
          {
            code: '17.08.02',
            labelFr: 'Njimon',
            labelEn: 'Njimon',
            chiefTown: 'Njimon',
          },
          {
            code: '17.08.03',
            labelFr: 'Foumbot',
            labelEn: 'Foumbot',
            chiefTown: 'Foumbot',
          },
          {
            code: '17.08.04',
            labelFr: 'Malantouen',
            labelEn: 'Malantouen',
            chiefTown: 'Malantouen',
          },
          {
            code: '17.08.05',
            labelFr: 'Massangam',
            labelEn: 'Massangam',
            chiefTown: 'Massangam',
          },
          {
            code: '17.08.06',
            labelFr: 'Magba',
            labelEn: 'Magba',
            chiefTown: 'Magba',
          },
          {
            code: '17.08.07',
            labelFr: 'Koutaba',
            labelEn: 'Koutaba',
            chiefTown: 'Koutaba',
          },
          {
            code: '17.08.08',
            labelFr: 'Bangourain',
            labelEn: 'Bangourain',
            chiefTown: 'Bangourain',
          },
          {
            code: '17.08.09',
            labelFr: 'Kouoptamo',
            labelEn: 'Kouoptamo',
            chiefTown: 'Kouoptamo',
          },
        ],
      },
    ],
  },
  {
    code: '18',
    labelFr: 'Sud',
    labelEn: 'South',
    departments: [
      {
        code: '18.01',
        labelFr: 'Dja et Lobo',
        labelEn: 'Dja and Lobo',
        arrondissements: [
          {
            code: '18.01.01',
            labelFr: 'Bengbis',
            labelEn: 'Bengbis',
            chiefTown: 'Bengbis',
          },
          {
            code: '18.01.02',
            labelFr: 'Meyomessi',
            labelEn: 'Meyomessi',
            chiefTown: 'Meyomessi',
          },
          {
            code: '18.01.03',
            labelFr: 'Djoum',
            labelEn: 'Djoum',
            chiefTown: 'Djoum',
          },
          {
            code: '18.01.04',
            labelFr: 'Sangmélima',
            labelEn: 'Sangmelima',
            chiefTown: 'Sangmélima',
          },
          {
            code: '18.01.05',
            labelFr: 'Zoétélé',
            labelEn: 'Zoetele',
            chiefTown: 'Zoétélé',
          },
          {
            code: '18.01.06',
            labelFr: 'Meyomessala',
            labelEn: 'Meyomessala',
            chiefTown: 'Meyomessala',
          },
          {
            code: '18.01.07',
            labelFr: 'Mintom',
            labelEn: 'Mintom',
            chiefTown: 'Mintom',
          },
          {
            code: '18.01.08',
            labelFr: 'Oveng',
            labelEn: 'Oveng',
            chiefTown: 'Oveng',
          },
        ],
      },
      {
        code: '18.02',
        labelFr: 'Mvila',
        labelEn: 'Mvila',
        arrondissements: [
          {
            code: '18.02.01',
            labelFr: 'Ebolowa 1er',
            labelEn: 'Ebolowa 1st',
            chiefTown: 'Ebolowa-Si',
          },
          {
            code: '18.02.02',
            labelFr: 'Ebolowa 2ème',
            labelEn: 'Ebolowa 2nd',
            chiefTown: 'Angalé',
          },
          {
            code: '18.02.03',
            labelFr: 'Efoulan',
            labelEn: 'Efoulan',
            chiefTown: 'Efoulan',
          },
          {
            code: '18.02.04',
            labelFr: 'Biwong-Bulu',
            labelEn: 'Biwong-Bulu',
            chiefTown: 'Biwong-Bulu',
          },
          {
            code: '18.02.05',
            labelFr: 'Ngoulemakong',
            labelEn: 'Ngoulemakong',
            chiefTown: 'Ngoulemakong',
          },
          {
            code: '18.02.06',
            labelFr: 'Mvangane',
            labelEn: 'Mvangane',
            chiefTown: 'Mvangane',
          },
          {
            code: '18.02.07',
            labelFr: 'Biwong-Banè',
            labelEn: 'Biwong-Bane',
            chiefTown: 'Biwong-Banè',
          },
          {
            code: '18.02.08',
            labelFr: 'Mengong',
            labelEn: 'Mengong',
            chiefTown: 'Mengong',
          },
        ],
      },
      {
        code: '18.03',
        labelFr: 'Vallée du Ntem',
        labelEn: 'Ntem Valley',
        arrondissements: [
          {
            code: '18.03.01',
            labelFr: 'Ambam',
            labelEn: 'Ambam',
            chiefTown: 'Ambam',
          },
          {
            code: '18.03.02',
            labelFr: "Ma'an",
            labelEn: "Ma'an",
            chiefTown: "Ma'an",
          },
          {
            code: '18.03.03',
            labelFr: 'Olamzé',
            labelEn: 'Olamze',
            chiefTown: 'Olamzé',
          },
          {
            code: '18.03.04',
            labelFr: 'Kyé-Ossi',
            labelEn: 'Kye-Ossi',
            chiefTown: 'Kyé-Ossi',
          },
        ],
      },
      {
        code: '18.04',
        labelFr: 'Océan',
        labelEn: 'Ocean',
        arrondissements: [
          {
            code: '18.04.01',
            labelFr: 'Akom II',
            labelEn: 'Akom II',
            chiefTown: 'Akom II',
          },
          {
            code: '18.04.02',
            labelFr: 'Campo',
            labelEn: 'Campo',
            chiefTown: 'Campo',
          },
          {
            code: '18.04.03',
            labelFr: 'Kribi 1er',
            labelEn: 'Kribi 1st',
            chiefTown: 'Massaka',
          },
          {
            code: '18.04.04',
            labelFr: 'Kribi 2ème',
            labelEn: 'Kribi 2nd',
            chiefTown: 'Dombé',
          },
          {
            code: '18.04.05',
            labelFr: 'Lokoundje',
            labelEn: 'Lokoundje',
            chiefTown: 'Fifinda',
          },
          {
            code: '18.04.06',
            labelFr: 'Lolodorf',
            labelEn: 'Lolodorf',
            chiefTown: 'Lolodorf',
          },
          {
            code: '18.04.07',
            labelFr: 'Mvengue',
            labelEn: 'Mvengue',
            chiefTown: 'Mvengue',
          },
          {
            code: '18.04.08',
            labelFr: 'Bipindi',
            labelEn: 'Bipindi',
            chiefTown: 'Bipindi',
          },
          {
            code: '18.04.09',
            labelFr: 'Niété',
            labelEn: 'Niete',
            chiefTown: 'Adjap',
          },
        ],
      },
    ],
  },
  {
    code: '19',
    labelFr: 'Sud-Ouest',
    labelEn: 'Southwest',
    departments: [
      {
        code: '19.01',
        labelFr: 'Fako',
        labelEn: 'Fako',
        arrondissements: [
          {
            code: '19.01.01',
            labelFr: 'Muyuka',
            labelEn: 'Muyuka',
            chiefTown: 'Muyuka',
          },
          {
            code: '19.01.02',
            labelFr: 'Tiko',
            labelEn: 'Tiko',
            chiefTown: 'Tiko',
          },
          {
            code: '19.01.03',
            labelFr: 'Limbé 1er',
            labelEn: 'Limbe 1st',
            chiefTown: 'Poh',
          },
          {
            code: '19.01.04',
            labelFr: 'Limbé 2ème',
            labelEn: 'Limbe 2nd',
            chiefTown: 'Mukundangue',
          },
          {
            code: '19.01.05',
            labelFr: 'Limbé 3ème',
            labelEn: 'Limbe 3rd',
            chiefTown: 'Bimbia',
          },
          {
            code: '19.01.06',
            labelFr: 'Buéa',
            labelEn: 'Buea',
            chiefTown: 'Buéa',
          },
          {
            code: '19.01.07',
            labelFr: 'West-Coast',
            labelEn: 'West-Coast',
            chiefTown: 'Idenau',
          },
        ],
      },
      {
        code: '19.02',
        labelFr: 'Manyu',
        labelEn: 'Manyu',
        arrondissements: [
          {
            code: '19.02.01',
            labelFr: 'Mamfe',
            labelEn: 'Mamfe',
            chiefTown: 'Mamfe',
          },
          {
            code: '19.02.02',
            labelFr: 'Akwaya',
            labelEn: 'Akwaya',
            chiefTown: 'Akwaya',
          },
          {
            code: '19.02.03',
            labelFr: 'Eyumodjock',
            labelEn: 'Eyumodjock',
            chiefTown: 'Eyumodjock',
          },
          {
            code: '19.02.04',
            labelFr: 'Upper-Bayang',
            labelEn: 'Upper-Bayang',
            chiefTown: 'Tinto',
          },
        ],
      },
      {
        code: '19.03',
        labelFr: 'Lebialem',
        labelEn: 'Lebialem',
        arrondissements: [
          {
            code: '19.03.01',
            labelFr: 'Fontem',
            labelEn: 'Fontem',
            chiefTown: 'Menji',
          },
          {
            code: '19.03.02',
            labelFr: 'Alou',
            labelEn: 'Alou',
            chiefTown: 'Alou',
          },
          {
            code: '19.03.03',
            labelFr: 'Wabane',
            labelEn: 'Wabane',
            chiefTown: 'Wabane',
          },
        ],
      },
      {
        code: '19.04',
        labelFr: 'Meme',
        labelEn: 'Meme',
        arrondissements: [
          {
            code: '19.04.01',
            labelFr: 'Kumba 1er',
            labelEn: 'Kumba 1st',
            chiefTown: 'Njuki',
          },
          {
            code: '19.04.02',
            labelFr: 'Kumba 2ème',
            labelEn: 'Kumba 2nd',
            chiefTown: 'Fiango',
          },
          {
            code: '19.04.03',
            labelFr: 'Kumba 3ème',
            labelEn: 'Kumba 3rd',
            chiefTown: 'Mambanda',
          },
          {
            code: '19.04.04',
            labelFr: 'Konye',
            labelEn: 'Konye',
            chiefTown: 'Konye',
          },
          {
            code: '19.04.05',
            labelFr: 'Mbonge',
            labelEn: 'Mbonge',
            chiefTown: 'Mbonge',
          },
        ],
      },
      {
        code: '19.05',
        labelFr: 'Kupe-Manengouba',
        labelEn: 'Kupe-Manengouba',
        arrondissements: [
          {
            code: '19.05.01',
            labelFr: 'Bangem',
            labelEn: 'Bangem',
            chiefTown: 'Bangem',
          },
          {
            code: '19.05.02',
            labelFr: 'Nguti',
            labelEn: 'Nguti',
            chiefTown: 'Nguti',
          },
          {
            code: '19.05.03',
            labelFr: 'Tombel',
            labelEn: 'Tombel',
            chiefTown: 'Tombel',
          },
        ],
      },
      {
        code: '19.06',
        labelFr: 'Ndian',
        labelEn: 'Ndian',
        arrondissements: [
          {
            code: '19.06.01',
            labelFr: 'Bamusso',
            labelEn: 'Bamusso',
            chiefTown: 'Bamusso',
          },
          {
            code: '19.06.02',
            labelFr: 'Ekondo-Titi',
            labelEn: 'Ekondo-Titi',
            chiefTown: 'Ekondo-Titi',
          },
          {
            code: '19.06.03',
            labelFr: 'Isangele',
            labelEn: 'Isangele',
            chiefTown: 'Isangele',
          },
          {
            code: '19.06.04',
            labelFr: 'Mundemba',
            labelEn: 'Mundemba',
            chiefTown: 'Mundemba',
          },
          {
            code: '19.06.05',
            labelFr: 'Kombo-Abedimo',
            labelEn: 'Kombo-Abedimo',
            chiefTown: 'Akwa',
          },
          {
            code: '19.06.06',
            labelFr: 'Kombo-Itindi',
            labelEn: 'Kombo-Itindi',
            chiefTown: 'Kombo-Itindi',
          },
          {
            code: '19.06.07',
            labelFr: 'Idabato',
            labelEn: 'Idabato',
            chiefTown: 'Idabato',
          },
          {
            code: '19.06.08',
            labelFr: 'Dikome-Balue',
            labelEn: 'Dikome-Balue',
            chiefTown: 'Dikome-Balue',
          },
          {
            code: '19.06.09',
            labelFr: 'Toko',
            labelEn: 'Toko',
            chiefTown: 'Toko',
          },
        ],
      },
    ],
  },
];

export const SECTORS_DATA: Partial<SectorEntity>[] = [
  {
    code: '0',
    labelFr: 'ACTIVITÉS NON RÉPARTIES PAR FONCTIONS',
    labelEn: 'ACTIVITIES NOT DISTRIBUTED BY FUNCTIONS',
    functions: [
      {
        code: '01',
        labelFr: 'Dette',
        labelEn: 'Debt',
        children: [
          {
            code: '011',
            labelFr: 'Dette intérieure',
            labelEn: 'Domestic debt',
          },
          {
            code: '012',
            labelFr: "Autres arriérés de l'Etat",
            labelEn: 'Other government arrears',
          },
          {
            code: '013',
            labelFr: 'Dette extérieure',
            labelEn: 'External debt',
          },
        ],
      },
      {
        code: '02',
        labelFr: "Logistique de l'administration non répartie",
        labelEn: 'Logistics of the undistributed administration',
        children: [
          {
            code: '021',
            labelFr: "Logistique de l'Administration non répartie",
            labelEn: 'Logistics of the Undistributed Administration',
          },
        ],
      },
      {
        code: '03',
        labelFr: 'Affaires contentieuses',
        labelEn: 'Contentious cases',
        children: [
          {
            code: '031',
            labelFr: 'Affaires contentieuses',
            labelEn: 'Contentious cases',
          },
        ],
      },
      {
        code: '04',
        labelFr: 'Pensions et rentes',
        labelEn: 'Pensions and annuities',
        children: [
          {
            code: '041',
            labelFr: 'Pensions civiles',
            labelEn: 'Civil pensions',
          },
          {
            code: '042',
            labelFr: 'Pensions militaires',
            labelEn: 'Military pensions',
          },
          { code: '043', labelFr: 'Départ en retraite', labelEn: 'Retirement' },
          { code: '044', labelFr: 'Rente viagère', labelEn: 'Life annuity' },
          { code: '045', labelFr: 'Capital décès', labelEn: 'Death benefit' },
          { code: '046', labelFr: 'Anciens combattants', labelEn: 'Veterans' },
        ],
      },
    ],
  },
  {
    code: '1',
    labelFr: 'SOUVERAINETÉ',
    labelEn: 'SOVEREIGNTY',
    functions: [
      {
        labelFr: 'Fonctions présidentielles',
        labelEn: 'Presidential functions',
        code: '11',
        children: [
          {
            code: '110',
            labelFr: 'Dépenses non classées des fonctions présidentielles',
            labelEn: 'Unclassified expenditure of presidential functions',
          },
          {
            code: '111',
            labelFr: 'Administration générale de la Présidence',
            labelEn: 'General administration of the Presidency',
          },
          {
            code: '112',
            labelFr: 'Interventions de la Présidence',
            labelEn: 'Interventions of the Presidency',
          },
          {
            code: '113',
            labelFr: 'Activités diplomatiques de la Présidence',
            labelEn: 'Interventions of the Presidency',
          },
          {
            code: '114',
            labelFr: 'Ordres Nationaux',
            labelEn: 'National Orders',
          },
          {
            code: '116',
            labelFr: 'Recherches Extérieures',
            labelEn: 'External research',
          },
          {
            code: '117',
            labelFr: 'Sécurité et Garde Présidentielle',
            labelEn: 'Security and Presidential Guard',
          },
        ],
      },
      {
        labelFr: 'Fonctions législatives',
        labelEn: 'Legislative functions',
        code: '12',
        children: [
          {
            code: '120',
            labelFr: 'Dépenses non classées des fonctions législatives',
            labelEn: 'Unclassified expenditure of legislative functions',
          },
          {
            code: '121',
            labelFr: 'Assemblée Nationales',
            labelEn: 'National Assembly',
          },
          { code: '123', labelFr: 'Sénat', labelEn: 'Senate' },
        ],
      },
      {
        labelFr: 'Fonctions gouvernementales',
        labelEn: 'Government functions',
        code: '13',
        children: [
          {
            code: '130',
            labelFr: 'Dépenses gouvernementales non classées',
            labelEn: 'Unclassified government spending',
          },
          {
            code: '131',
            labelFr:
              'Administration générale des Services du Premier Ministère',
            labelEn:
              'General Administration of the Services of the Prime Minister',
          },
          {
            code: '132',
            labelFr: 'Interventions du Premier Ministre',
            labelEn: 'Interventions of the Prime Minister',
          },
          {
            code: '133',
            labelFr: 'Travail gouvernemental',
            labelEn: 'Government work',
          },
          {
            code: '134',
            labelFr: 'Bonne gouvernance et lutte contre la corruption',
            labelEn: 'Good governance and the fight against corruption',
          },
        ],
      },
      {
        labelFr: 'Fonctions judiciaires',
        labelEn: 'Judicial functions',
        code: '14',
        children: [
          {
            code: '140',
            labelFr: 'Dépenses non classées des fonctions judiciaires',
            labelEn: 'Unclassified expenditure of judicial functions',
          },
          {
            code: '141',
            labelFr: 'Administration générale de la Justice',
            labelEn: 'General Administration of Justice',
          },
          {
            code: '142',
            labelFr: 'Affaires réservées du Président de la Cour Suprême',
            labelEn: 'Reserved matters of the President of the Supreme Court',
          },
          {
            code: '143',
            labelFr: 'Tribunaux et infrastructures judiciaires',
            labelEn: 'Courts and judicial infrastructure',
          },
          {
            code: '144',
            labelFr: 'Jugement des comptes',
            labelEn: 'Judgment of accounts',
          },
          {
            code: '145',
            labelFr: 'Élaboration des lois - publications juridiques',
            labelEn: 'Law making - legal publications',
          },
          {
            code: '146',
            labelFr: 'Défense libertés et droits de la personne',
            labelEn: 'Defense of human rights and freedoms',
          },
          {
            code: '148',
            labelFr: 'Coordination juridique internationale',
            labelEn: 'International legal coordination',
          },
        ],
      },
      {
        labelFr: 'Fonctions consultatives',
        labelEn: 'Advisory functions',
        code: '15',
        children: [
          {
            code: '150',
            labelFr: 'Dépenses non classées du Conseil Economique et Social',
            labelEn:
              'Unclassified expenditure of the Economic and Social Council',
          },
          {
            code: '152',
            labelFr: 'Conseil Économique et Social',
            labelEn: 'Economic and Social Council',
          },
        ],
      },
      {
        labelFr: 'Fonctions de contrôle',
        labelEn: 'Advisory functions',
        code: '16',
        children: [
          {
            code: '160',
            labelFr: 'Dépenses non classées du Conseil Economique et Social',
            labelEn:
              'Unclassified expenditure of the Economic and Social Council',
          },
          {
            code: '162',
            labelFr: "Contrôle Supérieur de l'Etat",
            labelEn: 'Superior State Control',
          },
          {
            code: '163',
            labelFr: 'Contrôle des comptes de la Nation',
            labelEn: "Control of the Nation's accounts",
          },
        ],
      },
      {
        labelFr: 'Fonctions de contrôle',
        labelEn: 'Advisory functions',
        code: '17',
        children: [
          {
            code: '170',
            labelFr: 'Fonctions de relations extérieures',
            labelEn: 'External relations functions',
          },
          {
            code: '171',
            labelFr: 'Administrations des affaires extérieures',
            labelEn: 'External affairs administrations',
          },
          {
            code: '173',
            labelFr: 'Protocole et activité diplomatique',
            labelEn: 'Protocol and diplomatic activity',
          },
          {
            code: '174',
            labelFr: 'Coopération régionale',
            labelEn: 'Regional cooperation',
          },
          {
            code: '175',
            labelFr: 'Coopération internationale',
            labelEn: 'International cooperation',
          },
          {
            code: '176',
            labelFr: "Représentations à l'étranger",
            labelEn: 'Representations abroad',
          },
          {
            code: '177',
            labelFr: 'Organisations internationales',
            labelEn: 'International organisations',
          },
        ],
      },
      {
        labelFr: "Fonctions d'aides économiques à l'extérieur",
        labelEn: 'External economic aid functions',
        code: '18',
        children: [
          {
            code: '187',
            labelFr: 'Fonds de développement',
            labelEn: 'Development Fund',
          },
        ],
      },
    ],
  },
  {
    code: '2',
    labelFr: 'DÉFENSE ET SÉCURITÉ',
    labelEn: 'DEFENSE AND SECURITY',
    functions: [
      {
        code: '21',
        labelFr: 'Administration générale de la défense et de la sécurité',
        labelEn: 'General administration of defense and security',
        children: [
          {
            code: '210',
            labelFr: 'Dépenses non classées de la défense',
            labelEn: 'Unclassified defense expenditure',
          },
          {
            code: '211',
            labelFr: 'Affaires communes Défense et Sécurité',
            labelEn: 'Joint Defense and Security Affairs',
          },
          {
            code: '215',
            labelFr: 'Logistique et infrastructure militaire',
            labelEn: 'Logistics and military infrastructure',
          },
          {
            code: '216',
            labelFr: 'Opérations et manœuvres',
            labelEn: 'Operations and maneuvers',
          },
          {
            code: '217',
            labelFr: 'Sports militaires',
            labelEn: 'Military sports',
          },
          {
            code: '218',
            labelFr: 'Coopération militaire internationale',
            labelEn: 'International military cooperation',
          },
          {
            code: '219',
            labelFr: "Écoles et centres d'instruction interarmes",
            labelEn: 'Combined arms schools and training centers',
          },
        ],
      },
      {
        code: '22',
        labelFr: 'Défense terrestre',
        labelEn: 'Land Defense',
        children: [
          {
            code: '221',
            labelFr: "Administration de l'armée de terre",
            labelEn: 'Army administration',
          },
          {
            code: '222',
            labelFr: 'Infrastructures armée de terre',
            labelEn: 'Army infrastructure',
          },
          {
            code: '223',
            labelFr: 'Régions militaires',
            labelEn: 'Military regions',
          },
          {
            code: '224',
            labelFr: "Unités opérationnelles de l'armée de terre",
            labelEn: 'Army operational units',
          },
          {
            code: '226',
            labelFr: 'Réhabilitation, maintenance des équipements',
            labelEn: 'Rehabilitation, maintenance of equipment',
          },
        ],
      },
      {
        code: '23',
        labelFr: "Défense de l'armée de l'air",
        labelEn: 'Air Force Defense',
        children: [
          {
            code: '231',
            labelFr: "Administration de l'armée de l'air",
            labelEn: 'Air force administration',
          },
          {
            code: '232',
            labelFr: 'Infrastructures aériennes',
            labelEn: 'Air infrastructure',
          },
          {
            code: '233',
            labelFr: 'Unités et bases aériennes',
            labelEn: 'Air units and bases',
          },
          {
            code: '236',
            labelFr: 'Réhabilitation, maintenance des avions/équipements',
            labelEn: 'Rehabilitation, maintenance of aircraft / equipment',
          },
          {
            code: '239',
            labelFr: "Formations armée de l'air",
            labelEn: 'Air force training',
          },
        ],
      },
      {
        code: '24',
        labelFr: 'Défense maritime',
        labelEn: 'Maritime defense',
        children: [
          {
            code: '241',
            labelFr: 'Administration de la marine',
            labelEn: 'Naval administration',
          },
          {
            code: '242',
            labelFr: 'Infrastructures de la Marine',
            labelEn: 'Navy infrastructure',
          },
          {
            code: '243',
            labelFr: 'Unités et bases navales',
            labelEn: 'Naval units and bases',
          },
          {
            code: '244',
            labelFr: 'Réhabilitation, maintenance des navires/équipements',
            labelEn: 'Rehabilitation, maintenance of vessels / equipment',
          },
        ],
      },
      {
        code: '25',
        labelFr: 'Sécurité intérieure et police',
        labelEn: 'Homeland security and police',
        children: [
          {
            code: '250',
            labelFr: 'Dépenses non classées de la sûreté nationale',
            labelEn: 'Unclassified national security expenditure',
          },
          {
            code: '251',
            labelFr: 'Administration de la Sûreté Nationale',
            labelEn: 'National Security Administration',
          },
          {
            code: '253',
            labelFr: 'Identification, police judiciaire et administrative',
            labelEn: 'Identification, judicial and administrative police',
          },
          {
            code: '254',
            labelFr: 'Contrôle des frontières',
            labelEn: 'Border control',
          },
          {
            code: '256',
            labelFr: "Maintien de l'ordre",
            labelEn: 'Preserve the order',
          },
          {
            code: '257',
            labelFr: 'Renseignements généraux',
            labelEn: 'General Information',
          },
          {
            code: '258',
            labelFr: 'Transmission et logistique',
            labelEn: 'Transmission and logistics',
          },
          {
            code: '259',
            labelFr: 'Écoles et Centres de formation de police',
            labelEn: 'Police schools and training centers',
          },
        ],
      },
      {
        code: '26',
        labelFr: 'Sécurité et Gendarmerie',
        labelEn: 'Security and Gendarmerie',
        children: [
          {
            code: '261',
            labelFr: 'Administration de la Gendarmerie',
            labelEn: 'Gendarmerie administration',
          },
          {
            code: '263',
            labelFr: 'Logistique de la Gendarmerie',
            labelEn: 'Gendarmerie logistics',
          },
          {
            code: '264',
            labelFr: 'Organisation et stratégie',
            labelEn: 'Organization and strategy',
          },
          {
            code: '265',
            labelFr: "Maintien de l'ordre",
            labelEn: 'Preserve the order',
          },
          {
            code: '266',
            labelFr: 'Police judiciaire et administrative',
            labelEn: 'Judicial and administrative police',
          },
          {
            code: '267',
            labelFr: 'Interventions spéciales',
            labelEn: 'Special interventions',
          },
          {
            code: '269',
            labelFr: 'Formations de la Gendarmerie',
            labelEn: 'Gendarmerie training',
          },
        ],
      },
      {
        code: '28',
        labelFr: 'Administrations des Prisons',
        labelEn: 'Prison Administrations',
        children: [
          {
            code: '281',
            labelFr: 'Administrations pénitentiaires',
            labelEn: 'Prison administrations',
          },
          {
            code: '282',
            labelFr: 'Unités pénitentiaires',
            labelEn: 'Prison units',
          },
          {
            code: '283',
            labelFr: 'Réhabilitation des infrastructures pénitentiaires',
            labelEn: 'Rehabilitation of prison infrastructure',
          },
          {
            code: '284',
            labelFr: 'Humanisation du traitement des prisonniers',
            labelEn: 'Humanization of the treatment of prisoners',
          },
          {
            code: '289',
            labelFr: 'Formation des gardiens de prison',
            labelEn: 'Training of prison guards',
          },
        ],
      },
      {
        code: '29',
        labelFr: 'Protection civile et lutte contre les incendies',
        labelEn: 'Civil protection and firefighting',
        children: [
          {
            code: '291',
            labelFr: 'Administration protection civile et incendie',
            labelEn: 'Civil protection and fire administration',
          },
          {
            code: '292',
            labelFr: 'Affaires de protection civile',
            labelEn: 'Civil protection affairs',
          },
          {
            code: '293',
            labelFr: 'Lutte contre les incendies',
            labelEn: 'Fight against fires',
          },
          { code: '294', labelFr: 'Catastrophes', labelEn: 'Disasters' },
          {
            code: '296',
            labelFr: 'Réhabilitation, maintenance matériels incendies',
            labelEn: 'Rehabilitation, maintenance of fire equipment',
          },
        ],
      },
    ],
  },
  {
    code: '3',
    labelFr: 'ADMINISTRATION GÉNÉRALE ET FINANCIÈRE',
    labelEn: 'GENERAL AND FINANCIAL ADMINISTRATION',
    functions: [
      {
        code: '31',
        labelFr: 'Affaires générales des finances',
        labelEn: 'General Finance Affairs',
        children: [
          {
            code: '310',
            labelFr: "Dépenses non classées des Finances et de l'Economie",
            labelEn: 'Unclassified expenditure of Finance and Economy',
          },
          {
            code: '311',
            labelFr: 'Administration générale des finances',
            labelEn: 'General Finance Administration',
          },
          {
            code: '312',
            labelFr: 'Administration générale des investissements',
            labelEn: 'General administration of investments',
          },
          { code: '317', labelFr: 'Prévision', labelEn: 'Forecast' },
        ],
      },
      {
        code: '32',
        labelFr: 'Collecte des ressources et trésor',
        labelEn: 'Collecting resources and treasure',
        children: [
          {
            code: '321',
            labelFr: 'Affaires communes de la collecte des ressources',
            labelEn: 'Common affairs of resource collection',
          },
          {
            code: '322',
            labelFr: 'Collecte des impôts et taxes',
            labelEn: 'Tax collection',
          },
          {
            code: '323',
            labelFr: 'Collecte des taxes douanières',
            labelEn: 'Collection of customs taxes',
          },
          {
            code: '324',
            labelFr: 'Trésor - comptabilité publique',
            labelEn: 'Treasury - public accounting',
          },
          {
            code: '326',
            labelFr: 'Collecte des recettes de services',
            labelEn: 'Collecting service revenue',
          },
          {
            code: '327',
            labelFr:
              'Recherche et mobilisation des ressources : emprunts et dons',
            labelEn: 'Research and mobilization of resources: loans and grants',
          },
          {
            code: '329',
            labelFr: 'Formation à la collecte des ressources',
            labelEn: 'Training in resource collection',
          },
        ],
      },
      {
        code: '33',
        labelFr: 'Programmation, budgétisation et dépense publique',
        labelEn: 'Programming, budgeting and public expenditure',
        children: [
          {
            code: '331',
            labelFr: 'Administration générale du Budget et de la Dépense',
            labelEn: 'General Budget and Expenditure Administration',
          },
          {
            code: '332',
            labelFr: 'Élaboration du budget',
            labelEn: 'Budget preparation',
          },
          {
            code: '333',
            labelFr: 'Exécution du budget',
            labelEn: 'Budget execution',
          },
          { code: '334', labelFr: 'Solde', labelEn: 'Solde' },
          {
            code: '335',
            labelFr: 'Marchés publics',
            labelEn: 'Public markets',
          },
          {
            code: '336',
            labelFr: 'Contrôle des dépenses',
            labelEn: 'Expenditure control',
          },
          { code: '337', labelFr: 'Programmation', labelEn: 'Programming' },
          {
            code: '338',
            labelFr: 'Gestion de la dette publique',
            labelEn: 'Public debt management',
          },
        ],
      },
      {
        code: '34',
        labelFr:
          "Administration du personnel de l'État et organisation administrative",
        labelEn:
          'Administration of State personnel and administrative organization',
        children: [
          {
            code: '340',
            labelFr: 'Dépenses non classées de la fonction publique',
            labelEn: 'Unclassified public service expenditure',
          },
          {
            code: '341',
            labelFr: "Administration générale du personnel de l'Etat",
            labelEn: 'General administration of State personnel',
          },
          {
            code: '342',
            labelFr: "Gestion des ressources humaines de l'État",
            labelEn: 'State human resources management',
          },
          {
            code: '343',
            labelFr: "Mise à jour du fichier du personnel de l'Etat",
            labelEn: 'Update of the State personnel file',
          },
          {
            code: '344',
            labelFr: 'Réforme administrative',
            labelEn: 'Administrative reform',
          },
          {
            code: '345',
            labelFr: 'Contrôle interne',
            labelEn: 'Internal control',
          },
          {
            code: '348',
            labelFr: 'Organisation des effectifs (POE)',
            labelEn: 'Workforce organization (POE)',
          },
          {
            code: '349',
            labelFr: "Formation à l'administration et concours de l'Etat",
            labelEn: 'Administration training and state competition',
          },
        ],
      },
      {
        code: '35',
        labelFr: 'Planification, statistiques et aménagement du territoire',
        labelEn: 'Planning, statistics and land use planning',
        children: [
          {
            code: '351',
            labelFr: 'Affaires communes planification et statistiques',
            labelEn: 'Joint affairs planning and statistics',
          },
          { code: '352', labelFr: 'Planification', labelEn: 'Planning' },
          {
            code: '353',
            labelFr: 'Aménagements du territoire et SDR',
            labelEn: 'Land use planning and SDR',
          },
          { code: '354', labelFr: 'Statistiques', labelEn: 'Statistics' },
          {
            code: '357',
            labelFr: 'Population et recensement',
            labelEn: 'Population and census',
          },
        ],
      },
      {
        code: '36',
        labelFr: "Services généraux de l'administration",
        labelEn: 'General administration services',
        children: [
          {
            code: '361',
            labelFr: 'Gestion des bâtiments administratifs',
            labelEn: 'Management of administrative buildings',
          },
          {
            code: '362',
            labelFr: 'Journal officiel',
            labelEn: 'Official newspaper',
          },
          {
            code: '363',
            labelFr: "Informatique de l'administration",
            labelEn: 'IT administration',
          },
          { code: '364', labelFr: 'Elections', labelEn: 'Elections' },
          {
            code: '365',
            labelFr: 'Fêtes nationales et manifestations',
            labelEn: 'National holidays and events',
          },
          {
            code: '366',
            labelFr: 'Météorologie et informations géographiques',
            labelEn: 'Meteorology and geographic information',
          },
          {
            code: '367',
            labelFr: 'Conservation des archives',
            labelEn: 'Conservation of archives',
          },
          {
            code: '368',
            labelFr: 'Gestion des garages administratifs',
            labelEn: 'Management of administrative garages',
          },
          {
            code: '369',
            labelFr: 'Imprimerie nationale',
            labelEn: 'National printing press',
          },
        ],
      },
      {
        code: '37',
        labelFr: 'Administration du territoire',
        labelEn: 'General administration services',
        children: [
          {
            code: '370',
            labelFr: "Dépenses non classées de l'Administration du territoire",
            labelEn:
              'Unclassified expenditure of the Territorial Administration',
          },
          {
            code: '371',
            labelFr: "Affaires communes de l'administration territoriale",
            labelEn: 'Common affairs of territorial administration',
          },
          {
            code: '372',
            labelFr: 'Administration territoriale principale',
            labelEn: 'Main territorial administration',
          },
          {
            code: '373',
            labelFr: 'Administration territoriale secondaire',
            labelEn: 'Secondary territorial administration',
          },
          {
            code: '374',
            labelFr: "Infrastructure de l'administration territoriale",
            labelEn: 'Territorial administration infrastructure',
          },
        ],
      },
      {
        code: '38',
        labelFr: 'Collectivités locales',
        labelEn: 'Local authorities',
        children: [
          {
            code: '381',
            labelFr: 'Administration générale des collectivités locales',
            labelEn: 'General administration of local authorities',
          },
          {
            code: '382',
            labelFr: 'Appui aux collectivités locales',
            labelEn: 'Support for local communities',
          },
        ],
      },
      {
        code: '39',
        labelFr: 'Autres réformes institutionnelles',
        labelEn: 'Other institutional reforms',
        children: [
          {
            code: '391',
            labelFr: 'Suivi des programmes économiques',
            labelEn: 'Monitoring of economic programs',
          },
          {
            code: '392',
            labelFr: 'Participations, privatisations, restructuration',
            labelEn: 'Participations, privatizations, restructuring',
          },
          {
            code: '399',
            labelFr: 'Autres réformes institutionnelles',
            labelEn: 'Other institutional reforms',
          },
        ],
      },
    ],
  },
  {
    code: '4',
    labelFr: 'ENSEIGNEMENT, FORMATION ET RECHERCHE',
    labelEn: 'TEACHING, TRAINING AND RESEARCH',
    functions: [
      {
        code: '41',
        labelFr: "Administration générale de l'enseignement",
        labelEn: 'General administration of education',
        children: [
          {
            code: '410',
            labelFr: "Dépenses non classées de l'éducation",
            labelEn: 'Unclassified education expenditure',
          },
          {
            code: '411',
            labelFr: "Affaires communes aux différents niveaux d'enseignement",
            labelEn: 'Common matters at different levels of education',
          },
          {
            code: '413',
            labelFr: 'Organisation des examens du secondaire',
            labelEn: 'Organization of secondary exams',
          },
          {
            code: '414',
            labelFr: 'Appuis aux établissements privés',
            labelEn: 'Support for private establishments',
          },
        ],
      },
      {
        code: '42',
        labelFr: 'Enseignement primaire et préscolaire',
        labelEn: 'Primary and preschool education',
        children: [
          {
            code: '421',
            labelFr: "Administration de l'enseignement de base",
            labelEn: 'Basic education administration',
          },
          {
            code: '422',
            labelFr: 'Inspection des écoles primaires et maternelles',
            labelEn: 'Inspection of primary and nursery schools',
          },
          {
            code: '423',
            labelFr: 'Gestion des écoles primaires et maternelles',
            labelEn: 'Management of primary and nursery schools',
          },
          {
            code: '424',
            labelFr: 'Recrutement des instituteurs',
            labelEn: 'Recruitment of teachers',
          },
          {
            code: '425',
            labelFr: 'Appuis aux écoles maternelles et primaires privées',
            labelEn: 'Support for private nursery and primary schools',
          },
          {
            code: '426',
            labelFr: 'Développement des écoles primaires',
            labelEn: 'Primary school development',
          },
          {
            code: '428',
            labelFr: 'Distribution des livres scolaires primaires',
            labelEn: 'Distribution of primary school books',
          },
          {
            code: '429',
            labelFr: 'Formation et pédagogie des instituteurs',
            labelEn: 'Teacher training and education',
          },
        ],
      },
      {
        code: '43',
        labelFr: 'Enseignement secondaire général',
        labelEn: 'General secondary education',
        children: [
          {
            code: '431',
            labelFr: "Administration de l'enseignement secondaire général",
            labelEn: 'General secondary education administration',
          },
          {
            code: '432',
            labelFr: "Inspection de l'enseignement secondaire général",
            labelEn: 'General secondary education inspectorate',
          },
          {
            code: '433',
            labelFr: "Gestion des lycées d'enseignement secondaire général",
            labelEn: 'Management of general secondary schools',
          },
          {
            code: '434',
            labelFr: "Gestion des collèges d'enseignement général",
            labelEn: 'Management of general education colleges',
          },
          {
            code: '435',
            labelFr: 'Appuis aux écoles privées du secondaire général',
            labelEn: 'Support for private general secondary schools',
          },
          {
            code: '436',
            labelFr: 'Développement des établissements du secondaire général',
            labelEn: 'Development of general secondary schools',
          },
          {
            code: '439',
            labelFr: 'Formation/pédagogie des enseignants du secondaire',
            labelEn: 'Training / pedagogy of secondary school teachers',
          },
        ],
      },
      {
        code: '44',
        labelFr: 'Enseignement secondaire technique',
        labelEn: 'Technical secondary education',
        children: [
          {
            code: '441',
            labelFr: "Administration de l'enseignement technique",
            labelEn: 'Administration of technical education',
          },
          {
            code: '442',
            labelFr: "Inspection de l'enseignement secondaire technique",
            labelEn: 'Inspectorate of technical secondary education',
          },
          {
            code: '443',
            labelFr: "Gestion des lycées d'enseignement secondaire technique",
            labelEn: 'Management of technical secondary schools',
          },
          {
            code: '444',
            labelFr: 'Gestion des CETIC et CETIF secondaire technique',
            labelEn: 'Management of CETIC and CETIF technical secondary',
          },
          {
            code: '445',
            labelFr: 'Appuis aux écoles privées du secondaire technique',
            labelEn: 'Support for private technical secondary schools',
          },
          {
            code: '446',
            labelFr: 'Développement des établissements du secondaire technique',
            labelEn: 'Development of technical secondary schools',
          },
          {
            code: '449',
            labelFr: 'Formation et pédagogie des enseignants',
            labelEn: 'Teacher training and education',
          },
        ],
      },
      {
        code: '45',
        labelFr: 'Formation professionnelle',
        labelEn: 'Professional training',
        children: [
          {
            code: '450',
            labelFr: 'Dépenses non classées de la formation professionnelle',
            labelEn: 'Unclassified expenditure on vocational training',
          },
          {
            code: '451',
            labelFr: 'Administration de la formation professionnelle',
            labelEn: 'Administration of vocational training',
          },
          {
            code: '452',
            labelFr: 'Ecoles professionnelles',
            labelEn: 'Vocational schools',
          },
          {
            code: '453',
            labelFr: 'Centres des métiers',
            labelEn: 'Trade centers',
          },
          {
            code: '457',
            labelFr: 'Développement de la formation professionnelle',
            labelEn: 'Development of vocational training',
          },
          { code: '45', labelFr: '', labelEn: '' },
        ],
      },
      {
        code: '46',
        labelFr: 'Enseignement supérieur',
        labelEn: 'Higher Education',
        children: [
          {
            code: '460',
            labelFr: "Dépenses non classées de l'enseignement supérieur",
            labelEn: 'Unclassified higher education expenditure',
          },
          {
            code: '461',
            labelFr: "Administration de l'enseignement supérieur",
            labelEn: 'Higher education administration',
          },
          {
            code: '462',
            labelFr: 'Assistance aux étudiants, œuvres universitaires',
            labelEn: 'Student assistance, university works',
          },
          {
            code: '463',
            labelFr: 'Universités et grandes écoles',
            labelEn: 'Universities and grandes écoles',
          },
          {
            code: '465',
            labelFr: 'Orientations professionnelles',
            labelEn: 'Professional guidance',
          },
          {
            code: '467',
            labelFr: 'Echanges internationaux',
            labelEn: 'International exchanges',
          },
          {
            code: '469',
            labelFr: 'Formations de formateurs',
            labelEn: 'Training of trainers',
          },
        ],
      },
      {
        code: '47',
        labelFr: 'Recherche et innovation',
        labelEn: 'Research and innovation',
        children: [
          {
            code: '470',
            labelFr: 'Dépenses non classées de la recherche',
            labelEn: 'Unclassified research expenditure',
          },
          {
            code: '471',
            labelFr: 'Administration de la recherche scientifique et technique',
            labelEn: 'Administration of scientific and technical research',
          },
          {
            code: '472',
            labelFr: 'Politique et coopération scientifique',
            labelEn: 'Science policy and cooperation',
          },
          {
            code: '473',
            labelFr: 'Recherche agricole',
            labelEn: 'Agricultural research',
          },
          {
            code: '474',
            labelFr:
              'Recherche médicale, nutritionnelle et plantes médicinales',
            labelEn: 'Medical, nutritional and medicinal research',
          },
          {
            code: '475',
            labelFr: 'Recherche et géoscience et en énergie',
            labelEn: 'Research and geoscience and energy',
          },
          {
            code: '476',
            labelFr: 'Recherche sciences humaines et sociales',
            labelEn: 'Research in human and social sciences',
          },
          {
            code: '477',
            labelFr: 'Nouvelles technologies information et communication',
            labelEn: 'New information and communication technologies',
          },
          {
            code: '478',
            labelFr:
              'Valorisation des résultats de la recherche et application industrielle',
            labelEn: 'Promotion of research results and industrial application',
          },
          {
            code: '479',
            labelFr: 'Formation de chercheurs',
            labelEn: 'Training of researchers',
          },
        ],
      },
      {
        code: '48',
        labelFr: 'Enseignement hors niveau',
        labelEn: 'Research and innovation',
        children: [
          {
            code: '483',
            labelFr: 'Sections artisanales rurales et ménagères',
            labelEn: 'Rural and household craft sections',
          },
          { code: '484', labelFr: 'Alphabétisation', labelEn: 'Literacy' },
        ],
      },
    ],
  },
  {
    code: '5',
    labelFr: 'COMMUNICATION, CULTURE, SPORTS ET LOISIRS',
    labelEn: 'COMMUNICATION, CULTURE, SPORTS AND LEISURE',
    functions: [
      {
        code: '52',
        labelFr: 'Culture et arts',
        labelEn: 'Culture and arts',
        children: [
          {
            code: '521',
            labelFr: 'Dépenses non classées de la culture',
            labelEn: 'Unclassified expenditure on culture',
          },
          {
            code: '522',
            labelFr: 'Administration de la culture',
            labelEn: 'Administration of culture',
          },
          {
            code: '523',
            labelFr: 'Action culturelle et soutien aux associations',
            labelEn: 'Cultural action and support for associations',
          },
          {
            code: '524',
            labelFr: 'Patrimoine et musées',
            labelEn: 'Heritage and museums',
          },
          {
            code: '525',
            labelFr: 'Cinéma et audiovisuel',
            labelEn: 'Cinema and audiovisual',
          },
          {
            code: '526',
            labelFr: 'Arts et lettres',
            labelEn: 'Arts and letters',
          },
          {
            code: '527',
            labelFr: 'Langues nationales',
            labelEn: 'National languages',
          },
          {
            code: '528',
            labelFr: 'Echanges culturels internationaux',
            labelEn: 'International cultural exchanges',
          },
          {
            code: '529',
            labelFr: 'Formations artistiques',
            labelEn: 'Artistic training',
          },
        ],
      },
      {
        code: '53',
        labelFr: 'Communication, radio, télévision, édition, presse',
        labelEn: 'Communication, radio, television, publishing, press',
        children: [
          {
            code: '530',
            labelFr: 'Dépenses non classées de la communication',
            labelEn: 'Unclassified communication expenditure',
          },
          {
            code: '531',
            labelFr: 'Administration de la communication',
            labelEn: 'Communication administration',
          },
          {
            code: '532',
            labelFr: 'Edition et presse',
            labelEn: 'Publishing and press',
          },
          {
            code: '533',
            labelFr: 'Production radiotélévision',
            labelEn: 'Broadcasting production',
          },
          {
            code: '534',
            labelFr: 'Transmission civiles',
            labelEn: 'Civil transmission',
          },
          {
            code: '535',
            labelFr: 'Centres de communication',
            labelEn: 'Communication centers',
          },
          {
            code: '536',
            labelFr: 'Information officielle',
            labelEn: 'Official information',
          },
          {
            code: '538',
            labelFr: 'Action internationale en faveur de la communication',
            labelEn: 'International action in favor of communication',
          },
          {
            code: '539',
            labelFr: 'Formation aux techniques de communication',
            labelEn: 'Communication skills training',
          },
        ],
      },
      {
        code: '54',
        labelFr: 'Affaires communes Jeunesse et Sports',
        labelEn: 'Common Youth and Sports Affairs',
        children: [
          {
            code: '540',
            labelFr: 'Dépenses non classées de la Jeunesse et Sports',
            labelEn: 'Unclassified expenditure of Youth and Sports',
          },
          {
            code: '549',
            labelFr:
              'Formation de formateurs et moniteurs pour la Jeunesse et les Sports',
            labelEn: 'Training of trainers and monitors for Youth and Sports',
          },
        ],
      },
      {
        code: '55',
        labelFr: 'Vie associative et loisirs des jeunes',
        labelEn: 'Youth associations and leisure activities',
        children: [
          {
            code: '551',
            labelFr: 'Administration de la vie associative et de la jeunesse',
            labelEn: 'Administration of associative life and youth',
          },
          {
            code: '552',
            labelFr: 'Centre de jeunesse et animation de jeunes',
            labelEn: 'Youth center and youth animation',
          },
          {
            code: '553',
            labelFr: 'Activités de loisir et vacances, centres aérés',
            labelEn: 'Leisure and holiday activities, day camps',
          },
          {
            code: '555',
            labelFr: 'Développement des infrastructures socio-éducatives',
            labelEn: 'Development of socio-educational infrastructure',
          },
          {
            code: '556',
            labelFr: 'Echanges de jeunes',
            labelEn: 'Youth exchanges',
          },
          {
            code: '558',
            labelFr:
              'Action internationale en faveur de la Jeunesse et des loisirs',
            labelEn: 'International action in favor of youth and leisure',
          },
        ],
      },
      {
        code: '56',
        labelFr: 'Sports',
        labelEn: 'Sports',
        children: [
          {
            code: '561',
            labelFr: 'Administration générale des sports',
            labelEn: 'General sports administration',
          },
          { code: '562', labelFr: 'Compétitions', labelEn: 'Competitions' },
          {
            code: '563',
            labelFr: 'Education physique et sportive',
            labelEn: 'Physical education and sports',
          },
          { code: '564', labelFr: 'Sports de masse', labelEn: 'Mass sports' },
          {
            code: '565',
            labelFr: 'Développement des infrastructures sportives',
            labelEn: 'Development of sports infrastructure',
          },
          {
            code: '568',
            labelFr: 'Coopération internationale pour le sport',
            labelEn: 'International cooperation for sport',
          },
        ],
      },
    ],
  },
  {
    code: '6',
    labelFr: 'SANTÉ',
    labelEn: 'HEALTH',
    functions: [
      {
        code: '61',
        labelFr: 'Administration de la santé',
        labelEn: 'Health administration',
        children: [
          {
            code: '610',
            labelFr: 'Dépenses non classées de la santé ',
            labelEn: 'Unclassified health expenditure',
          },
          {
            code: '611',
            labelFr: 'Administration générale de la santé ',
            labelEn: 'General health administration',
          },
          {
            code: '612',
            labelFr: 'Gestion des ressources humaines ',
            labelEn: 'Human resources management',
          },
          {
            code: '615',
            labelFr: 'Formations sanitaires privées ',
            labelEn: 'Private health facilities',
          },
          {
            code: '616',
            labelFr: 'Coopération internationale de la santé ',
            labelEn: 'International health cooperation',
          },
        ],
      },
      {
        code: '62',
        labelFr: 'Soutien logistique à la santé',
        labelEn: 'Logistical support for health',
        children: [
          {
            code: '621',
            labelFr: 'Appui aux formations sanitaires',
            labelEn: 'Unclassified health expenditure',
          },
          {
            code: '625',
            labelFr: 'Capitalisation patrimoine santé',
            labelEn: 'General health administration',
          },
          {
            code: '626',
            labelFr: 'Approvisionnement en médicaments et vaccins',
            labelEn: 'Human resources management',
          },
          {
            code: '628',
            labelFr: 'Recherches biologiques et médicales',
            labelEn: 'Private health facilities',
          },
          {
            code: '629',
            labelFr: 'Formation du personnel des formations sanitaires',
            labelEn: 'International health cooperation',
          },
        ],
      },
      {
        code: '63',
        labelFr: 'Hôpitaux nationaux (santé tertiaire)',
        labelEn: 'National hospitals (tertiary health)',
        children: [
          {
            code: '632',
            labelFr: 'CHU 633 Hôpitaux généraux',
            labelEn: 'CHU 633 General hospitals',
          },
          {
            code: '634',
            labelFr: 'Hôpitaux centraux',
            labelEn: 'Central hospitals',
          },
          {
            code: '636',
            labelFr: 'Autres hôpitaux psychiatriques et centres spécialisés',
            labelEn: 'Other psychiatric hospitals and specialized centers',
          },
          {
            code: '638',
            labelFr: 'Hôpitaux militaires',
            labelEn: 'Military hospitals',
          },
        ],
      },
      {
        code: '64',
        labelFr: 'Hôpitaux régionaux (santé secondaire)',
        labelEn: 'Regional hospitals (secondary health)',
        children: [
          {
            code: '647',
            labelFr: 'Hôpitaux provinciaux',
            labelEn: 'Provincial Hospitals',
          },
        ],
      },
      {
        code: '65',
        labelFr:
          'Santé de district, préventive et soins de base (santé primaire)',
        labelEn: 'District health, preventive and basic care (primary health)',
        children: [
          {
            code: '651',
            labelFr: 'Médecine du travail',
            labelEn: 'Occupational medicine',
          },
          {
            code: '652',
            labelFr: 'Hôpitaux de district',
            labelEn: 'District hospitals',
          },
          {
            code: '653',
            labelFr: "Centres médicaux d'arrondissement",
            labelEn: 'District medical centers',
          },
          { code: '654', labelFr: 'Centre de santé', labelEn: 'Health Center' },
          {
            code: '655',
            labelFr: 'Autres centres de santé primaires',
            labelEn: 'Other primary health centers',
          },
          {
            code: '656',
            labelFr: 'Amélioration qualité soins de base',
            labelEn: 'Quality improvement of basic care',
          },
          {
            code: '657',
            labelFr: 'Santé de reproduction',
            labelEn: 'Reproductive health',
          },
          {
            code: '658',
            labelFr: 'Médecine scolaire et universitaire',
            labelEn: 'School and university medicine',
          },
          {
            code: '659',
            labelFr: 'Formations aux soins de base',
            labelEn: 'Basic care training',
          },
        ],
      },
      {
        code: '66',
        labelFr: 'Lutte contre la maladie, épidémies, urgences et catastrophes',
        labelEn: 'Fight against disease, epidemics, emergencies and disasters',
        children: [
          {
            code: '662',
            labelFr: 'Hygiène publique ',
            labelEn: 'Public hygiene',
          },
          {
            code: '663',
            labelFr: 'Lutte contre la maladie transmissible, vaccination ',
            labelEn: 'Communicable disease control, vaccination',
          },
          {
            code: '664',
            labelFr: 'Lutte contre MST, SIDA, Tuberculose ',
            labelEn: 'Fight against STDs, AIDS, Tuberculosis',
          },
          {
            code: '665',
            labelFr: 'Lutte contre la maladie non transmissible ',
            labelEn: 'Control of non-communicable disease',
          },
          { code: '666', labelFr: 'Santé mentale ', labelEn: 'Mental health' },
          {
            code: '667',
            labelFr: 'Urgences et catastrophes 668 - Epidémies ',
            labelEn: 'Emergencies and disasters 668 - Epidemics',
          },
        ],
      },
    ],
  },
  {
    code: '7',
    labelFr: 'AFFAIRES SOCIALES',
    labelEn: 'SOCIAL AFFAIRS',
    functions: [
      {
        code: '71',
        labelFr: 'Affaires sociales générales',
        labelEn: 'General social affairs',
        children: [
          {
            code: '710',
            labelFr: 'Dépenses non classées des affaires sociales',
            labelEn: 'Unclassified social affairs expenditure',
          },
          {
            code: '711',
            labelFr: 'Administration centrale des affaires sociales',
            labelEn: 'Central administration of social affairs',
          },
          {
            code: '712',
            labelFr: 'Administration locale des affaires sociales',
            labelEn: 'Local administration of social affairs',
          },
          {
            code: '718',
            labelFr: 'Coordination internationale des affaires sociales',
            labelEn: 'International coordination of social affairs',
          },
          {
            code: '719',
            labelFr: 'Formation des agents sociaux',
            labelEn: 'Training of social workers',
          },
        ],
      },
      {
        code: '72',
        labelFr: 'Protection sociale',
        labelEn: 'Social protection',
        children: [
          {
            code: '721',
            labelFr: 'Assistance sociale et œuvres sociales',
            labelEn: 'Social assistance and social works',
          },
          {
            code: '722',
            labelFr: 'Centres handicapés, aveugles, sourds-muets',
            labelEn: 'Centers for the disabled, blind, deaf-mute',
          },
          { code: '723', labelFr: 'Personnes âgées', labelEn: 'Elderly' },
          {
            code: '724',
            labelFr: "Protection de la famille et de l'enfance",
            labelEn: 'Protection of family and children',
          },
          {
            code: '725',
            labelFr: 'Jeunes en difficulté',
            labelEn: 'Youth in difficulty',
          },
          {
            code: '726',
            labelFr: 'Populations marginales',
            labelEn: 'Marginal populations',
          },
          {
            code: '727',
            labelFr: 'Interventions sociales urgentes',
            labelEn: 'Urgent social interventions',
          },
          {
            code: '728',
            labelFr: 'Victimes des catastrophes',
            labelEn: 'Victims of disasters',
          },
        ],
      },
      {
        code: '73',
        labelFr: 'Promotion féminine',
        labelEn: 'Promotion of women',
        children: [
          {
            code: '730',
            labelFr: 'Dépenses non classées de la promotion féminine',
            labelEn: 'Unclassified expenditure for the promotion of women',
          },
          {
            code: '731',
            labelFr: 'Administration générale de la promotion féminine',
            labelEn: 'General administration for the advancement of women',
          },
          {
            code: '732',
            labelFr: 'Valorisation des ressources humaines féminines',
            labelEn: 'Development of female human resources',
          },
          {
            code: '733',
            labelFr: 'Observatoire de la femme',
            labelEn: "Women's Observatory",
          },
          {
            code: '734',
            labelFr:
              'Promotion des droits et des valeurs culturelles et morales de la femme',
            labelEn:
              'Promotion of the rights and cultural and moral values of women',
          },
          {
            code: '735',
            labelFr: 'Famille et enfance',
            labelEn: 'Family and childhood',
          },
          {
            code: '736',
            labelFr: "Home-ateliers et centres d'accueil",
            labelEn: 'Home-workshops and reception centers',
          },
        ],
      },
      {
        code: '74',
        labelFr:
          "Affaires communes de la main d'œuvre et de la prévoyance sociale",
        labelEn: 'Common labor and social welfare affairs',
        children: [
          {
            code: '740',
            labelFr:
              "Dépenses non classées des affaires de la main d'œuvre et de la prévoyance sociale",
            labelEn:
              'Unclassified expenditure on labor affairs and social security',
          },
          {
            code: '741',
            labelFr:
              "Administration générale de la main d'œuvre et de la prévoyance sociale",
            labelEn: 'General administration of manpower and social security',
          },
        ],
      },
      {
        code: '75',
        labelFr: 'Planification, statistiques et aménagement du territoire',
        labelEn: 'Planning, statistics and land use planning',
        children: [
          {
            code: '751',
            labelFr: 'Administration du travail',
            labelEn: 'Labor administration',
          },
          {
            code: '752',
            labelFr: 'Inspection du travail',
            labelEn: 'Labor inspection',
          },
          {
            code: '753',
            labelFr: 'Activités syndicales',
            labelEn: 'Union activities',
          },
        ],
      },
      {
        code: '76',
        labelFr: 'Prévoyance sociale',
        labelEn: 'Social Security',
        children: [
          {
            code: '761',
            labelFr: 'Administration de la prévoyance sociale',
            labelEn: '',
          },
          {
            code: '762',
            labelFr: 'Prévoyance maladie et accident',
            labelEn: '',
          },
          { code: '763', labelFr: 'Prévoyance retraite', labelEn: '' },
        ],
      },
    ],
  },
  {
    code: '8',
    labelFr: 'INFRASTRUCTURES',
    labelEn: 'INFRASTRUCTURE',
    functions: [
      {
        code: '81',
        labelFr: 'Affaires générales des infrastructures',
        labelEn: 'General infrastructure affairs',
        children: [
          {
            code: '810',
            labelFr: 'Dépenses non classées du MINMEE',
            labelEn: 'Unclassified MINMEE expenditure',
          },
          {
            code: '811',
            labelFr: "Administration générale de l'eau et de l'énergie",
            labelEn: 'General administration of water and energy',
          },
          {
            code: '813',
            labelFr: 'Développement des infrastructures',
            labelEn: 'Infrastructure development',
          },
        ],
      },
      {
        code: '82',
        labelFr: 'Développement urbain',
        labelEn: 'Urban development',
        children: [
          {
            code: '820',
            labelFr: 'Dépenses non classées du MINUH et MINVIL',
            labelEn: 'Unclassified expenditure of MINUH and MINVIL',
          },
          {
            code: '822',
            labelFr: 'Administration générale du développement urbain',
            labelEn: 'General administration of urban development',
          },
          {
            code: '823',
            labelFr: 'Habitat et logement',
            labelEn: 'Housing and housing',
          },
          {
            code: '824',
            labelFr: 'Urbanisme et développement collectif',
            labelEn: 'Urban planning and collective development',
          },
          { code: '825', labelFr: 'Voiries urbaines', labelEn: 'urban roads' },
          {
            code: '826',
            labelFr: 'Cadastres et domaines',
            labelEn: 'Cadastres and domains',
          },
          {
            code: '827',
            labelFr: 'Aménagement des terrains',
            labelEn: 'Land development',
          },
        ],
      },
      {
        code: '83',
        labelFr: 'Approvisionnement en eau',
        labelEn: 'Water supply',
        children: [
          {
            code: '831',
            labelFr: "Administration de l'hydraulique",
            labelEn: 'Water administration',
          },
          {
            code: '832',
            labelFr: 'Hydraulique urbaine',
            labelEn: 'Urban hydraulics',
          },
          {
            code: '833',
            labelFr: 'Hydraulique rurale et villageoise',
            labelEn: 'Rural and village hydraulics',
          },
          {
            code: '835',
            labelFr: "Contrôle de l'eau 839 Formation à l'hydraulique rurale",
            labelEn: 'Water control 839 Rural water training',
          },
        ],
      },
      {
        code: '84',
        labelFr: "Assainissement et protection de l'environnement",
        labelEn: 'Sanitation and environmental protection',
        children: [
          {
            code: '841',
            labelFr:
              "Administration de l'environnement et coopération internationale",
            labelEn:
              'Environmental administration and international cooperation',
          },
          {
            code: '842',
            labelFr: 'Assainissement et traitement des ordures',
            labelEn: 'Sanitation and waste treatment',
          },
          {
            code: '843',
            labelFr: 'Lutte contre la pollution et les nuisances',
            labelEn: 'Fight against pollution and nuisances',
          },
          {
            code: '844',
            labelFr: 'Protection domaine forestier, reboisement',
            labelEn: 'Forest domain protection, reforestation',
          },
          {
            code: '845',
            labelFr: 'Milieu maritime, rivières, lacs, étangs',
            labelEn: 'Maritime environment, rivers, lakes, ponds',
          },
          {
            code: '846',
            labelFr:
              'Protection nature, biodiversité, faune, zoos, parcs, réserves',
            labelEn:
              'Protection of nature, biodiversity, fauna, zoos, parks, reserves',
          },
          {
            code: '849',
            labelFr:
              "Formation et sensibilisation à l'environnement et à la faune",
            labelEn: 'Environmental and wildlife training and awareness',
          },
        ],
      },
      {
        code: '85',
        labelFr: 'Energie',
        labelEn: 'Energy',
        children: [
          {
            code: '851',
            labelFr: "Administration de l'énergie",
            labelEn: 'Energy administration',
          },
          {
            code: '854',
            labelFr: 'Electrification rurale',
            labelEn: 'Rural electrification',
          },
          {
            code: '855',
            labelFr: "Economies d'énergie",
            labelEn: 'Energy savings',
          },
          {
            code: '856',
            labelFr: 'Autres énergies',
            labelEn: 'Other energies',
          },
          {
            code: '857',
            labelFr: "Régulation de l'électricité",
            labelEn: 'Electricity regulation',
          },
          {
            code: '859',
            labelFr: 'Formation en électricité et autres énergies',
            labelEn: 'Training in electricity and other energies',
          },
        ],
      },
      {
        code: '86',
        labelFr:
          "Routes et ouvrages d'art, voies urbaines, de transit et pistes",
        labelEn: 'Roads and structures, urban, transit routes and tracks',
        children: [
          {
            code: '860',
            labelFr: 'Dépenses non classées du MINTP',
            labelEn: 'MINTP unclassified expenditure',
          },
          {
            code: '861',
            labelFr: 'Administration générale des travaux publics',
            labelEn: 'General administration of public works',
          },
          {
            code: '862',
            labelFr: 'Surveillance du réseau routier',
            labelEn: 'Monitoring of the road network',
          },
          {
            code: '863',
            labelFr: 'Préparation des interventions sur le réseau routier',
            labelEn: 'Preparation of interventions on the road network',
          },
          {
            code: '864',
            labelFr: "Entretien des routes, voiries et ouvrages d'art",
            labelEn: 'Maintenance of roads, roads and engineering structures',
          },
          {
            code: '865',
            labelFr: 'Contrôle des travaux routiers',
            labelEn: 'Control of road works',
          },
          {
            code: '866',
            labelFr: 'Pistes rurales, de collecte et de désenclavement',
            labelEn: 'Rural, collection and access roads',
          },
          {
            code: '867',
            labelFr: 'Digues agricoles',
            labelEn: 'Agricultural dikes',
          },
          {
            code: '869',
            labelFr: 'Formation aux travaux publics',
            labelEn: 'Public works training',
          },
        ],
      },
      {
        code: '87',
        labelFr: 'Infrastructures portuaires, aéroportuaires et ferroviaires',
        labelEn: 'Port, airport and rail infrastructure',
        children: [
          {
            code: '870',
            labelFr: 'Dépenses non classées',
            labelEn: 'Unclassified expenditure',
          },
          {
            code: '871',
            labelFr: 'Affaires communes aux infrastructures des transports',
            labelEn: 'Common matters for transport infrastructure',
          },
          {
            code: '872',
            labelFr: 'Administration locale des transports',
            labelEn: 'Local transport administration',
          },
          {
            code: '873',
            labelFr: 'Infrastructures maritimes et portuaires',
            labelEn: 'Maritime and port infrastructure',
          },
          {
            code: '874',
            labelFr: 'Infrastructures des transports aériens',
            labelEn: 'Air transport infrastructure',
          },
          {
            code: '875',
            labelFr: 'Oléoducs, viaducs',
            labelEn: 'Oil pipelines, viaducts',
          },
          {
            code: '876',
            labelFr: 'Infrastructures des transports urbains',
            labelEn: 'Urban transport infrastructure',
          },
          {
            code: '877',
            labelFr: 'Infrastructures des transports ferroviaires',
            labelEn: 'Rail transport infrastructure',
          },
          {
            code: '878',
            labelFr:
              "Infrastructures des transports par voies d'eaux intérieures",
            labelEn: 'Inland waterway transport infrastructure',
          },
          {
            code: '879',
            labelFr: 'Formations aux transports',
            labelEn: 'Transport training',
          },
        ],
      },
      {
        code: '88',
        labelFr: 'Postes et télécommunications',
        labelEn: 'Post and telecommunications',
        children: [
          {
            code: '880',
            labelFr: 'Dépenses non classées des postes et télécommunications',
            labelEn: 'Unclassified expenditure of post and telecommunications',
          },
          {
            code: '881',
            labelFr: 'Administration des postes et télécommunications',
            labelEn: 'Post and telecommunications administration',
          },
          { code: '882', labelFr: 'Postes', labelEn: 'Posts' },
          {
            code: '883',
            labelFr: 'Télécommunications',
            labelEn: 'Telecommunications',
          },
          {
            code: '887',
            labelFr: 'Régulation des télécommunications',
            labelEn: 'Telecommunications regulation',
          },
          {
            code: '889',
            labelFr: 'Formation aux postes et télécommunications',
            labelEn: 'Post and telecommunications training',
          },
        ],
      },
      {
        code: '89',
        labelFr: 'Construction et bâtiments',
        labelEn: 'Construction and buildings',
        children: [
          {
            code: '891',
            labelFr: 'Administration générale de la construction',
            labelEn: 'Unclassified expenditure of post and telecommunications',
          },
          {
            code: '892',
            labelFr: 'Normalisation',
            labelEn: 'Post and telecommunications administration',
          },
          {
            code: '893',
            labelFr: 'Préparation des interventions en bâtiments',
            labelEn: 'Posts',
          },
          {
            code: '894',
            labelFr: 'Exécution des travaux du bâtiment',
            labelEn: 'Telecommunications',
          },
          {
            code: '895',
            labelFr: 'Contrôle des travaux du bâtiment',
            labelEn: 'Telecommunications regulation',
          },
        ],
      },
    ],
  },
  {
    code: '9',
    labelFr: 'PRODUCTION ET COMMERCE',
    labelEn: 'PRODUCTION AND TRADE',
    functions: [
      {
        code: '91',
        labelFr:
          "Affaires communes de la production, du commerce et de l'emploi",
        labelEn: 'Common affairs of production, trade and employment',
        children: [
          {
            code: '910',
            labelFr:
              'Dépenses non classées du développement industriel et commercial',
            labelEn:
              'Unclassified industrial and commercial development expenditure',
          },
          {
            code: '911',
            labelFr:
              'Administration générale production/économie/commerce/industrie',
            labelEn:
              'General administration production / economy / commerce / industry',
          },
          {
            code: '912',
            labelFr: 'Normalisation, métrologie, qualité',
            labelEn: 'Standardization, metrology, quality',
          },
          {
            code: '913',
            labelFr: 'Institutions financières, marchés financiers',
            labelEn: 'Financial institutions, financial markets',
          },
          {
            code: '914',
            labelFr: 'Coopération commerciale internationale',
            labelEn: 'International trade cooperation',
          },
          {
            code: '915',
            labelFr: 'Investissements entreprises, PME',
            labelEn: 'Investments in companies, SMEs',
          },
          {
            code: '916',
            labelFr: 'Artisanat, TPE et secteur informel',
            labelEn: 'Handicrafts, VSEs and the informal sector',
          },
          {
            code: '917',
            labelFr: "Promotion de l'emploi",
            labelEn: 'Promotion of employment',
          },
          {
            code: '919',
            labelFr: 'Formation commerce/gestion',
            labelEn: 'Business / management training',
          },
        ],
      },
      {
        code: '92',
        labelFr: 'Affaires rurales et agricoles générales',
        labelEn: 'General rural and agricultural affairs',
        children: [
          {
            code: '920',
            labelFr: 'Dépenses non classées des affaires rurales générales',
            labelEn: 'Unclassified general rural affairs expenditure',
          },
          {
            code: '921',
            labelFr: 'Administration des affaires rurales',
            labelEn: 'Rural Affairs Administration',
          },
          {
            code: '922',
            labelFr: 'Développement rural intégré',
            labelEn: 'Integrated rural development',
          },
          {
            code: '923',
            labelFr: 'Aménagement hydroagricole et mise en valeur terres',
            labelEn: 'Hydro-agricultural development and land reclamation',
          },
          {
            code: '924',
            labelFr: 'Sécurité alimentaire',
            labelEn: 'Food security',
          },
          {
            code: '925',
            labelFr: 'Vulgarisation agricole/élevage',
            labelEn: 'Agricultural / livestock extension',
          },
          {
            code: '926',
            labelFr: 'Promotion à la transformation et commercialisation',
            labelEn: 'Promotion for processing and marketing',
          },
          {
            code: '927',
            labelFr: 'Infrastructures rurales',
            labelEn: 'Rural infrastructure',
          },
          {
            code: '928',
            labelFr: 'Professionnalisation et financement agricole',
            labelEn: 'Professionalization and agricultural financing',
          },
          {
            code: '929',
            labelFr: 'Formation aux métiers ruraux',
            labelEn: 'Training for rural trades',
          },
        ],
      },
      {
        code: '93',
        labelFr: 'Production végétale',
        labelEn: 'Vegetable production',
        children: [
          {
            code: '931',
            labelFr: 'Affaires générales de la production végétale',
            labelEn: 'General affairs of crop production',
          },
          {
            code: '932',
            labelFr: 'Filières cacao/café',
            labelEn: 'Cocoa / coffee sectors',
          },
          {
            code: '933',
            labelFr: 'Filière palmier à huile/hévéa',
            labelEn: 'Oil palm / rubber industry',
          },
          {
            code: '934',
            labelFr: 'Filières coton, tabac, sucre',
            labelEn: 'Cotton, tobacco, sugar sectors',
          },
          {
            code: '935',
            labelFr: 'Filières légumes, fruits, bananes',
            labelEn: 'Vegetable, fruit and banana sectors',
          },
          {
            code: '936',
            labelFr: 'Filières semences',
            labelEn: 'Seed sectors',
          },
          { code: '937', labelFr: 'Autres filières', labelEn: 'Other sectors' },
          {
            code: '938',
            labelFr: "Formation à l'agriculture",
            labelEn: 'Agricultural training',
          },
        ],
      },
      {
        code: '94',
        labelFr: 'Production forestière',
        labelEn: 'Forest production',
        children: [
          {
            code: '940',
            labelFr: "Dépenses non classées de l'administration des forêts",
            labelEn: 'Unclassified expenditure of the forest administration',
          },
          {
            code: '941',
            labelFr: 'Administration des forêts',
            labelEn: 'Forest administration',
          },
          {
            code: '942',
            labelFr: 'Production forestière',
            labelEn: 'Forest production',
          },
          {
            code: '943',
            labelFr: 'Transformation et commercialisation',
            labelEn: 'Processing and marketing',
          },
          {
            code: '944',
            labelFr: 'Formations forestières',
            labelEn: 'Forestry training',
          },
        ],
      },
      {
        code: '95',
        labelFr: 'Ressources animales générales et élevage',
        labelEn: 'General animal resources and breeding',
        children: [
          {
            code: '950',
            labelFr:
              "Dépenses non classées de l'administration des ressources animales",
            labelEn:
              'Unclassified expenditure of the administration of animal resources',
          },
          {
            code: '951',
            labelFr: 'Administration des ressources animales',
            labelEn: 'Animal resources administration',
          },
          {
            code: '952',
            labelFr: "Infrastructure d'élevage, hydraulique pastorale",
            labelEn: 'Livestock infrastructure, pastoral hydraulics',
          },
          {
            code: '953',
            labelFr: 'Santé animale et santé publique vétérinaire',
            labelEn: 'Animal health and veterinary public health',
          },
          {
            code: '954',
            labelFr: "Promotion d'élevages et gros bétail",
            labelEn: 'Promotion of breeding and large cattle',
          },
          {
            code: '956',
            labelFr: 'Elevage espèces à cycle court',
            labelEn: 'Breeding short cycle species',
          },
          {
            code: '958',
            labelFr: 'Appui et contrôle des industries animales',
            labelEn: 'Support and control of animal industries',
          },
          {
            code: '959',
            labelFr: 'Formation à la production animale',
            labelEn: 'Training in animal production',
          },
        ],
      },
      {
        code: '96',
        labelFr: 'Pêche et aquaculture',
        labelEn: 'Fisheries and aquaculture',
        children: [
          {
            code: '961',
            labelFr: 'Administration des ressources hydrauliques',
            labelEn: 'Administration of water resources',
          },
          {
            code: '962',
            labelFr: 'Infrastructures de la pêche et aquaculture',
            labelEn: 'Fisheries and aquaculture infrastructure',
          },
          {
            code: '964',
            labelFr: 'Promotion de la pêche',
            labelEn: 'Promotion of fishing',
          },
          {
            code: '965',
            labelFr: 'Promotion aquaculture',
            labelEn: 'Aquaculture promotion',
          },
          {
            code: '967',
            labelFr: 'Pêche et aquaculture',
            labelEn: 'Fisheries and aquaculture',
          },
          {
            code: '968',
            labelFr: 'Contrôle et surveillance des pêcheries',
            labelEn: 'Fisheries control and surveillance',
          },
          {
            code: '969',
            labelFr: 'Formation en matière des pêches et aquaculture',
            labelEn: 'Fisheries and aquaculture training',
          },
        ],
      },
      {
        code: '97',
        labelFr: 'Hydrocarbures, industries, mines et carrières',
        labelEn: 'Hydrocarbons, industries, mines and quarries',
        children: [
          {
            code: '971',
            labelFr: 'Affaires industries extractives et hydrocarbures',
            labelEn: 'Extractive industries and hydrocarbons affairs',
          },
          {
            code: '973',
            labelFr:
              'Affaires et industries de transformation soutien et contrôle',
            labelEn: 'Business and processing industries support and control',
          },
          {
            code: '975',
            labelFr: 'Cartographie, exploration, recherche',
            labelEn: 'Cartography, exploration, research',
          },
          {
            code: '976',
            labelFr:
              'Contrôles des produits pétroliers et sécurité des installations',
            labelEn:
              'Controls of petroleum products and safety of installations',
          },
        ],
      },
      {
        code: '98',
        labelFr: 'Tourisme et hôtellerie',
        labelEn: 'Tourism and hospitality',
        children: [
          {
            code: '980',
            labelFr: 'Dépenses non classées du tourisme',
            labelEn: 'Unclassified tourism expenditure',
          },
          {
            code: '981',
            labelFr: 'Administration tourisme/hôtellerie',
            labelEn: 'Tourism / hotel administration',
          },
          {
            code: '982',
            labelFr: 'Promotion du tourisme',
            labelEn: 'Promotion of tourism',
          },
          {
            code: '985',
            labelFr:
              "Promotion et contrôle de l'hôtellerie et des structures d'hébergement",
            labelEn:
              'Promotion and supervision of hotels and accommodation structures',
          },
          {
            code: '986',
            labelFr: 'Identification et aménagements des sites touristiques',
            labelEn: 'Identification and development of tourist sites',
          },
          {
            code: '989',
            labelFr: 'Formations au tourisme/hôtellerie',
            labelEn: 'Tourism / hotel training',
          },
        ],
      },
      {
        code: '99',
        labelFr: 'Exploitation des transports',
        labelEn: 'Transport operation',
        children: [
          {
            code: '991',
            labelFr: 'Administration des transports',
            labelEn: 'Transport administration',
          },
          {
            code: '992',
            labelFr: 'Transports terrestres',
            labelEn: 'Land transport',
          },
          {
            code: '993',
            labelFr: 'Transports ferroviaires',
            labelEn: 'Rail transport',
          },
          {
            code: '994',
            labelFr: 'Transports maritimes/fluviaux',
            labelEn: 'Sea / river transport',
          },
          {
            code: '995',
            labelFr: 'Transports aériens',
            labelEn: 'Air transport',
          },
          {
            code: '996',
            labelFr: 'Transports urbains',
            labelEn: 'Urban transport',
          },
          {
            code: '999',
            labelFr: 'Formations aux transports',
            labelEn: 'Transport training',
          },
        ],
      },
    ],
  },
];

export const CONTRIBUABLES_DATA: Partial<ContribuableEntity>[] = [
  {
    code: 'P125645231524G',
    adresse: 'YDE, BRIQUETERIE',
    numeroCompte: '10000002512',
    cle: '10',
    contact: '+237670000000',
    email: 'example@mail.com',
    localisation: 'YDE',
    quartier: 'BRIQUETERIE',
    raisonSociale: 'CAMSU SARL',
    regimeFiscal: new RegimeFiscalEntity(2, 'SIMPLIFIE', 'REGIME SIMPLIFIE'),
    secteurActivite: 'Energie',
    siege: 'YDE',
    ville: 'YDE2',
  },
  {
    code: 'K100645231004F',
    adresse: 'DLA, PORT',
    numeroCompte: '10000000002',
    cle: '50',
    contact: '+237690000000',
    email: 'example2@mail.com',
    localisation: 'DLA',
    quartier: 'PORT',
    raisonSociale: 'MUMA SARL',
    regimeFiscal: new RegimeFiscalEntity(1, 'REEL', 'REGIME REEL'),
    secteurActivite: 'Alimentation',
    siege: 'DLA',
    ville: 'DLA',
  },
];

export const REGIMES_DATA: Partial<RegimeFiscalEntity>[] = [
  {
    code: 'REEL',
    description: 'REGIME REEL',
  },
  {
    code: 'SIMPLIFIE',
    description: 'REGIME SIMPLIFIE',
  },
];

export const CATEGORIES_AGENTS_DATA: Partial<CategorieAgentEntity>[] = [
  {
    code: 'A1',
  },
  {
    code: 'A2',
  },
  {
    code: 'B1',
  },
  {
    code: 'B2',
  },
  {
    code: 'C',
  },
  {
    code: 'D',
  },
  {
    code: '1',
  },
  {
    code: '2',
  },
  {
    code: '3',
  },
  {
    code: '4',
  },
  {
    code: '5',
  },
  {
    code: '6',
  },
  {
    code: '7',
  },
  {
    code: '8',
  },
  {
    code: '9',
  },
  {
    code: '10',
  },
  {
    code: '11',
  },
  {
    code: '12',
  },
  {
    code: '13',
  },
];

export const GRADES_DATA: Partial<GradeEntity>[] = [
  {
    code: 'GRADE1',
  },
  {
    code: 'GRADE2',
  },
  {
    code: 'GRADE3',
  },
];
