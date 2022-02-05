import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncoursRoutingModule } from './encours-routing.module';
import { EncoursComponent } from './encours.component';
import { CreateEncoursFormComponent } from '@components/create-encours-form/create-encours-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [EncoursComponent, CreateEncoursFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    EncoursRoutingModule,
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
    PanelModule,
  ],
})
export class EncoursModule {}
