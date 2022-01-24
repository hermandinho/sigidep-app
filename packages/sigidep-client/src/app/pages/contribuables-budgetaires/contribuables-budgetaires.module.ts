import { InputMaskModule } from 'primeng/inputmask';
import { CreateContribuableBudgetaireFormComponent } from './../../components/create-contribuable-budgetaire-form/create-contribuable-budgetaire-form.component';
import { SharedModule } from '@modules/shared.module';
import { NgModule } from '@angular/core';
import { ContribuablesBudgetairesComponent } from './contribuables-budgetaires.component';



@NgModule({
  declarations: [
    ContribuablesBudgetairesComponent, CreateContribuableBudgetaireFormComponent
  ],
  imports: [
    SharedModule, InputMaskModule
  ]
})
export class ContribuablesBudgetairesModule { }
