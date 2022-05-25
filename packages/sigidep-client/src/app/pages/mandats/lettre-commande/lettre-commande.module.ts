import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LettreCommandeRoutingModule } from './lettre-commande-routing.module';
import { LettreCommandeComponent } from './lettre-commande.component';


@NgModule({
  declarations: [
    LettreCommandeComponent
  ],
  imports: [
    CommonModule,
    LettreCommandeRoutingModule
  ]
})
export class LettreCommandeModule { }
