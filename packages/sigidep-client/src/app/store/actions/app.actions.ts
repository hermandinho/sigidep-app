import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

export const SetAppBreadcrumb = createAction(
  '[APP] Set breadcrumb',
  props<{ breadcrumb: MenuItem[] }>()
);
