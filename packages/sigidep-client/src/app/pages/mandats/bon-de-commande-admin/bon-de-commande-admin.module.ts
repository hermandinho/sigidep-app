import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonDeCommandeAdminRoutingModule } from './bon-de-commande-admin-routing.module';
import { BonDeCommandeAdminComponent } from './bon-de-commande-admin.component';


@NgModule({
  declarations: [
    BonDeCommandeAdminComponent
  ],
  imports: [
    CommonModule,
    BonDeCommandeAdminRoutingModule
  ]
})
export class BonDeCommandeAdminModule { }
