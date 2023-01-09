import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransmissionsReceptionsRoutingModule } from './transmissions-receptions-routing.module';
import { TransmissionsReceptionsComponent } from './transmissions-receptions.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { SharedModule } from '@modules/shared.module';


@NgModule({
  declarations: [
    TransmissionsReceptionsComponent
  ],
  imports: [
    CommonModule,
    TransmissionsReceptionsRoutingModule,
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
export class TransmissionsReceptionsModule { }
