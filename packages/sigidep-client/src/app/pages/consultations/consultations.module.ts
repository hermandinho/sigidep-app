import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationsRoutingModule } from './consultations-routing.module';
import { ConsultationsComponent } from './consultations.component';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';

import { TreeTableModule } from 'primeng/treetable';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EtatImputationComponent } from '@components/etat-imputation/etat-imputation.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [ConsultationsComponent, EtatImputationComponent],
  imports: [
    CommonModule,
    ConsultationsRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
    ProgressSpinnerModule,
    TreeTableModule,
    PanelModule,
    CardModule,
    NgxPrintModule,
  ],
})
export class ConsultationsModule {}
