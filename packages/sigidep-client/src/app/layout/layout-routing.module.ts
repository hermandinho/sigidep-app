import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {HomeComponent} from "@pages/home/home.component";
import {ExercisesComponent} from "@pages/exercises/exercises.component";
import {PermissionsGuard} from "../guards/permissions.guard";
import {MenuPermissions} from "./sidebar/menu";
import {RolesComponent} from "@pages/roles/roles.component";
import {FinancialSourcesComponent} from "@pages/financial-sources/financial-sources.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomeComponent,
        // canActivate: [PermissionsGuard],
        data: {
          permissions: [
          ],
        }
      }, {
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.exercises_menu],
        }
      }, {
        path: 'roles',
        component: RolesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.roles_menu],
        }
      }, {
        path: 'financial-sources',
        component: FinancialSourcesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.financial_sources],
        }
      },
      /*{
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full'
      },*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
