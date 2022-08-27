import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisaEtTransmisssionRoutingModule } from './visa-et-transmisssion-routing.module';
import { VisaEtTransmisssionComponent } from './visa-et-transmisssion.component';
import { SharedModule } from '@modules/shared.module';
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

@NgModule({
  declarations: [
    VisaEtTransmisssionComponent
  ],
  imports: [
    CommonModule,
    VisaEtTransmisssionRoutingModule,
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
export class VisaEtTransmisssionModule { }
