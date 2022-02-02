import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaremesRoutingModule } from './baremes-routing.module';
import { BaremesComponent } from './baremes.component';
import { SharedModule } from '@modules/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { CreateBaremeFormComponent } from '@components/create-bareme-form/create-bareme-form.component';

@NgModule({
  declarations: [BaremesComponent, CreateBaremeFormComponent],
  imports: [
    CommonModule,
    BaremesRoutingModule,
    CommonModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
  ],
})
export class BaremesModule {}
