import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsComponent } from './consultations.component';

const routes: Routes = [{ path: '', component: ConsultationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule { }
