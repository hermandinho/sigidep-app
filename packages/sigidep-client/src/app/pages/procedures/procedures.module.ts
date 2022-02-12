import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresComponent } from './procedures.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { CreateProcedureFormComponent } from '@components/create-procedure-form/create-procedure-form.component';

@NgModule({
  declarations: [ProceduresComponent, CreateProcedureFormComponent],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class ProceduresModule {}
