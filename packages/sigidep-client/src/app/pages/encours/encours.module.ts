import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncoursRoutingModule } from './encours-routing.module';
import { EncoursComponent } from './encours.component';
import { CreateEncoursFormComponent } from '@components/create-encours-form/create-encours-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { DisplayEncoursItemComponent } from '@components/display-encours-item/display-encours-item.component';
import { DisplayEncoursStatisticsComponent } from '@components/display-encours-statistics/display-encours-statistics.component';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    EncoursComponent,
    CreateEncoursFormComponent,
    DisplayEncoursItemComponent,
    DisplayEncoursStatisticsComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TreeTableModule,
    EncoursRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
    PanelModule,
  ],
})
export class EncoursModule {}
