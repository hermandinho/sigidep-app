import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingTransmissionLiquidationRoutingModule } from './listing-transmission-liquidation-routing.module';
import { ListingTransmissionLiquidationComponent } from './listing-transmission-liquidation.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '@modules/shared.module';


@NgModule({
  declarations: [
    ListingTransmissionLiquidationComponent
  ],
  imports: [
    CommonModule,
    ListingTransmissionLiquidationRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
    RadioButtonModule,
    FormsModule,
    MultiSelectModule,
    MenuModule,
    RippleModule,
    CardModule,
    TreeTableModule,
  ]
})
export class ListingTransmissionLiquidationModule { }
