import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TabViewModule } from 'primeng/tabview';

import { BonsEngagementsCommandesRoutingModule } from './bons-engagements-commandes-routing.module';
import { BonsEngagementsCommandesComponent } from './bons-engagements-commandes.component';

@NgModule({
  declarations: [BonsEngagementsCommandesComponent],
  imports: [
    CommonModule,
    BonsEngagementsCommandesRoutingModule,
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
    TabViewModule,
    PanelModule,
  ],
})
export class BonsEngagementsCommandesModule {}
