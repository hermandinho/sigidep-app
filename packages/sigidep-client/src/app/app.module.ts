import { AccreditationsGestionnairesModule } from './pages/accreditations-gestionnaires/accreditations-gestionnaires.module';
import { ContribuablesBudgetairesModule } from './pages/contribuables-budgetaires/contribuables-budgetaires.module';
import { BanksAgencesModule } from './pages/banks-agences/banks-agences.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '@reducers/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeModule } from '@pages/home/home.module';
import { InstallModule } from '@pages/install/install.module';
import { AppInstallCheckGuard } from './guards/app-install-check.guard';
import { AuthModule } from '@pages/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { Effects } from '@effects/index';
import { EffectsModule } from '@ngrx/effects';
import { ExercisesModule } from '@pages/exercises/exercises.module';
import { RolesModule } from '@pages/roles/roles.module';
import { FinancialSourcesModule } from '@pages/financial-sources/financial-sources.module';
import { AdministrativeUnitsModule } from '@pages/administrative-units/administrative-units.module';
import { TechnicalSupervisorsModule } from '@pages/technical-supervisors/technical-supervisors.module';
import { ParagraphsModule } from '@pages/paragraphs/paragraphs.module';
import { SubProgramsModule } from '@pages/sub-programs/sub-programs.module';
import { ReferencePhysicalUnitsModule } from '@pages/reference-physical-units/reference-physical-units.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ContribuablesModule } from '@pages/contribuables/contribuables.module';
import { AgentsModule } from '@pages/agents/agents.module';
import { ArticlesModule } from '@pages/mercuriales/articles/articles.module';
import { RubriquesModule } from '@pages/mercuriales/rubrique/rubriques.module';
import { SousRubriquesModule } from '@pages/mercuriales/sous-rubrique/sous-rubriques.module';
import { CarnetsModule } from '@pages/carnets/carnets.module';
import { GradesModule } from '@pages/grades/grades.module';
import { CategoriesAgentsModule } from '@pages/categories-agents/categories-agents.module';
import { BaremesModule } from '@pages/baremes/baremes.module';
import { TypesProceduresModule } from '@pages/types-procedures/types-procedures.module';
import { PiecesJointesModule } from '@pages/pieces-jointes/pieces-jointes.module';
import { EncoursModule } from '@pages/encours/encours.module';
import { TaxesModule } from '@pages/taxes/taxes.module';
import { EngagementsModule } from '@pages/engagements/engagements.module';
import { ProceduresModule } from '@pages/procedures/procedures.module';
import { EngagementDecisionComponent } from './components/engagement-decision/engagement-decision.component';
import { RegionsModule } from './pages/regions/regions.module';
import { EngagementMissionComponent } from './components/engagement-mission/engagement-mission.component';

registerLocaleData(localeFr);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
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
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
    HomeModule,
    InstallModule,
    AuthModule,
    ExercisesModule,
    RolesModule,
    FinancialSourcesModule,
    AdministrativeUnitsModule,
    TechnicalSupervisorsModule,
    ParagraphsModule,
    SubProgramsModule,
    ReferencePhysicalUnitsModule,
    ContribuablesModule,
    BanksAgencesModule,
    ContribuablesBudgetairesModule,
    AgentsModule,
    ArticlesModule,
    RubriquesModule,
    SousRubriquesModule,
    CarnetsModule,
    GradesModule,
    CategoriesAgentsModule,
    ContribuablesBudgetairesModule,
    AccreditationsGestionnairesModule,
    BaremesModule,
    TypesProceduresModule,
    PiecesJointesModule,
    EncoursModule,
    TaxesModule,
    ProceduresModule,
    EngagementsModule,
    RegionsModule,
    TaxesModule,
    ProceduresModule,
    EngagementsModule,
  ],
  providers: [
    AppInstallCheckGuard,
    AuthGuard,
    IsAuthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
