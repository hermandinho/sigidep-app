import { NgModule } from '@angular/core';
import { RubriquesRoutingModule } from './rubriques-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { CreateRubriqueFormComponent } from '@components/create-rubrique-form/create-rubrique-form.component';
import { RubriqueComponent } from './rubrique.component';

const declarations = [RubriqueComponent, CreateRubriqueFormComponent];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    RubriquesRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class RubriquesModule {}
