import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import {PanelMenuModule} from "primeng/panelmenu";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {AppService} from "@services/app.service";
import {BaseComponent} from "@components/base.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {LocalStorageService} from "@services/local-storage.service";
import {AuthInterceptor} from "../interceptors";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";

const declarations = [
  BaseComponent,
];

const shared = [
  CommonModule,
  AvatarModule,
  DividerModule,
  PanelMenuModule,
  ScrollPanelModule,
  ButtonModule,
  CardModule,
  InputTextModule,
  InputTextareaModule,
  ReactiveFormsModule,
  MessagesModule,
];
@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
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
    }),
    CardModule,
  ],
  exports: [
    ...shared,
    TranslateModule,
  ],
  providers: [
    AppService,
    LocalStorageService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    MessageService,
  ],
})
export class SharedModule { }
