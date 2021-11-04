import { NgModule } from '@angular/core';

import { TechnicalSupervisorsRoutingModule } from './technical-supervisors-routing.module';
import { TechnicalSupervisorsComponent } from './technical-supervisors.component';
import { SharedModule } from '@modules/shared.module';
import { CreateTechnicalSupervisorFormComponent } from '@components/create-technical-supervisor-form/create-technical-supervisor-form.component';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    TechnicalSupervisorsComponent,
    CreateTechnicalSupervisorFormComponent,
  ],
  imports: [SharedModule, TechnicalSupervisorsRoutingModule, InputMaskModule],
})
export class TechnicalSupervisorsModule {}
