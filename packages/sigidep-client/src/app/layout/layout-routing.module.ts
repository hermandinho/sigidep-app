import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '@pages/home/home.component';
import { ExercisesComponent } from '@pages/exercises/exercises.component';
import { PermissionsGuard } from '../guards/permissions.guard';
import { MenuPermissions } from './sidebar/menu';
import { RolesComponent } from '@pages/roles/roles.component';
import { FinancialSourcesComponent } from '@pages/financial-sources/financial-sources.component';
import { AdministrativeUnitsComponent } from '@pages/administrative-units/administrative-units.component';
import { TechnicalSupervisorsComponent } from '@pages/technical-supervisors/technical-supervisors.component';
import { ParagraphsComponent } from '@pages/paragraphs/paragraphs.component';
import { SubProgramsComponent } from '@pages/sub-programs/sub-programs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        // canActivate: [PermissionsGuard],
        data: {
          permissions: [],
        },
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.exercises_menu],
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.roles_menu],
        },
      },
      {
        path: 'financial-sources',
        component: FinancialSourcesComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.financial_sources],
        },
      },
      {
        path: 'administrative-units',
        component: AdministrativeUnitsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.administrative_units],
        },
      },
      {
        path: 'technical-supervisors',
        component: TechnicalSupervisorsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.technical_supervisor],
        },
      },
      {
        path: 'paragraphs',
        component: ParagraphsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.paragraphs],
        },
      },
      /*{
        path: 'sub-programs',
        component: SubProgramsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.sub_programs],
        }
      }*/ {
        path: 'sub-programs',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.sub_programs],
        },
        loadChildren: () =>
          import('../pages/sub-programs/sub-programs.module').then(
            (m) => m.SubProgramsModule
          ),
      },
      /*{
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full'
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
