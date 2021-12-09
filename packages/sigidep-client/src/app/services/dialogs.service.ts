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
} from '@models/index';
import { CreateSubProgramActivityTaskFormComponent } from '@components/create-sub-program-activity-task-form/create-sub-program-activity-task-form.component';

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
  private subProgramActivityCreateComponent: any;
  private subProgramActivityTaskCreateComponent: any;
  private subProgramActivityTaskOperationCreateComponent: any;
  private referencePhysicalUnitComponent: any;

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

  public async launchSubProgramActivityCreateDialog(
    sp: SubProgramModel,
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
      },
    });
  }

  public async launchSubProgramActivityTaskCreateDialog(
    sp: SubProgramModel,
    act: SubProgramActivityModel,
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
    task: SubProgramActivityTaskModel,
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
        },
      }
    );
  }
}
