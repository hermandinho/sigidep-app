import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraitementDesLiquidationsMandatementComponent } from './traitement-des-liquidations-mandatement.component';
import { CreateTransmissionReceptionFormComponent } from '../../../components/create-transmission-reception-form/create-transmission-reception-form.component';

const routes: Routes = [
  {
    path: '',
    component: TraitementDesLiquidationsMandatementComponent,
    children: [
      {
        path: 'traitement-controle-regularite',
        component: CreateTransmissionReceptionFormComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraitementDesLiquidationsMandatementRoutingModule { }
