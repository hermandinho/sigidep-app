import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppService } from '@services/app.service';
import { BaseComponent } from '@components/base.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthInterceptor } from '../interceptors';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { UserService } from '@services/user.service';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckPermissionsDirective } from '../directives/check-permissions.directive';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogsService } from '@services/dialogs.service';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ApisService } from '@services/apis.service';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { I18nFormFieldComponent } from '@components/i18n-form-field/i18n-form-field.component';
import { StepsModule } from 'primeng/steps';
import { EditorModule } from 'primeng/editor';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { FieldsetModule } from 'primeng/fieldset';
import { NgxPrintModule } from 'ngx-print';
import { EngagementFormComponent } from '@components/engagement-form/engagement-form.component';
import { BonEngagementFormComponent } from '@components/bon-engagement-form/bon-engagement-form.component';
import { PerformFormComponent } from '@components/perform-form/perform-form.component';
import { CreateBonEngagementFormComponent } from '@components/create-bon-engagement-form/create-bon-engagement-form.component';
import { PrintBonEngagementPrimeComponent } from '@components/print-bon-engagement-prime/print-bon-engagement-prime.component';
import { CreateSituationTraitementComponent } from '@components/create-situation-traitement/create-situation-traitement.component';
import { CreateBonEngagementMissionFormComponent } from '@components/create-bon-engagement-mission-form/create-bon-engagement-mission-form.component';
import { EngagementMissionFormComponent } from '@components/engagement-mission-form/engagement-mission-form.component';
import { FactureComponent } from '@components/facture/facture.component';
import { CreateTransmissionReceptionFormComponent } from '@components/create-transmission-reception-form/create-transmission-reception-form.component';
import { ConstitutionBordereauFormComponent } from '@components/constitution-bordereau-form/constitution-bordereau-form.component';
import { CoordonneesBordereauFormComponent } from '@components/coordonnees-bordereau-form/coordonnees-bordereau-form.component';
import { PrintBordereauxComponent } from '@components/print-bordereaux/print-bordereaux.component';
import { CreateMotifRejetFormComponent } from '@components/create-motif-rejet-form/create-motif-rejet-form.component';
import { ModelVirementFormComponent } from '@components/model-virement-form/model-virement-form.component';
import { VirementFormComponent } from '@components/virement-form/virement-form.component';
import { DetailsVirementFormComponent } from '@components/details-virement-form/details-virement-form.component';
import { VirementBodyFormComponent } from '@components/virement-body-form/virement-body-form.component';
import { ShowVirementMessageComponent } from '@components/show-virement-message/show-virement-message.component';
import { VirementValidationFormComponent } from '@components/virement-validation-form/virement-validation-form.component';
import { CreateTraitementLiquidationMandatementComponent } from '../components/create-traitement-liquidation-mandatement/create-traitement-liquidation-mandatement.component';
import { RubriqueLiquiderFormComponent } from '../components/rubrique-liquider-form/rubrique-liquider-form.component';
import { PieceJointeFormComponent } from '../components/piece-jointe-form/piece-jointe-form.component';
import { MandaterFormComponent } from '../components/mandater-form/mandater-form.component';
import { DecisionControleRegulariteComponent } from '../components/decision-controle-regularite/decision-controle-regularite.component';
import { PrintFileRejetControleRegulariteComponent } from '../components/print-file-rejet-controle-regularite/print-file-rejet-controle-regularite.component';
import { CreateValiderRejeterMandatComponent } from '../components/create-valider-rejeter-mandat/create-valider-rejeter-mandat.component';
import { CreatePayerMandatComponent } from '../components/create-payer-mandat/create-payer-mandat.component';
import { DetailsValidationDeACTComponent } from '../components/details-validation-de-act/details-validation-de-act.component';
import { ModeEtCoordonneesDePaiementComponent } from '../components/mode-et-coordonnees-de-paiement/mode-et-coordonnees-de-paiement.component';
import { FichePaiementComponent } from '../components/fiche-paiement/fiche-paiement.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ReservationBonEngagementComponent } from '../components/reservation-bon-engagement/reservation-bon-engagement.component';
import { CreateUserFormComponent } from '../components/create-user-form/create-user-form.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { PrintInfoUserComponent } from '@components/print-info-user/print-info-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';

const declarations = [
  BaseComponent,
  CheckPermissionsDirective,
  I18nFormFieldComponent,
  OrderByPipe,
  EngagementFormComponent,
  BonEngagementFormComponent,
  PerformFormComponent,
  CreateBonEngagementFormComponent,
  PrintBonEngagementPrimeComponent,
  CreateSituationTraitementComponent,
  CreateBonEngagementMissionFormComponent,
  EngagementMissionFormComponent,
  CreateSituationTraitementComponent,
  FactureComponent,
  CreateTransmissionReceptionFormComponent,
  ConstitutionBordereauFormComponent,
  CoordonneesBordereauFormComponent,
  PrintBordereauxComponent,
  CreateMotifRejetFormComponent,
  ModelVirementFormComponent,
  VirementFormComponent,
  DetailsVirementFormComponent,
  VirementBodyFormComponent,
  ShowVirementMessageComponent,
  VirementValidationFormComponent,
  CreateTraitementLiquidationMandatementComponent,
  RubriqueLiquiderFormComponent,
  PieceJointeFormComponent,
  MandaterFormComponent,
  DecisionControleRegulariteComponent,
  PrintFileRejetControleRegulariteComponent,
  CreateValiderRejeterMandatComponent,
  CreatePayerMandatComponent,
  DetailsValidationDeACTComponent,
  ModeEtCoordonneesDePaiementComponent,
  FichePaiementComponent,
  ReservationBonEngagementComponent,
  CreateUserFormComponent,
  PrintInfoUserComponent,
  ChangePasswordComponent
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
  ToolbarModule,
  RippleModule,
  TableModule,
  BreadcrumbModule,
  CalendarModule,
  InputSwitchModule,
  TagModule,
  ConfirmDialogModule,
  CheckboxModule,
  DropdownModule,
  StepsModule,
  EditorModule,
  FieldsetModule,
  NgxPrintModule,
  FormsModule,
  InputMaskModule,
  ToggleButtonModule
];
@NgModule({
  declarations: [...declarations],
  imports: [
    ...shared,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
      // isolate: true,
      // extend: true,
    }),
    CardModule,
  ],
  exports: [...shared, ...declarations, TranslateModule],
  providers: [
    AppService,
    LocalStorageService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    MessageService,
    UserService,
    DialogService,
    DialogsService,
    ApisService,
    ConfirmationService,
  ],
})
export class SharedModule { }
