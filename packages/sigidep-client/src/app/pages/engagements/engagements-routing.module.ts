import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngagementsComponent } from './engagements.component';

const routes: Routes = [{ path: '', component: EngagementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngagementsRoutingModule {}
