import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcheRoutingModule } from './marche-routing.module';
import { MarcheComponent } from './marche.component';


@NgModule({
  declarations: [
    MarcheComponent
  ],
  imports: [
    CommonModule,
    MarcheRoutingModule
  ]
})
export class MarcheModule { }
