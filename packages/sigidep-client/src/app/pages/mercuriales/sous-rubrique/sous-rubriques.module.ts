import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { SousRubriquesRoutingModule } from './sous-rubriques-routing.module';
import { SousRubriqueComponent } from './sous-rubrique.component';
import { CreateSousRubriqueFormComponent } from '@components/create-sous-rubrique-form/create-sous-rubrique-form.component';

const declarations = [SousRubriqueComponent, CreateSousRubriqueFormComponent];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    SousRubriquesRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class SousRubriquesModule {}
