import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesProceduresComponent } from './types-procedures.component';

const routes: Routes = [{ path: '', component: TypesProceduresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesProceduresRoutingModule {}
