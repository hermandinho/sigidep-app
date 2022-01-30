import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiecesJointesRoutingModule } from './pieces-jointes-routing.module';
import { PiecesJointesComponent } from './pieces-jointes.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '@modules/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { CreatePieceJointeFormComponent } from '@components/create-piece-jointe-form/create-piece-jointe-form.component';

@NgModule({
  declarations: [PiecesJointesComponent, CreatePieceJointeFormComponent],
  imports: [
    CommonModule,
    PiecesJointesRoutingModule,
    CommonModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class PiecesJointesModule {}
