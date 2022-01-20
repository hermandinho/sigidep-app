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
} from '@models/index';
import { CreateSubProgramActivityTaskFormComponent } from '@components/create-sub-program-activity-task-form/create-sub-program-activity-task-form.component';
import { CreateSubProgramActionFormComponent } from '@components/create-sub-program-action-form/create-sub-program-action-form.component';

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

  private agentCreateComponent: any;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _translateService: TranslateService
  ) {}

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
      height: '30vh',
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
}
