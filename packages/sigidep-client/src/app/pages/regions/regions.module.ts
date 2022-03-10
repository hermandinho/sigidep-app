import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { RegionsComponent } from './regions.component';
import { RegionsRoutingModule } from './regions-routing.module';
import { CreateRegionsFormComponent } from '@components/create-regions-form/create-regions-form.component';

@NgModule({
  declarations: [RegionsComponent, CreateRegionsFormComponent],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    ProgressSpinnerModule,
    TreeTableModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
    CardModule,
    PanelModule,
  ],
})
export class RegionsModule {}
