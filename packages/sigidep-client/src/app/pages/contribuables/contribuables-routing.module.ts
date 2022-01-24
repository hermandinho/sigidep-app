import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContribuablesComponent } from './contribuables.component';

const routes: Routes = [{ path: '', component: ContribuablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribuablesRoutingModule {}
