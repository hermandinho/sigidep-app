import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencePhysicalUnitsRoutingModule } from './reference-physical-units-routing.module';
import { ReferencePhysicalUnitsComponent } from './reference-physical-units.component';
import { CreateReferencePhysicalUnitsFormComponent } from '@components/create-reference-physical-units-form/create-reference-physical-units-form.component';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    ReferencePhysicalUnitsComponent,
    CreateReferencePhysicalUnitsFormComponent,
  ],
  imports: [
    CommonModule,
    ReferencePhysicalUnitsRoutingModule,
    SharedModule,
    InputMaskModule,
  ],
})
export class ReferencePhysicalUnitsModule {}
