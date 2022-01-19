import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSubProgramFormComponent } from '@components/create-sub-program-form/create-sub-program-form.component';
import { SubProgramsListComponent } from '@pages/sub-programs/sub-programs-list/sub-programs-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: SubProgramsListComponent },
  {
    path: 'new',
    pathMatch: 'prefix',
    component: CreateSubProgramFormComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'prefix',
    component: CreateSubProgramFormComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubProgramsRoutingModule {}
