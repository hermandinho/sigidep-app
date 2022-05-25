import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraisDeReleveRoutingModule } from './frais-de-releve-routing.module';
import { FraisDeReleveComponent } from './frais-de-releve.component';


@NgModule({
  declarations: [
    FraisDeReleveComponent
  ],
  imports: [
    CommonModule,
    FraisDeReleveRoutingModule
  ]
})
export class FraisDeReleveModule { }
