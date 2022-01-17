import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { NgModule } from '@angular/core';

import { BanksAgencesRoutingModule } from './banks-agences-routing.module';
import { BanksAgencesComponent } from './banks-agences.component';
import { CreateAgenceBankFormComponent } from '@components/create-agence-bank-form/create-agence-bank-form.component';
import { CreateBankFormComponent } from '@components/create-bank-form/create-bank-form.component';

@NgModule({
  declarations: [
    BanksAgencesComponent,
    CreateAgenceBankFormComponent,
    CreateBankFormComponent,
  ],
  imports: [SharedModule, BanksAgencesRoutingModule, InputMaskModule],
})
export class BanksAgencesModule {}
