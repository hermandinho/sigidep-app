import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { CreateAgentFormComponent } from '@components/create-agent-form/create-agent-form.component';

@NgModule({
  declarations: [AgentsComponent, CreateAgentFormComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
  ],
})
export class AgentsModule {}
