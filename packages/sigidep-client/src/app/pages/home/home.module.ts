import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SharedModule} from "@modules/shared.module";
import {CardModule} from "primeng/card";


@NgModule({
    declarations: [
      HomeComponent
    ],
    imports: [
        SharedModule,
        // CardModule,
    ]
})
export class HomeModule { }
