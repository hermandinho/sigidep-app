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
import { registerLocaleData, CommonModule } from '@angular/common';
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
import { RegionsModule } from './pages/regions/regions.module';
import { ConsultationsModule } from '@pages/consultations/consultations.module';
import { BonsEngagementsModule } from '@pages/bons-engagements/decision/bons-engagements.module';
import { BonsEngagementsCommandesModule } from '@pages/bons-engagements-commandes/bons-engagements-commandes.module';
import { TransmissionsReceptionsModule } from '@pages/listing-des-bordereaux/transmissions-receptions.module';
import { VisaEtTransmisssionModule } from '@pages/visa-et-transmisssion/visa-et-transmisssion.module';
import { EditionDesTCCComponent } from './pages/edition-des-tcc/edition-des-tcc.component';
import { ReceptionBordereauxModule } from '@pages/reception-bordereaux/reception-bordereaux.module';
import { OperationDeControleModule } from '@pages/operation-de-controle/operation-de-controle.module';
import { EditionDesTCCModule } from '@pages/edition-des-tcc/edition-des-tcc.module';
import { VirementsModule } from '@pages/virements/virements.module';
import { ModeleVirementModule } from '@pages/modele-virement/modele-virement.module';
import { ShowVirementMessageComponent } from './components/show-virement-message/show-virement-message.component';
import { ControleConformiteModule } from '@pages/controle-conformite/controle-conformite.module';
import { ListingTransmissionLiquidationModule } from '@pages/listing-transmission-liquidation/listing-transmission-liquidation.module';
import { TransmissionLiquidationModule } from '@pages/transmission-liquidation/transmission-liquidation.module';
import { PrintVirementComponent } from './components/print-virement/print-virement.component';


registerLocaleData(localeFr);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, PrintVirementComponent],
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
    CommonModule,
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
    ConsultationsModule,
    BonsEngagementsModule,
    BonsEngagementsCommandesModule,
    TransmissionsReceptionsModule,
    VisaEtTransmisssionModule,
    ReceptionBordereauxModule,
    OperationDeControleModule,
    EditionDesTCCModule,
    VirementsModule,
    ModeleVirementModule,
    TransmissionsReceptionsModule,
    ControleConformiteModule,
    ListingTransmissionLiquidationModule,
    TransmissionLiquidationModule

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
export class AppModule { }
