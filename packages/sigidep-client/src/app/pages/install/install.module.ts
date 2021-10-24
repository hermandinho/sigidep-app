import {NgModule} from '@angular/core';
import {InstallComponent} from '@pages/install/install.component';
import {SharedModule} from "@modules/shared.module";
import {StructuresService} from "@services/structures.service";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    InstallComponent
  ],
  imports: [
    SharedModule,
    ToastModule,
  ],
  providers: [
    StructuresService,
  ]
})
export class InstallModule { }
