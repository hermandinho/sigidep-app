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
import { ReactiveFormsModule } from '@angular/forms';
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
import { ModelVirementFormComponent } from '@components/model-virement-form/model-virement-form.component';

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
  ModelVirementFormComponent,
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
