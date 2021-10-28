import {Injectable} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private exerciseCreateComponent: any;
  constructor(
    private readonly _dialogService: DialogService,
    private readonly _translateService: TranslateService,
  ) { }

  public async launchExerciseCreateDialog(): Promise<any> {
    if (!this.exerciseCreateComponent) {
      const { CreateExerciseFormComponent } = await import(
        '@components/create-exercise-form/create-exercise-form.component'
        );
      this.exerciseCreateComponent = CreateExerciseFormComponent;
    }

    return this._dialogService.open(this.exerciseCreateComponent, {
      header: this._translateService.instant('dialogs.createExercise'),
      width: '50vw',
      height: '30vh',
      modal: true,
      data: {},
    });
  }
}
