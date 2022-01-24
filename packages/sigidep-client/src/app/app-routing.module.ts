import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallComponent } from '@pages/install/install.component';
import { AppInstallCheckGuard } from './guards/app-install-check.guard';
import { AuthGuard } from './guards/auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'install',
    canActivate: [AppInstallCheckGuard],
    component: InstallComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'carnets',
    loadChildren: () =>
      import('./pages/carnets/carnets.module').then((m) => m.CarnetsModule),
  },
  {
    path: 'grades',
    loadChildren: () =>
      import('./pages/grades/grades.module').then((m) => m.GradesModule),
  },
  {
    path: 'categories-agents',
    loadChildren: () =>
      import('./pages/categories-agents/categories-agents.module').then(
        (m) => m.CategoriesAgentsModule
      ),
  },

  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
