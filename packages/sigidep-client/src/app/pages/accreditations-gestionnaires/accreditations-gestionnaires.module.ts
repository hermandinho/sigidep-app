import { SharedModule } from './../../modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { NgModule } from '@angular/core';
import { AccreditationsGestionnairesComponent } from './accreditations-gestionnaires.component';
import { AccreditationsGestionnairesFormComponent } from '@components/accreditations-gestionnaires-form/accreditations-gestionnaires-form.component';

@NgModule({
  declarations: [
    AccreditationsGestionnairesComponent,
    AccreditationsGestionnairesFormComponent,
  ],
  imports: [SharedModule, InputMaskModule],
})
export class AccreditationsGestionnairesModule {}
