import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import {PanelMenuModule} from "primeng/panelmenu";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {AppService} from "../services/app.service";
import {BaseComponent} from "../components/base.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {LocalStorageService} from "../services/local-storage.service";

const declarations = [
  BaseComponent,
];

const shared = [
  AvatarModule,
  DividerModule,
  PanelMenuModule,
  ScrollPanelModule,
];
@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    CommonModule,
    ...shared,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'fr',
      // isolate: true,
      // extend: true,
    })
  ],
  exports: [
    ...shared,
    TranslateModule
  ],
  providers: [
    AppService,
    LocalStorageService,
  ],
})
export class SharedModule { }
