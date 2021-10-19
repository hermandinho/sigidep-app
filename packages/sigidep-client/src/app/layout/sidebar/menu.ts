import { MenuItem } from 'primeng/api';

export const MENU: MenuItem[] = [
  {
    label: 'Tableau de bord',
    icon: 'fa fa-home',
    routerLink: 'home',
    routerLinkActiveOptions: { exact: true },
    state: {
      permissions: [],
    }
  },
  {
    label: 'Paramètres',
    icon: 'fas fa-boxes',
    // routerLink: 'offices',
    // routerLinkActiveOptions: { exact: true },
    state: {
      permissions: [
      ],
    },
    items: [
      {
        routerLink: 'offices',
        label: 'Param 1',
        routerLinkActiveOptions: { exact: true },
      },
      {
        routerLink: 'installations',
        label: 'Params 2',
        routerLinkActiveOptions: { exact: true },
        state: {
          permissions: [],
        },
      },
    ],
  },
];
