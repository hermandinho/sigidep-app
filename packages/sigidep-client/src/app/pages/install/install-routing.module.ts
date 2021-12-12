import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'install',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/install/install.module').then((m) => m.InstallModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallRoutingModule {}
