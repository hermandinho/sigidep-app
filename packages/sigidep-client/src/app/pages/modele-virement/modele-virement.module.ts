import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeleVirementComponent } from './modele-virement.component';
import { SharedModule } from '@modules/shared.module';



@NgModule({
  declarations: [
    ModeleVirementComponent,
  ],
  imports: [
    SharedModule, CommonModule,
  ]
})
export class ModeleVirementModule { }
