import {Injectable} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {TranslateService} from "@ngx-translate/core";
import {FinancialSourceModel, RoleModel, ExerciseModel} from "@models/index";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private exerciseCreateComponent: any;
  private rolesCreateComponent: any;
  private financialSourcesCreateComponent: any;
  constructor(
    private readonly _dialogService: DialogService,
    private readonly _translateService: TranslateService,
  ) { }

  public async launchExerciseCreateDialog(
    item?: ExerciseModel,
  ): Promise<any> {
    if (!this.exerciseCreateComponent) {
      const { CreateExerciseFormComponent } = await import(
        '@components/create-exercise-form/create-exercise-form.component'
        );
      this.exerciseCreateComponent = CreateExerciseFormComponent;
    }

    return this._dialogService.open(this.exerciseCreateComponent, {
      header: this._translateService.instant('dialogs.headers.' + (item ? 'editExercise' : 'createExercise')),
      width: '50vw',
      height: '30vh',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchRolesCreateDialog(
    item?: RoleModel,
  ): Promise<any> {
    if (!this.rolesCreateComponent) {
      const { CreateRoleFormComponent } = await import(
        '@components/create-role-form/create-role-form.component'
        );
      this.rolesCreateComponent = CreateRoleFormComponent;
    }

    return this._dialogService.open(this.rolesCreateComponent, {
      header: this._translateService.instant('dialogs.headers.' + (item ? 'editRole' : 'createRole')),
      width: '50vw',
      height: '30vh',
      modal: true,
      data: {
        item,
      },
    });
  }

  public async launchFinancialSourcesCreateDialog(
    item?: FinancialSourceModel,
  ): Promise<any> {
    if (!this.financialSourcesCreateComponent) {
      const { CreateFinancialSourceFormComponent } = await import(
        '@components/create-financial-source-form/create-financial-source-form.component'
        );
      this.financialSourcesCreateComponent = CreateFinancialSourceFormComponent;
    }

    return this._dialogService.open(this.financialSourcesCreateComponent, {
      header: this._translateService.instant('dialogs.headers.' + (item ? 'editFinancialSource' : 'createFinancialSource')),
      width: '50vw',
      height: 'auto',
      modal: true,
      data: {
        item,
      },
    });
  }
}
