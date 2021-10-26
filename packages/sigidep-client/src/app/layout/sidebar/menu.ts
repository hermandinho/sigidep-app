import { MenuItem } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

export const MenuPermissions = {
  'exercises_menu': ['exercises.create', 'exercises.read', 'exercises.update', 'exercises.delete'],
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
          routerLink: 'paragraphs',
          icon: 'pi pi-euro',
          label: translate.instant('sidebar.financialSources'),
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'paragraphs',
          icon: 'pi pi-sitemap',
          label: 'Sous programmes',
          routerLinkActiveOptions: { exact: true },
        }, {
          routerLink: 'offices',
          icon: 'pi pi-shield',
          label: translate.instant('sidebar.technicalSupervision'),
          routerLinkActiveOptions: { exact: true },
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
    },
  ];
};
