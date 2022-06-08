import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandatMissionsComponent } from './mandat-missions.component';
import { MandatMissionssRoutingModule } from './mandat-missions-routing.module';
import { SharedModule } from '@modules/shared.module';
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

@NgModule({
  declarations: [MandatMissionsComponent],
  imports: [
    CommonModule,
    MandatMissionssRoutingModule,
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
export class MandatMissionsModule {}
