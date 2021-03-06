import { NgModule } from '@angular/core';

import { ContribuablesRoutingModule } from './contribuables-routing.module';
import { ContribuablesComponent } from './contribuables.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '@modules/shared.module';
import { CreateContribuableFormComponent } from '@components/create-contribuable-form/create-contribuable-form.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ContribuablesComponent, CreateContribuableFormComponent],
  imports: [
    SharedModule,
    CheckboxModule,
    ContribuablesRoutingModule,
    InputMaskModule,
    ToastModule,
  ],
})
export class ContribuablesModule {}
