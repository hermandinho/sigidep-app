import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InstallComponent} from "@pages/install/install.component";

const routes: Routes = [
  /*{
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },*/
  {
    path: 'install',
    // canActivate: [AuthGuard],
    component: InstallComponent,
  }, {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then(
        (m) => m.LayoutModule,
      ),
  },
  /*{
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
