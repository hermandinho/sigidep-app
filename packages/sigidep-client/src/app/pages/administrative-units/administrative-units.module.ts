import { NgModule } from '@angular/core';

import { AdministrativeUnitsRoutingModule } from './administrative-units-routing.module';
import { CreateAdministrativeUnitFormComponent } from '@components/create-administrative-unit-form/create-administrative-unit-form.component';
import { AdministrativeUnitsComponent } from './administrative-units.component';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    CreateAdministrativeUnitFormComponent,
    AdministrativeUnitsComponent,
  ],
  imports: [SharedModule, AdministrativeUnitsRoutingModule, InputMaskModule],
})
export class AdministrativeUnitsModule {}
