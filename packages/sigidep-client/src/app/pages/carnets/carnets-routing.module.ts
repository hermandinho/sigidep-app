import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarnetsComponent } from './carnets.component';

const routes: Routes = [{ path: '', component: CarnetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarnetsRoutingModule {}
