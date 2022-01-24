import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubriqueComponent } from './rubrique.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RubriqueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RubriquesRoutingModule {}
