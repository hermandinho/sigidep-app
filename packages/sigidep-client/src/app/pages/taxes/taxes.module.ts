import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { CreateTaxeFormComponent } from '@components/create-taxe-form/create-taxe-form.component';

@NgModule({
  declarations: [TaxesComponent, CreateTaxeFormComponent],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class TaxesModule {}
