import { MenuItem } from 'primeng/api';

export const MENU: MenuItem[] = [
  {
    label: 'Tableau de bord',
    icon: 'pi pi-th-large',
    routerLink: 'home',
    routerLinkActiveOptions: { exact: true },
    state: {
      permissions: [],
    }
  },
  { separator: true, label:   '------ Elaboration --------'},
  {
    routerLink: 'offices',
    icon: 'pi pi-calendar',
    label: 'Exercices',
    routerLinkActiveOptions: { exact: true },
    state: {
      permissions: [],
    },
  },
  { separator: true, label:   '------ Système --------'},
  {
    icon: 'pi pi-briefcase',
    label: 'Structure',
    routerLinkActiveOptions: { exact: true },
    state: {
      permissions: [
      ],
    },
    items: [
      {
        routerLink: 'offices',
        icon: 'pi pi-cog',
        label: 'Paramètres',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'paragraphs',
        icon: 'pi pi-euro',
        label: 'Sources de financement',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'paragraphs',
        icon: 'pi pi-sitemap',
        label: 'Sous programmes',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'offices',
        icon: 'pi pi-shield',
        label: 'Tutelle Techniques',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'offices',
        icon: 'pi pi-book',
        label: 'Unités physiques',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'paragraphs',
        icon: 'pi pi-list',
        label: 'Paragraphs',
        routerLinkActiveOptions: { exact: true },
      },
    ],
  }, {
    label: 'Addresses',
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
        label: 'Régions',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'offices',
        icon: 'pi pi-globe',
        label: 'Arrondissements',
        routerLinkActiveOptions: { exact: true },
      }, {
        routerLink: 'offices',
        icon: 'pi pi-globe',
        label: 'Départements',
        routerLinkActiveOptions: { exact: true },
      },
    ],
  },
];
