import {Injectable} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {TranslateService} from "@ngx-translate/core";
import {ExerciseModel} from "@models/exercise.model";
import {RoleModel} from "@models/role.model";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private exerciseCreateComponent: any;
  private rolesCreateComponent: any;
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
}
