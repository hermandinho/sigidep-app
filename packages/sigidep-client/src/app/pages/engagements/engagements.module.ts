import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsComponent } from './engagements.component';

<<<<<<< HEAD
import { CreateEngagementFormComponent } from '@components/create-engagement-form/create-engagement-form.component';
import { EngagementContainerComponent } from '@components/engagement-container/engagement-container.component';
import { EngagementCommandeComponent } from '@components/engagement-commande/engagement-commande.component';
import { EngagementDecisionComponent } from '@components/engagement-decision/engagement-decision.component';

import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    EngagementsComponent,
    EngagementDecisionComponent,
    EngagementContainerComponent,
    CreateEngagementFormComponent,
    EngagementCommandeComponent,
  ],
=======
>>>>>>> 50ce425 (mise à jour des attributs de commande + formulaire)
import { CreateEngagementFormComponent } from '@components/create-engagement-form/create-engagement-form.component';
import { EngagementContainerComponent } from '@components/engagement-container/engagement-container.component';
import { EngagementCommandeComponent } from '@components/engagement-commande/engagement-commande.component';
import { EngagementDecisionComponent } from '@components/engagement-decision/engagement-decision.component';

import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    EngagementsComponent,
    EngagementDecisionComponent,
    EngagementContainerComponent,
    CreateEngagementFormComponent,
    EngagementCommandeComponent,
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
  ],
})
export class EngagementsModule {}
