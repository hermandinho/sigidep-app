import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsComponent } from './engagements.component';

import { CreateEngagementFormComponent } from '@components/create-engagement-form/create-engagement-form.component';
import { EngagementContainerComponent } from '@components/engagement-container/engagement-container.component';
import { EngagementCommandeComponent } from '@components/engagement-commande/engagement-commande.component';
import { EngagementDecisionComponent } from '@components/engagement-decision/engagement-decision.component';

import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { EngagementMissionComponent } from '@components/engagement-mission/engagement-mission.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationEngagementComponent } from '@components/reservation-engagement/reservation-engagement.component';
@NgModule({
  declarations: [
    EngagementsComponent,
    EngagementDecisionComponent,
    EngagementContainerComponent,
    CreateEngagementFormComponent,
    EngagementCommandeComponent,
    EngagementMissionComponent,
    ReservationEngagementComponent,
  ],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
    SharedModule,
    CheckboxModule,
    ToastModule,
    TabViewModule,
    PanelModule,
    RadioButtonModule,
    FormsModule,
    MultiSelectModule,
    MenuModule,
    RippleModule,
  ],
})
export class EngagementsModule {}
