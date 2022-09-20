import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraitementDesLiquidationsMandatementRoutingModule } from './traitement-des-liquidations-mandatement-routing.module';
import { TraitementDesLiquidationsMandatementComponent } from './traitement-des-liquidations-mandatement.component';
import { SharedModule } from '@modules/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { EditerRapportTraitementLiquidationMandatementComponent } from '../../../components/editer-rapport-traitement-liquidation-mandatement/editer-rapport-traitement-liquidation-mandatement.component';
import { PrintMandatPaiementComponent } from '../../../components/print-mandat-paiement/print-mandat-paiement.component';


@NgModule({
  declarations: [
    TraitementDesLiquidationsMandatementComponent,
    EditerRapportTraitementLiquidationMandatementComponent,
    PrintMandatPaiementComponent
  ],
  imports: [
    CommonModule,
    TraitementDesLiquidationsMandatementRoutingModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    ToastModule,
    RadioButtonModule,
    FormsModule,
    MultiSelectModule,
    MenuModule,
    RippleModule,
    CardModule,
    TreeTableModule,
  ]
})
export class TraitementDesLiquidationsMandatementModule { }
