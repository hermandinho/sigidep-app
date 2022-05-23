import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandatsRoutingModule } from './mandats-routing.module';
import { MandatsComponent } from './mandats.component';
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
import { EngagementFormComponent } from '@components/engagement-form/engagement-form.component';
import { MandatFormComponent } from '@components/mandat-form/mandat-form.component';
import { PerformFormComponent } from '@components/perform-form/perform-form.component';
import { CreateMandatFormComponent } from '@components/create-mandat-form/create-mandat-form.component';
import { PrintEngagementMandatPrimeComponent } from '@components/print-engagement-mandat-prime/print-engagement-mandat-prime.component';

@NgModule({
  declarations: [
    MandatsComponent,
    EngagementFormComponent,
    MandatFormComponent,
    PerformFormComponent,
    CreateMandatFormComponent,
    PrintEngagementMandatPrimeComponent,
  ],
  imports: [
    CommonModule,
    MandatsRoutingModule,
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
  ],
})
export class MandatsModule {}
