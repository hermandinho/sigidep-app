import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '@reducers/index';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '@environments/environment';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HomeModule} from "@pages/home/home.module";
import {InstallModule} from "@pages/install/install.module";
import {AppInstallCheckGuard} from "./guards/app-install-check.guard";
import {AuthModule} from "@pages/auth/auth.module";
import {AuthGuard} from "./guards/auth.guard";
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";
import {Effects} from "@effects/index";
import { EffectsModule } from '@ngrx/effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot(Effects),
    StoreDevtoolsModule.instrument({
      name: 'SIGIDEP Store',
      maxAge: 25,
      logOnly: environment.production,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'fr',
    }),
    HomeModule,
    InstallModule,
    AuthModule,
  ],
  providers: [
    AppInstallCheckGuard,
    AuthGuard,
    IsAuthenticatedGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
