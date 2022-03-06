import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsComponent } from './engagements.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { CreateEngagementFormComponent } from '@components/create-engagement-form/create-engagement-form.component';

@NgModule({
  declarations: [EngagementsComponent, CreateEngagementFormComponent],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
  ],
})
export class EngagementsModule {}
