import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesAgentsComponent } from './categories-agents.component';

const routes: Routes = [{ path: '', component: CategoriesAgentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesAgentsRoutingModule {}
