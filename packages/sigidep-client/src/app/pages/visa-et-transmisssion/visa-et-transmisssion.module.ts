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
import { ConstitutionBordereauFormComponent } from '@components/constitution-bordereau-form/constitution-bordereau-form.component';
import { CoordonneesBordereauFormComponent } from '@components/coordonnees-bordereau-form/coordonnees-bordereau-form.component';
import { PrintBordereauxComponent } from '@components/print-bordereaux/print-bordereaux.component';
import { CreateTransmissionReceptionFormComponent } from '@components/create-transmission-reception-form/create-transmission-reception-form.component';


@NgModule({
  declarations: [
    VisaEtTransmisssionComponent,
    ConstitutionBordereauFormComponent,
    CoordonneesBordereauFormComponent,
    PrintBordereauxComponent,
    CreateTransmissionReceptionFormComponent
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
