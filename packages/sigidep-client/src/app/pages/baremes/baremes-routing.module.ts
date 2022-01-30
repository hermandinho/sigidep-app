import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaremesComponent } from './baremes.component';

const routes: Routes = [{ path: '', component: BaremesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaremesRoutingModule {}
