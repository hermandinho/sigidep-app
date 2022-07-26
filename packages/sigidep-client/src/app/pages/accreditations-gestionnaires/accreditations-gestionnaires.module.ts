import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { NgModule } from '@angular/core';
import { AccreditationsGestionnairesComponent } from './accreditations-gestionnaires.component';
import { AccreditationsGestionnairesFormComponent } from '@components/accreditations-gestionnaires-form/accreditations-gestionnaires-form.component';
import { ImputationsComponent } from './imputations/imputations.component';

@NgModule({
  declarations: [
    AccreditationsGestionnairesComponent,
    AccreditationsGestionnairesFormComponent,
    ImputationsComponent,
  ],
  imports: [SharedModule, InputMaskModule, FormsModule],
})
export class AccreditationsGestionnairesModule {}
