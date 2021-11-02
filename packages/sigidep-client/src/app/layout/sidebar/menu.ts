import { MenuItem } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

const simpleCrudPermissions = (key: string) => ['create', 'read', 'update', 'delete'].map(op => `${key}.${op}`);

export const MenuPermissions = {
  'exercises_menu': [...simpleCrudPermissions('exercises')],
  'roles_menu': [...simpleCrudPermissions('roles')],
  'financial_sources': [...simpleCrudPermissions('financialSources')],
  'administrative_units': [...simpleCrudPermissions('administrativeUnits')],
  'technical_supervisor': [...simpleCrudPermissions('technicalSupervisions')],
  'paragraphs': [...simpleCrudPermissions('paragraphs')],
};

export const I18NMenus = (translate: TranslateService): MenuItem[] => {
  return [
    {
      label: translate.instant('sidebar.dashboard'),
      icon: 'pi pi-th-large',
      routerLink: 'home',
      routerLinkActiveOptions: { exact: true },
      state: {
        permissions: [],
      }
    },
    { separator: true, label:   `------ ${translate.instant('sidebar.elaboration')} --------`},
    {
      routerLink: 'exercises',
      icon: 'pi pi-calendar',
      label: translate.instant('sidebar.exercises'),
      routerLinkActiveOptions: { exact: true },
      state: {
        permissions: [...MenuPermissions.exercises_menu],
      },
    },
    { separator: true, label:   `------ ${translate.instant('sidebar.system')} --------`},
    {
      icon: 'pi pi-briefcase',
      label: translate.instant('sidebar.structure'),
      routerLinkActiveOptions: { exact: true },
      state: {
        permissions: [
        ],
      },
      items: [
        {
          routerLink: 'offices',
          icon: 'pi pi-cog',
          label: translate.instant('sidebar.settings'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'administrative-units',
          icon: 'pi pi-filter',
          label: translate.instant('sidebar.administrativeUnits'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'financial-sources',
          icon: 'pi pi-euro',
          label: translate.instant('sidebar.financialSources'),
          routerLinkActiveOptions: { exact: true },
          state: {
            permissions: [...MenuPermissions.administrative_units]
          }
        }, {
          routerLink: 'programmes',
          icon: 'pi pi-sitemap',
          label: 'Sous programmes',
          routerLinkActiveOptions: { exact: true },
          state: {
            permissions: [...MenuPermissions.paragraphs],
          }
        }, {
          routerLink: 'technical-supervisors',
          icon: 'pi pi-shield',
          label: translate.instant('sidebar.technicalSupervision'),
          routerLinkActiveOptions: { exact: true },
          state: {
            permissions: [...MenuPermissions.technical_supervisor],
          }
        }, {
          routerLink: 'offices',
          icon: 'pi pi-book',
          label: translate.instant('sidebar.deliverables'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'paragraphs',
          icon: 'pi pi-list',
          label: translate.instant('sidebar.paragraphs'),
          routerLinkActiveOptions: { exact: true },
        },
      ],
    }, {
      label: translate.instant('sidebar.addresses'),
      icon: 'pi pi-globe',
      // routerLink: 'offices',
      // routerLinkActiveOptions: { exact: true },
      state: {
        permissions: [],
      },
      items: [
        {
          routerLink: 'offices',
          icon: 'pi pi-globe',
          label: translate.instant('sidebar.regions'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'offices',
          icon: 'pi pi-globe',
          label: translate.instant('sidebar.arrondissements'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'offices',
          icon: 'pi pi-globe',
          label: translate.instant('sidebar.departements'),
          routerLinkActiveOptions: { exact: true },
        },
      ],
    }, {
      routerLink: 'roles',
      icon: 'pi pi-lock',
      label: translate.instant('sidebar.roles'),
      routerLinkActiveOptions: { exact: true },
      state: {
        permissions: [...MenuPermissions.roles_menu],
      },
    },
  ];
};
