import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesProceduresRoutingModule } from './types-procedures-routing.module';
import { TypesProceduresComponent } from './types-procedures.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { CreateTypeProcedureFormComponent } from '@components/create-type-procedure-form/create-type-procedure-form.component';

@NgModule({
  declarations: [TypesProceduresComponent, CreateTypeProcedureFormComponent],
  imports: [
    CommonModule,
    TypesProceduresRoutingModule,
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class TypesProceduresModule {}
