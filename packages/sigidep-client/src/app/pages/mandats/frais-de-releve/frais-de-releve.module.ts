import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraisDeReleveRoutingModule } from './frais-de-releve-routing.module';
import { FraisDeReleveComponent } from './frais-de-releve.component';

import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { SharedModule } from '@modules/shared.module';
@NgModule({
  declarations: [
    FraisDeReleveComponent
  ],
  imports: [
    CommonModule,
    FraisDeReleveRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
    RadioButtonModule,
    FormsModule,
    MultiSelectModule,
    MenuModule,
    RippleModule,
    PanelModule,
    CardModule,
    TreeTableModule,
  ]
})
export class FraisDeReleveModule { }
