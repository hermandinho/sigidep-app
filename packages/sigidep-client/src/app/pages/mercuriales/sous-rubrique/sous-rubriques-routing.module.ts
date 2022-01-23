import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SousRubriqueComponent } from './sous-rubrique.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SousRubriqueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SousRubriquesRoutingModule {}
