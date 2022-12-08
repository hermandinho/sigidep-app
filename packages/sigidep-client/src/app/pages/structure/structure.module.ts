import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { StructureComponent } from './structure.component';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { CreateStructureComponent } from '../../components/create-structure/create-structure.component';


@NgModule({
  declarations: [StructureComponent,CreateStructureComponent],
  imports: [
    CommonModule,
    StructureRoutingModule,
    SharedModule,
    InputMaskModule,
    ToastModule,
    FormsModule,
    CardModule,
  ]
})
export class StructureModule { }
