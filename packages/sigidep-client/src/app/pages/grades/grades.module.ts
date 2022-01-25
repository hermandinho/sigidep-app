import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { CreateGradeFormComponent } from '@components/create-grade-form/create-grade-form.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [GradesComponent, CreateGradeFormComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
    GradesRoutingModule,
  ],
})
export class GradesModule {}
