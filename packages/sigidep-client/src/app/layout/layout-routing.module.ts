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
import { AgentsComponent } from '@pages/agents/agents.component';
import { ArticlesComponent } from '@pages/mercuriales/articles/articles.component';
import { RubriqueComponent } from '@pages/mercuriales/rubrique/rubrique.component';
import { SousRubriqueComponent } from '@pages/mercuriales/sous-rubrique/sous-rubrique.component';
import { CarnetsComponent } from '@pages/carnets/carnets.component';
import { GradesComponent } from '@pages/grades/grades.component';
import { CategoriesAgentsComponent } from '@pages/categories-agents/categories-agents.component';
import { AccreditationsGestionnairesComponent } from '@pages/accreditations-gestionnaires/accreditations-gestionnaires.component';
import { BaremesComponent } from '@pages/baremes/baremes.component';
import { TypesProceduresComponent } from '@pages/types-procedures/types-procedures.component';
import { PiecesJointesComponent } from '@pages/pieces-jointes/pieces-jointes.component';
import { EncoursComponent } from '@pages/encours/encours.component';
import { EngagementsComponent } from '@pages/engagements/engagements.component';
import { ProceduresComponent } from '@pages/procedures/procedures.component';
import { TaxesComponent } from '@pages/taxes/taxes.component';

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
      {
        path: 'agents',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.agents],
        },
        component: AgentsComponent,
      },
      {
        path: 'articles',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.articles],
        },
        component: ArticlesComponent,
      },
      {
        path: 'rubriques',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.articles],
        },
        component: RubriqueComponent,
      },
      {
        path: 'sous-rubriques',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.articles],
        },
        component: SousRubriqueComponent,
      },
      {
        path: 'carnets',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.carnetsMandats],
        },
        component: CarnetsComponent,
      },
      {
        path: 'grades',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.agents],
        },
        component: GradesComponent,
      },
      {
        path: 'categories-agents',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.agents],
        },
        component: CategoriesAgentsComponent,
      },
      {
        path: 'accreditations-gestionnaires',
        component: AccreditationsGestionnairesComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [],
        },
      },
      {
        path: 'baremes',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.baremes],
        },
        component: BaremesComponent,
      },
      {
        path: 'types-procedures',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.typesProcedures],
        },
        component: TypesProceduresComponent,
      },
      {
        path: 'pieces-jointes',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.piecesJointes],
        },
        component: PiecesJointesComponent,
      },
      {
        path: 'encours',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.encours],
        },
        component: EncoursComponent,
      },
      {
        path: 'encours',
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.encours],
        },
        loadChildren: () =>
          import('../pages/encours/encours.module').then(
            (m) => m.EncoursModule
          ),
      },
      {
        path: 'taxes',
        component: TaxesComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.taxes],
        },
        loadChildren: () =>
          import('../pages/taxes/taxes.module').then((m) => m.TaxesModule),
      },
      {
        path: 'procedures',
        component: ProceduresComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [...MenuPermissions.procedures],
        },
        loadChildren: () =>
          import('../pages/procedures/procedures.module').then(
            (m) => m.ProceduresModule
          ),
      },
      {
        path: 'engagements',
        canActivate: [AuthGuard],
        component: EngagementsComponent,
        data: {
          permissions: [...MenuPermissions.engagements],
        },
        loadChildren: () =>
          import('../pages/engagements/engagements.module').then(
            (m) => m.EngagementsModule
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
