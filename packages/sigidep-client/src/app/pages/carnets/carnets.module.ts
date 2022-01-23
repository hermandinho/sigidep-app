import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarnetsRoutingModule } from './carnets-routing.module';
import { CarnetsComponent } from './carnets.component';
import { SharedModule } from '@modules/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CreateCarnetFormComponent } from '@components/create-carnet-form/create-carnet-form.component';

@NgModule({
  declarations: [CarnetsComponent, CreateCarnetFormComponent],
  imports: [
    CommonModule,
    CarnetsRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
  ],
})
export class CarnetsModule {}
