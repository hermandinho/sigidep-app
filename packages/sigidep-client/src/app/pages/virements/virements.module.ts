import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirementsComponent } from './virements.component';
import { SharedModule } from '@modules/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VirementsComponent
  ],
  imports: [
    SharedModule, CommonModule, FormsModule
  ]
})
export class VirementsModule { }
