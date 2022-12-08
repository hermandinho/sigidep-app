import { ContribuableBugetaireModel } from '@models/contribuable-budgetaire.model';
import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import {
  FinancialSourceModel,
  RoleModel,
  ExerciseModel,
  AdministrativeUnitModel,
  TechnicalSupervisorModel,
  ParagraphModel,
  SubProgramModel,
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  ReferencePhysicalUnitModel,
  BankModel,
  AgenceModel,
  SubProgramActionModel,
  ContribuableModel,
  AgentModel,
  ArticleModel,
  RubriqueModel,
  SousRubriqueModel,
  CarnetMandatModel,
  GradeModel,
  CategorieAgentModel,
  BaremeMissionModel,
  PieceJointeModel,
  TypeProcedureModel,
  ExecTaxesModel,
  RegionsModel,
  ExecProcedureModel,
  EncoursModel,
  EngagementJuridiqueModel,
  EngagementCommandeModel,
  EngagementDecisionModel,
  EngagementMissionModel,
  Step,
  ModeleVirementModel,
  VirementModele,
} from '@models/index';
import { CreateEncoursModel } from '@models/create-encours.model';
import {
  BonEngagementModel,
  StepBonEngagement,
} from '@models/bon-engagement.model';
import { CategorieProcedure } from 'app/utils/types';
import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { VirementMessage } from '@models/virement-message';
import { ModeVirementEnum } from '@pages/virements/tools/virement-tools';
import { StructureModel } from '../models/structure.model';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  private exerciseCreateComponent: any;
  private rolesCreateComponent: any;
  private financialSourcesCreateComponent: any;
  private administrativeUnitCreateComponent: any;
  private technicalSupervisorCreateComponent: any;
  private paragraphCreateComponent: any;
  private subProgramObjectiveCreateComponent: any;
  private subProgramObjectiveIndicatorCreateComponent: any;
  private subProgramActionCreateComponent: any;
  private subProgramActivityCreateComponent: any;
  private subProgramActivityTaskCreateComponent: any;
  private subProgramActivityTaskOperationCreateComponent: any;
  private referencePhysicalUnitComponent: any;
  private contribuableCreateComponent: any;

  private bankCreateComponent: any;
  private agenceBankCreateComponent: any;
  private contribuableBudgetaireCreateComponent: any;
  private agentCreateComponent: any;
  private modelVirementCreateComponent: any;
  private virementCreateComponent: any;
  private virementMessageComponent: any;
  private printVirement: any;
  private articleCreateComponent: any;
  private rubriqueCreateComponent: any;
  private sousRubriqueCreateComponent: any;
  private carnetCreateComponent: any;
  private gradeCreateComponent: any;
  private categorieAgentCreateComponent: any;

  private accreditationsGestionnairesCreateComponent: any;
  private inputationComponent: any;

  private baremeCreateComponent: any;
  private typeProcedureCreateComponent: any;
  private pieceJointeCreateComponent: any;

  private encoursCreateComponent: any;
  private regionsCreateComponent: any;

  private encoursStatisticsComponent: any;

  private taxeCreateComponent: any;

  private procedureCreateComponent: any;

  private engagementCreateComponent: any;
  private reservationEngagementComponent: any;

  private printEngagementComponent: any;
  private printBonEngagementPrimeComponent: any;

  private etatImputationComponent: any;
  private printTransmissionReceptionComponent: any;

  private printBonEngagementMissionComponent: any;

  private createBonEngagementFormComponent: any;
  private createTransmissionReceptionFormComponent: any;
  private reservationBonEngagementDecisionComponent: any;
  private etatCertificatEngagementComponent: any;
  private createBonEngagementMissionFormComponent: any;
  private createMotifRejetFormComponent: any;
  private printEditionCreanceComponent: any;
  private traitementLiquidationMandatementCreateComponent: any;
  private editerRapportTraitementLiquidationMandatementCreateComponent: any;
  private editerPrintMandatPaiementComponent: any;
  private decisionControleRegulariteComponent: any;
  private printFileRejetControleRegularite: any;
  private payerMandatComponent: any;
  private createValiderRejeterMandatComponent: any;
  private fichePaiement: any;
  private reservationBonEngagementComponent: any;
  private userCreateComponent: any;
  private printInfoUserComponent: any;
  private changePasswordComponent: any;
  private createStructureComponent: any;



  constructor(
    private readonly _dialogService: DialogService,
    private readonly _translateService: TranslateService
  ) { }

  public async launchExerciseCreateDialog(item?: ExerciseModel): Promise<any> {
    if (!this.exerciseCreateComponent) {
      const { CreateExerciseFormComponent } = await import(
        '@components/create-exercise-form/create-exercise-form.component'
      );
      this.exerciseCreateComponent = CreateExerciseFormComponent;
    }

    return this._dialogService.open(this.exerciseCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editExercise' : 'createExercise')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchRolesCreateDialog(item?: RoleModel): Promise<any> {
    if (!this.rolesCreateComponent) {
      const { CreateRoleFormComponent } = await import(
        '@components/create-role-form/create-role-form.component'
      );
      this.rolesCreateComponent = CreateRoleFormComponent;
    }

    return this._dialogService.open(this.rolesCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editRole' : 'createRole')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchStructureCreateDialog(item?: StructureModel): Promise<any> {
    if (!this.createStructureComponent) {
      const { CreateStructureComponent } = await import(
        '@components/create-structure/create-structure.component'
      );
      this.createStructureComponent = CreateStructureComponent;
    }

    return this._dialogService.open(this.createStructureComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editStructure' : 'createStructure')
      ),
      width: '60vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchFinancialSourcesCreateDialog(
    item?: FinancialSourceModel
  ): Promise<any> {
    if (!this.financialSourcesCreateComponent) {
      const { CreateFinancialSourceFormComponent } = await import(
        '@components/create-financial-source-form/create-financial-source-form.component'
      );
      this.financialSourcesCreateComponent = CreateFinancialSourceFormComponent;
    }

    return this._dialogService.open(this.financialSourcesCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' +
        (item ? 'editFinancialSource' : 'createFinancialSource')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchAdministrativeUnitCreateDialog(
    item?: AdministrativeUnitModel
  ): Promise<any> {
    if (!this.administrativeUnitCreateComponent) {
      const { CreateAdministrativeUnitFormComponent } = await import(
        '@components/create-administrative-unit-form/create-administrative-unit-form.component'
      );
      this.administrativeUnitCreateComponent =
        CreateAdministrativeUnitFormComponent;
    }

    return this._dialogService.open(this.administrativeUnitCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' +
        (item ? 'editAdministrativeUnit' : 'createAdministrativeUnit')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchTechnicalSupervisorCreateDialog(
    item?: TechnicalSupervisorModel
  ): Promise<any> {
    if (!this.technicalSupervisorCreateComponent) {
      const { CreateTechnicalSupervisorFormComponent } = await import(
        '@components/create-technical-supervisor-form/create-technical-supervisor-form.component'
      );
      this.technicalSupervisorCreateComponent =
        CreateTechnicalSupervisorFormComponent;
    }

    return this._dialogService.open(this.technicalSupervisorCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' +
        (item ? 'editTechnicalSupervisor' : 'createTechnicalSupervisor')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchParagraphCreateDialog(
    item?: ParagraphModel
  ): Promise<any> {
    if (!this.paragraphCreateComponent) {
      const { CreateParagraphFormComponent } = await import(
        '@components/create-paragraph-form/create-paragraph-form.component'
      );
      this.paragraphCreateComponent = CreateParagraphFormComponent;
    }

    return this._dialogService.open(this.paragraphCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editParagraph' : 'createParagraph')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchSubProgramObjectiveCreateDialog(item?: any) {
    if (!this.subProgramObjectiveCreateComponent) {
      const { CreateSubProgramObjectiveFormComponent } = await import(
        '@components/create-sub-program-objective-form/create-sub-program-objective-form.component'
      );
      this.subProgramObjectiveCreateComponent =
        CreateSubProgramObjectiveFormComponent;
    }

    return this._dialogService.open(this.subProgramObjectiveCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editObjective' : 'createObjective')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchSubProgramObjectiveIndicatorCreateDialog(item?: any) {
    if (!this.subProgramObjectiveIndicatorCreateComponent) {
      const { CreateSubProgramObjectiveIndicatorFormComponent } = await import(
        '@components/create-sub-program-objective-indicator-form/create-sub-program-objective-indicator-form.component'
      );
      this.subProgramObjectiveIndicatorCreateComponent =
        CreateSubProgramObjectiveIndicatorFormComponent;
    }

    return this._dialogService.open(
      this.subProgramObjectiveIndicatorCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item ? 'editObjectiveIndicator' : 'createObjectiveIndicator')
        ),
        width: '50vw',
        height: 'auto',
        modal: true,
        data: {
          item,
        },
      }
    );
  }

  public async launchSubProgramActionCreateDialog(
    sp: SubProgramModel,
    item?: any
  ) {
    if (!this.subProgramActionCreateComponent) {
      const { CreateSubProgramActionFormComponent } = await import(
        '@components/create-sub-program-action-form/create-sub-program-action-form.component'
      );
      this.subProgramActionCreateComponent =
        CreateSubProgramActionFormComponent;
    }

    return this._dialogService.open(this.subProgramActionCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editAction' : 'createAction')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        subProgram: sp,
      },
    });
  }

  public async launchSubProgramActivityCreateDialog(
    sp: SubProgramModel,
    action: SubProgramActionModel,
    item?: any
  ) {
    if (!this.subProgramActivityCreateComponent) {
      const { CreateSubProgramActivityFormComponent } = await import(
        '@components/create-sub-program-activity-form/create-sub-program-activity-form.component'
      );
      this.subProgramActivityCreateComponent =
        CreateSubProgramActivityFormComponent;
    }

    return this._dialogService.open(this.subProgramActivityCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editActivity' : 'createActivity')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        subProgram: sp,
        action,
      },
    });
  }

  public async launchSubProgramActivityTaskCreateDialog(
    sp: SubProgramModel,
    act: SubProgramActivityModel,
    action: SubProgramActionModel,
    item?: any
  ) {
    if (!this.subProgramActivityTaskCreateComponent) {
      const { CreateSubProgramActivityTaskFormComponent } = await import(
        '@components/create-sub-program-activity-task-form/create-sub-program-activity-task-form.component'
      );
      this.subProgramActivityTaskCreateComponent =
        CreateSubProgramActivityTaskFormComponent;
    }

    return this._dialogService.open(
      this.subProgramActivityTaskCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item ? 'editActivityTask' : 'createActivityTask')
        ),
        width: '50vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          subProgram: sp,
          activity: act,
          action,
        },
      }
    );
  }

  public async referencePhysicalUnitCreateDialog(
    item?: ReferencePhysicalUnitModel
  ) {
    if (!this.referencePhysicalUnitComponent) {
      const { CreateReferencePhysicalUnitsFormComponent } = await import(
        '@components/create-reference-physical-units-form/create-reference-physical-units-form.component'
      );
      this.referencePhysicalUnitComponent =
        CreateReferencePhysicalUnitsFormComponent;
    }

    return this._dialogService.open(this.referencePhysicalUnitComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' +
        (item ? 'editReferencePhysicalUnit' : 'createReferencePhysicalUnit')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchSubProgramActivityTaskOperationCreateDialog(
    sp: SubProgramModel,
    act: SubProgramActivityModel,
    action: SubProgramActionModel,
    task: SubProgramActivityTaskModel,
    ignoreParagraphIds?: number[],
    item?: any
  ) {
    if (!this.subProgramActivityTaskOperationCreateComponent) {
      const { CreateSubProgramActivityTaskOperationFormComponent } =
        await import(
          '@components/create-sub-program-activity-task-operation-form/create-sub-program-activity-task-operation-form.component'
        );
      this.subProgramActivityTaskOperationCreateComponent =
        CreateSubProgramActivityTaskOperationFormComponent;
    }

    return this._dialogService.open(
      this.subProgramActivityTaskOperationCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item ? 'editActivityTaskOperation' : 'createActivityTaskOperation')
        ),
        width: '100%',
        height: '100%',
        style: {
          maxHeight: '100%',
        },
        modal: true,
        data: {
          item,
          subProgram: sp,
          activity: act,
          task,
          ignoreParagraphIds,
          action,
        },
      }
    );
  }

  public async launchContribuablesCreateDialog(
    item?: ContribuableModel
  ): Promise<any> {
    if (!this.contribuableCreateComponent) {
      const { CreateContribuableFormComponent } = await import(
        '@components/create-contribuable-form/create-contribuable-form.component'
      );
      this.contribuableCreateComponent = CreateContribuableFormComponent;
    }

    return this._dialogService.open(this.contribuableCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.editContribuable'
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  /************************************************************************************************** */
  /**************************************************************************************************
   * /**************************************************************************************************/
  public async launchBankCreateDialog(item?: BankModel): Promise<any> {
    if (!this.bankCreateComponent) {
      const { CreateBankFormComponent } = await import(
        '@components/create-bank-form/create-bank-form.component'
      );
      this.bankCreateComponent = CreateBankFormComponent;
    }

    return this._dialogService.open(this.bankCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editBank' : 'createBank')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchAgengeBankCreateDialog(
    bank: BankModel,
    item?: AgenceModel
  ): Promise<any> {
    if (!this.agenceBankCreateComponent) {
      const { CreateAgenceBankFormComponent } = await import(
        '@components/create-agence-bank-form/create-agence-bank-form.component'
      );
      this.agenceBankCreateComponent = CreateAgenceBankFormComponent;
    }

    return this._dialogService.open(this.agenceBankCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.' + (item ? 'editAgenceBank' : 'createAgenceBank')
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        bank,
      },
    });
  }

  public async launchContribuablesBudgetairesCreateDialog(
    item?: ContribuableBugetaireModel
  ): Promise<any> {
    if (!this.contribuableBudgetaireCreateComponent) {
      const { CreateContribuableBudgetaireFormComponent } = await import(
        '@components/create-contribuable-budgetaire-form/create-contribuable-budgetaire-form.component'
      );
      this.contribuableBudgetaireCreateComponent =
        CreateContribuableBudgetaireFormComponent;
    }

    return this._dialogService.open(
      this.contribuableBudgetaireCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editContribuableBudgetaire'
            : 'createContribuableBudgetaire')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
        },
      }
    );
  }

  public async launchAgentsCreateDialog(item?: AgentModel): Promise<any> {
    if (!this.agentCreateComponent) {
      const { CreateAgentFormComponent } = await import(
        '@components/create-agent-form/create-agent-form.component'
      );
      this.agentCreateComponent = CreateAgentFormComponent;
    }

    return this._dialogService.open(this.agentCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editAgent'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchArticleCreateDialog(item?: ArticleModel): Promise<any> {
    if (!this.articleCreateComponent) {
      const { CreateArticleFormComponent } = await import(
        '@components/create-article-form/create-article-form.component'
      );
      this.articleCreateComponent = CreateArticleFormComponent;
    }
    return this._dialogService.open(this.articleCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editArticle'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchRubriqueCreateDialog(item?: RubriqueModel): Promise<any> {
    if (!this.rubriqueCreateComponent) {
      const { CreateRubriqueFormComponent } = await import(
        '@components/create-rubrique-form/create-rubrique-form.component'
      );
      this.rubriqueCreateComponent = CreateRubriqueFormComponent;
    }
    return this._dialogService.open(this.rubriqueCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editRubrique'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchSousRubriqueCreateDialog(
    item?: SousRubriqueModel
  ): Promise<any> {
    if (!this.sousRubriqueCreateComponent) {
      const { CreateSousRubriqueFormComponent } = await import(
        '@components/create-sous-rubrique-form/create-sous-rubrique-form.component'
      );
      this.sousRubriqueCreateComponent = CreateSousRubriqueFormComponent;
    }
    return this._dialogService.open(this.sousRubriqueCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.editSousRubrique'
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchCarnetCreateDialog(
    item?: CarnetMandatModel,
    assignment = false
  ): Promise<any> {
    if (!this.sousRubriqueCreateComponent) {
      const { CreateCarnetFormComponent } = await import(
        '@components/create-carnet-form/create-carnet-form.component'
      );
      this.carnetCreateComponent = CreateCarnetFormComponent;
    }
    return this._dialogService.open(this.carnetCreateComponent, {
      header: this._translateService.instant(
        !assignment
          ? 'dialogs.headers.editCarnet'
          : 'dialogs.headers.assignCarnet',
        { code: item?.code }
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        assignment,
      },
    });
  }

  public async launchGradeCreateDialog(item?: GradeModel): Promise<any> {
    if (!this.gradeCreateComponent) {
      const { CreateGradeFormComponent } = await import(
        '@components/create-grade-form/create-grade-form.component'
      );
      this.gradeCreateComponent = CreateGradeFormComponent;
    }
    return this._dialogService.open(this.gradeCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editGrade'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchCategorieAgentCreateDialog(
    item?: CategorieAgentModel
  ): Promise<any> {
    if (!this.categorieAgentCreateComponent) {
      const { CategorieAgentFormComponent } = await import(
        '@components/categorie-agent-form/categorie-agent-form.component'
      );
      this.categorieAgentCreateComponent = CategorieAgentFormComponent;
    }
    return this._dialogService.open(this.categorieAgentCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editCategorie'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchAccreditationsGestionnairesCreateDialog(
    item?: any
  ): Promise<any> {
    if (!this.accreditationsGestionnairesCreateComponent) {
      const { AccreditationsGestionnairesFormComponent } = await import(
        '@components/accreditations-gestionnaires-form/accreditations-gestionnaires-form.component'
      );
      this.accreditationsGestionnairesCreateComponent =
        AccreditationsGestionnairesFormComponent;
    }

    return this._dialogService.open(
      this.accreditationsGestionnairesCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editAccreditationsGestionnaires'
            : 'createAccreditationsGestionnaires')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
        },
      }
    );
  }

  public async launchAccreditationsGestionnairesListInputation(
    item?: any
  ): Promise<any> {
    if (!this.inputationComponent) {
      const { ImputationsComponent } = await import(
        '@pages/accreditations-gestionnaires/imputations/imputations.component'
      );
      this.inputationComponent = ImputationsComponent;
    }

    return this._dialogService.open(this.inputationComponent, {
      header: this._translateService.instant('dialogs.headers.listImputation'),
      width: '80vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchBaremeCreateDialog(
    item?: BaremeMissionModel
  ): Promise<any> {
    if (!this.baremeCreateComponent) {
      const { CreateBaremeFormComponent } = await import(
        '@components/create-bareme-form/create-bareme-form.component'
      );
      this.baremeCreateComponent = CreateBaremeFormComponent;
    }
    return this._dialogService.open(this.baremeCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editBareme'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchTypeProcedureCreateDialog(
    item?: TypeProcedureModel
  ): Promise<any> {
    if (!this.typeProcedureCreateComponent) {
      const { CreateTypeProcedureFormComponent } = await import(
        '@components/create-type-procedure-form/create-type-procedure-form.component'
      );
      this.typeProcedureCreateComponent = CreateTypeProcedureFormComponent;
    }
    return this._dialogService.open(this.typeProcedureCreateComponent, {
      header: this._translateService.instant(
        'dialogs.headers.editTypeProcedure'
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchPieceJointeCreateDialog(
    item?: PieceJointeModel
  ): Promise<any> {
    if (!this.pieceJointeCreateComponent) {
      const { CreatePieceJointeFormComponent } = await import(
        '@components/create-piece-jointe-form/create-piece-jointe-form.component'
      );
      this.pieceJointeCreateComponent = CreatePieceJointeFormComponent;
    }
    return this._dialogService.open(this.pieceJointeCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editPieceJointe'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchEncoursCreateDialog(
    item?: CreateEncoursModel
  ): Promise<any> {
    if (!this.encoursCreateComponent) {
      const { CreateEncoursFormComponent } = await import(
        '@components/create-encours-form/create-encours-form.component'
      );
      this.encoursCreateComponent = CreateEncoursFormComponent;
    }
    return this._dialogService.open(this.encoursCreateComponent, {
      header: this._translateService.instant('dialogs.headers.encours'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }
  public async launchRegionsCreateDialog(item?: RegionsModel): Promise<any> {
    if (!this.regionsCreateComponent) {
      const { CreateRegionsFormComponent } = await import(
        '@components/create-regions-form/create-regions-form.component'
      );
      this.regionsCreateComponent = CreateRegionsFormComponent;
    }
    return this._dialogService.open(this.regionsCreateComponent, {
      header: this._translateService.instant('dialogs.headers.regions'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchEncoursStatisticsDialog(
    item?: EncoursModel
  ): Promise<any> {
    if (!this.encoursStatisticsComponent) {
      const { DisplayEncoursStatisticsComponent } = await import(
        '@components/display-encours-statistics/display-encours-statistics.component'
      );
      this.encoursStatisticsComponent = DisplayEncoursStatisticsComponent;
    }
    return this._dialogService.open(this.encoursStatisticsComponent, {
      header: this._translateService.instant(
        'dialogs.headers.encoursExercise',
        {
          code: item?.exercise,
        }
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchTaxeCreateDialog(item?: ExecTaxesModel): Promise<any> {
    if (!this.taxeCreateComponent) {
      const { CreateTaxeFormComponent } = await import(
        '@components/create-taxe-form/create-taxe-form.component'
      );
      this.taxeCreateComponent = CreateTaxeFormComponent;
    }
    return this._dialogService.open(this.taxeCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editTaxes'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchProcedureCreateDialog(
    item?: ExecProcedureModel
  ): Promise<any> {
    if (!this.procedureCreateComponent) {
      const { CreateProcedureFormComponent } = await import(
        '@components/create-procedure-form/create-procedure-form.component'
      );
      this.procedureCreateComponent = CreateProcedureFormComponent;
    }
    return this._dialogService.open(this.procedureCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editProcedures'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchEngagementCreateDialog(
    item?:
      | EngagementJuridiqueModel
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel,
    action?: string
  ): Promise<any> {
    if (!this.engagementCreateComponent) {
      const { EngagementContainerComponent } = await import(
        '@components/engagement-container/engagement-container.component'
      );
      this.engagementCreateComponent = EngagementContainerComponent;
    }

    return this._dialogService.open(this.engagementCreateComponent, {
      header: this._translateService.instant(
        action
          ? 'dialogs.headers.viewEngagement'
          : 'dialogs.headers.editEngagement',
        { numero: item?.numero }
      ),
      width: '60vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        action,
      },
    });
  }

  public async launchReservationEngagementDialog(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel,
    type: Step
  ): Promise<any> {
    if (!this.reservationEngagementComponent) {
      const { ReservationEngagementComponent } = await import(
        '@components/reservation-engagement/reservation-engagement.component'
      );
      this.reservationEngagementComponent = ReservationEngagementComponent;
    }

    return this._dialogService.open(this.reservationEngagementComponent, {
      header: this._translateService.instant(
        'dialogs.headers.reserverEngagement',
        { numero: item?.numero }
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }

  public async launchPrintEngagementDialog(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel,
    type?: Step
  ): Promise<any> {
    if (!this.printEngagementComponent) {
      const { PrintEngagementComponent } = await import(
        '@components/print-engagement/print-engagement.component'
      );
      this.printEngagementComponent = PrintEngagementComponent;
    }

    return this._dialogService.open(this.printEngagementComponent, {
      header: this._translateService.instant(
        'dialogs.headers.printEngagement',
        { numero: item?.numero }
      ),
      width: '40vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }
  public async launchImputationEtatDialog(item?: EncoursModel): Promise<any> {
    if (!this.etatImputationComponent) {
      const { EtatImputationComponent } = await import(
        '@components/etat-imputation/etat-imputation.component'
      );
      this.etatImputationComponent = EtatImputationComponent;
    }
    return this._dialogService.open(this.etatImputationComponent, {
      header: this._translateService.instant('dialogs.headers.imputation'),
      width: '70vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchBonEngagementCreateDialog(
    category?: CategorieProcedure,
    item?: BonEngagementModel,
    action?: string
  ): Promise<any> {
    if (!this.createBonEngagementFormComponent) {
      const { CreateBonEngagementFormComponent } = await import(
        '@components/create-bon-engagement-form/create-bon-engagement-form.component'
      );
      this.createBonEngagementFormComponent = CreateBonEngagementFormComponent;
    }
    if (action == 'consulterM') {
      return this._dialogService.open(this.createBonEngagementFormComponent, {
        header: this._translateService.instant(
          (action = 'dialogs.headers.etatBonEngagement'),
          { numero: item?.numero }
        ),
        width: '60vw',
        height: 'auto',
        modal: true,
        data: {
          category,
          item,
          action,
        },
      });
    } else if (action == 'consulterC') {
      return this._dialogService.open(this.createBonEngagementFormComponent, {
        header: this._translateService.instant(
          (action = 'dialogs.headers.etatCertificat'),
          { numero: item?.numero }
        ),
        width: '60vw',
        height: 'auto',
        modal: true,
        data: {
          category,
          item,
          action,
        },
      });
    } else {
      return this._dialogService.open(this.createBonEngagementFormComponent, {
        header: this._translateService.instant(
          action
            ? 'dialogs.headers.viewBonEngagement'
            : 'dialogs.headers.editBonEngagement',
          { numero: item?.numero }
        ),
        width: '60vw',
        height: 'auto',
        modal: true,
        data: {
          category,
          item,
          action,
        },
      });
    }
  }


  public async launchTransmissionReceptionCreateDialog(
    item?: TransmissionsReceptionModel,
    action?: string
  ): Promise<any> {
    if (!this.createTransmissionReceptionFormComponent) {
      const { CreateTransmissionReceptionFormComponent } = await import(
        '@components/create-transmission-reception-form/create-transmission-reception-form.component'
      );
      this.createTransmissionReceptionFormComponent = CreateTransmissionReceptionFormComponent;
    }
    return this._dialogService.open(this.createTransmissionReceptionFormComponent, {
      header: this._translateService.instant(
        action
          ? 'dialogs.headers.viewTransmissionReception'
          : 'dialogs.headers.editTransmissionReception',
        { numero: item?.numero }
      ),
      width: '60vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        action,
      },
    });

  }

  public async launchMotifRejetCreateDialog(
    item?: any,
  ): Promise<any> {
    if (!this.createMotifRejetFormComponent) {
      const { CreateMotifRejetFormComponent } = await import(
        '@components/create-motif-rejet-form/create-motif-rejet-form.component'
      );
      this.createMotifRejetFormComponent = CreateMotifRejetFormComponent;
    }
    return this._dialogService.open(this.createMotifRejetFormComponent, {
      header: this._translateService.instant(
        'dialogs.headers.viewTransmissionReception',
        { numero: item?.numero }
      ),
      width: '60vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });

  }


  public async launchPrintBonEngagementPrimeDialog(
    item: BonEngagementModel,
    type?: Step
  ): Promise<any> {
    if (!this.printBonEngagementPrimeComponent) {
      const { PrintBonEngagementPrimeComponent } = await import(
        '@components/print-bon-engagement-prime/print-bon-engagement-prime.component'
      );
      this.printBonEngagementPrimeComponent = PrintBonEngagementPrimeComponent;
    }

    return this._dialogService.open(this.printBonEngagementPrimeComponent, {
      header: this._translateService.instant(
        'dialogs.headers.printEngagement',
        { numero: item?.numero }
      ),
      width: '40vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }

  public async launchBonEngagementMissionCreateDialog(
    item?: BonEngagementModel,
    action?: string
  ): Promise<any> {
    if (!this.createBonEngagementMissionFormComponent) {
      const { CreateBonEngagementMissionFormComponent } = await import(
        '@components/create-bon-engagement-mission-form/create-bon-engagement-mission-form.component'
      );
      this.createBonEngagementMissionFormComponent =
        CreateBonEngagementMissionFormComponent;
    }

    return this._dialogService.open(
      this.createBonEngagementMissionFormComponent,
      {
        header: this._translateService.instant(
          action
            ? 'dialogs.headers.viewBonEngagement'
            : 'dialogs.headers.editBonEngagement',
          { numero: item?.numero }
        ),
        width: '60vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action,
        },
      }
    );
  }

  public async launchPrintTransmissionReceptionDialog(item?: any): Promise<any> {
    if (!this.printTransmissionReceptionComponent) {
      const { PrintBordereauxComponent } = await import(
        '@components/print-bordereaux/print-bordereaux.component'
      );
      this.printTransmissionReceptionComponent = PrintBordereauxComponent;
    }
    return this._dialogService.open(this.printTransmissionReceptionComponent, {
      header: this._translateService.instant('dialogs.headers.imputation'),
      width: '70vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchModelVirementCreateDialog(item?: ModeleVirementModel): Promise<any> {
    if (!this.modelVirementCreateComponent) {
      const { ModelVirementFormComponent } = await import(
        '@components/model-virement-form/model-virement-form.component'
      );
      this.modelVirementCreateComponent = ModelVirementFormComponent;
    }

    return this._dialogService.open(this.modelVirementCreateComponent, {
      header: this._translateService.instant('dialogs.headers.editAgent'),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }


  public async launchVirementCreateDialog(item?: VirementModele, mode: ModeVirementEnum = ModeVirementEnum.CREATION): Promise<any> {
    if (!this.virementCreateComponent) {
      const { VirementFormComponent } = await import(
        '@components/virement-form/virement-form.component'
      );
      this.virementCreateComponent = VirementFormComponent;
    }

    return this._dialogService.open(this.virementCreateComponent, {
      header: this._translateService.instant('labels.virement'),
      width: '60vw',
      height: 'auto',
      modal: true,
      data: {
        item: item,
        mode: mode,
      },
    });
  }

  public async launchVirementMessage(data: VirementMessage, size: number = 20): Promise<any> {
    if (!this.virementMessageComponent) {
      const { ShowVirementMessageComponent } = await import(
        '@components/show-virement-message/show-virement-message.component'
      );
      this.virementMessageComponent = ShowVirementMessageComponent;
    }

    return this._dialogService.open(this.virementMessageComponent, {
      width: size + 'vw',
      height: 'auto',
      modal: true,
      data: {
        data,
      },
    });
  }

  public async launchPrintEditionCreanceDialog(
    item: any
  ): Promise<any> {
    if (!this.printEditionCreanceComponent) {
      const { PrintEditionTccCreanceComponent } = await import(
        '@components/print-edition-tcc-creance/print-edition-tcc-creance.component'
      );
      this.printEditionCreanceComponent = PrintEditionTccCreanceComponent;
    }

    return this._dialogService.open(this.printEditionCreanceComponent, {
      header: this._translateService.instant(
        'dialogs.headers.printEditionCreance',
        { numero: item?.numero }
      ),
      width: '100%',
      height: '100%',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchtraitementLiquidationMandatementCreateDialog(
    item?: any,
    action?: string
  ): Promise<any> {
    if (!this.traitementLiquidationMandatementCreateComponent) {
      const { CreateTraitementLiquidationMandatementComponent } = await import(
        '@components/create-traitement-liquidation-mandatement/create-traitement-liquidation-mandatement.component'
      );
      this.traitementLiquidationMandatementCreateComponent =
        CreateTraitementLiquidationMandatementComponent;
    }

    return this._dialogService.open(
      this.traitementLiquidationMandatementCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editTraitementLiquidationMandatement'
            : 'createTraitementLiquidationMandatement')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchUserCreateDialog(
    item?: any,
    action?: string
  ): Promise<any> {
    if (!this.userCreateComponent) {
      const { CreateUserFormComponent } = await import(
        '@components/create-user-form/create-user-form.component'
      );
      this.userCreateComponent =
        CreateUserFormComponent;
    }

    return this._dialogService.open(
      this.userCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editUser'
            : 'createUser')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchEditerRapportTraitementLiquidationMandatementCreateDialog(
    item?: any,
    action?: string
  ): Promise<any> {
    if (!this.editerRapportTraitementLiquidationMandatementCreateComponent) {
      const { EditerRapportTraitementLiquidationMandatementComponent } = await import(
        '@components/editer-rapport-traitement-liquidation-mandatement/editer-rapport-traitement-liquidation-mandatement.component'
      );
      this.editerRapportTraitementLiquidationMandatementCreateComponent =
        EditerRapportTraitementLiquidationMandatementComponent;
    }

    return this._dialogService.open(
      this.editerRapportTraitementLiquidationMandatementCreateComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editTraitementLiquidationMandatement'
            : 'createTraitementLiquidationMandatement')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchEditerPrintMandatPaiementComponentCreateDialog(
    item?: any,
    action?: string
  ): Promise<any> {
    if (!this.editerPrintMandatPaiementComponent) {
      const { PrintMandatPaiementComponent } = await import(
        '@components/print-mandat-paiement/print-mandat-paiement.component'
      );
      this.editerPrintMandatPaiementComponent =
        PrintMandatPaiementComponent;
    }

    return this._dialogService.open(
      this.editerPrintMandatPaiementComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editPrintMandatPaiementComponent'
            : 'createPrintMandatPaiementComponent')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchPrintInfoUserDialog(
    item: any,
  ): Promise<any> {
    if (!this.printInfoUserComponent) {
      const { PrintInfoUserComponent } = await import(
        '@components/print-info-user/print-info-user.component'
      );
      this.printInfoUserComponent =
        PrintInfoUserComponent;
    }

    return this._dialogService.open(
      this.printInfoUserComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editPrintMandatPaiementComponent'
            : 'createPrintMandatPaiementComponent')
        ),
        width: '40vw',
        height: 'auto',
        modal: true,
        data: {
          item
        },
      }
    );
  }

  public async launchChangePasswordDialog(
    item?: any,
  ): Promise<any> {
    if (!this.changePasswordComponent) {
      const { ChangePasswordComponent } = await import(
        '@components/change-password/change-password.component'
      );
      this.changePasswordComponent =
        ChangePasswordComponent;
    }

    return this._dialogService.open(
      this.changePasswordComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editChangePasswordComponent'
            : 'createChangePasswordComponent')
        ),
        width: '40vw',
        height: 'auto',
        modal: true,
        data: {
          item
        },
      }
    );
  }



  public async launchPrintVirement(data: VirementModele): Promise<any> {
    if (!this.printEditionCreanceComponent) {
      const { PrintVirementComponent } = await import(
        '@components/print-virement/print-virement.component'
      );
      this.printVirement = PrintVirementComponent;
    }
    return this._dialogService.open(this.printVirement, {
      header: this._translateService.instant('labels.printVirement'),
      width: '690px',
      height: '842px',
      modal: true,
      data: {
        data,
      },
    });
  }

  public async launchDecisionControleRegularite(
    item: any,
    action?: string
  ): Promise<any> {
    if (!this.decisionControleRegulariteComponent) {
      const { DecisionControleRegulariteComponent } = await import(
        '@components/decision-controle-regularite/decision-controle-regularite.component'
      );
      this.decisionControleRegulariteComponent =
        DecisionControleRegulariteComponent;
    }

    return this._dialogService.open(
      this.decisionControleRegulariteComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'decisionControleRegulariteComponent'
            : 'decisionControleRegulariteComponent')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }


  public async launchPrintFileRejetControleRegulariteDialog(
    item: BonEngagementModel,
    type?: Step
  ): Promise<any> {
    if (!this.printFileRejetControleRegularite) {
      const { PrintFileRejetControleRegulariteComponent } = await import(
        '@components/print-file-rejet-controle-regularite/print-file-rejet-controle-regularite.component'
      );
      this.printFileRejetControleRegularite = PrintFileRejetControleRegulariteComponent;
    }

    return this._dialogService.open(this.printFileRejetControleRegularite, {
      header: this._translateService.instant(
        'dialogs.headers.PrintFileRejetControleRegularite',
        { numero: item?.numero }
      ),
      width: '70vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }

  public async launchValiderRejeterMandatCreateDialog(
    item: any,
    action?: string
  ): Promise<any> {
    if (!this.createValiderRejeterMandatComponent) {
      const { CreateValiderRejeterMandatComponent } = await import(
        '@components/create-valider-rejeter-mandat/create-valider-rejeter-mandat.component'
      );
      this.createValiderRejeterMandatComponent =
        CreateValiderRejeterMandatComponent;
    }

    return this._dialogService.open(
      this.createValiderRejeterMandatComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editCreateValiderRejeterMandatComponent'
            : 'createValiderRejeterMandatComponent')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchPayerMandatCreateDialog(
    item: any,
    action?: string
  ): Promise<any> {
    if (!this.payerMandatComponent) {
      const { CreatePayerMandatComponent } = await import(
        '@components/create-payer-mandat/create-payer-mandat.component'
      );
      this.payerMandatComponent =
        CreatePayerMandatComponent;
    }

    return this._dialogService.open(
      this.payerMandatComponent,
      {
        header: this._translateService.instant(
          'dialogs.headers.' +
          (item
            ? 'editPayerMandatComponent'
            : 'payerMandatComponent')
        ),
        width: '70vw',
        height: 'auto',
        modal: true,
        data: {
          item,
          action
        },
      }
    );
  }

  public async launchFichePaiementComponentDialog(
    item: any,
    type?: Step
  ): Promise<any> {
    if (!this.fichePaiement) {
      const { FichePaiementComponent } = await import(
        '@components/fiche-paiement/fiche-paiement.component'
      );
      this.fichePaiement = FichePaiementComponent;
    }

    return this._dialogService.open(this.fichePaiement, {
      header: this._translateService.instant(
        'dialogs.headers.fichePaiement',
        { numero: item?.numero }
      ),
      width: '70vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }

  public async launchReservationBonEngagementDialog(
    item:
      | BonEngagementModel,
    type: Step
  ): Promise<any> {
    if (!this.reservationBonEngagementComponent) {
      const { ReservationBonEngagementComponent } = await import(
        '@components/reservation-bon-engagement/reservation-bon-engagement.component'
      );
      this.reservationBonEngagementComponent = ReservationBonEngagementComponent;
    }

    return this._dialogService.open(this.reservationBonEngagementComponent, {
      header: this._translateService.instant(
        'dialogs.headers.reserverBonEngagement',
        { numero: item?.numero }
      ),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
        type,
      },
    });
  }
}


