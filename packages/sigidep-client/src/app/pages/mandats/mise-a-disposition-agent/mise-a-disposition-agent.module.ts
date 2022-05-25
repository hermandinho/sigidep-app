import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiseADispositionAgentRoutingModule } from './mise-a-disposition-agent-routing.module';
import { MiseADispositionAgentComponent } from './mise-a-disposition-agent.component';


@NgModule({
  declarations: [
    MiseADispositionAgentComponent
  ],
  imports: [
    CommonModule,
    MiseADispositionAgentRoutingModule
  ]
})
export class MiseADispositionAgentModule { }
