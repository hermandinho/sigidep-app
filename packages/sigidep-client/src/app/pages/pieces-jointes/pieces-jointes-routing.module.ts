import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiecesJointesComponent } from './pieces-jointes.component';

const routes: Routes = [{ path: '', component: PiecesJointesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiecesJointesRoutingModule {}
