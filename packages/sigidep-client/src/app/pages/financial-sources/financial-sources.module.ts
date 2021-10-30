import {NgModule} from '@angular/core';

import {FinancialSourcesRoutingModule} from './financial-sources-routing.module';
import {FinancialSourcesComponent} from './financial-sources.component';
import {SharedModule} from "@modules/shared.module";
import { CreateFinancialSourceFormComponent } from '@components/create-financial-source-form/create-financial-source-form.component';
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
  declarations: [
    FinancialSourcesComponent,
    CreateFinancialSourceFormComponent
  ],
    imports: [
        SharedModule,
        FinancialSourcesRoutingModule,
        InputMaskModule
    ]
})
export class FinancialSourcesModule { }
