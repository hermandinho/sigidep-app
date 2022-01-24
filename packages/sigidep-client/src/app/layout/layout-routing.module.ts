import { ContribuablesBudgetairesComponent } from './../pages/contribuables-budgetaires/contribuables-budgetaires.component';
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
import { AuthGuard } from '../guards/auth.guard';
import { ReferencePhysicalUnitsComponent } from '@pages/reference-physical-units/reference-physical-units.component';
import { ContribuablesComponent } from '@pages/contribuables/contribuables.component';
import { BanksAgencesComponent } from '@pages/banks-agences/banks-agences.component';

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
      {
        path: 'reference-physical-units',
        component: ReferencePhysicalUnitsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.referencePhysicalUnits],
        },
      },
      /*{
        path: 'sub-programs',
        component: SubProgramsComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.sub_programs],
        }
      }*/
      {
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
      {
        path: 'contribuables',
        component: ContribuablesComponent,
        canActivate: [AuthGuard, PermissionsGuard],
        data: {
          permissions: [...MenuPermissions.contribuables],
        },
      },
      {
        path: 'banks-agences',
        canActivate: [AuthGuard],
        data: {
          permissions: [],
        },
        component: BanksAgencesComponent,
      },
      {
        path: 'contribuables-budgetaires',
        component: ContribuablesBudgetairesComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [],
        },
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
