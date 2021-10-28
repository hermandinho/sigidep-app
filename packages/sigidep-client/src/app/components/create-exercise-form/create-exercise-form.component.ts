import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "@services/app.service";
import {ApisService} from "@services/apis.service";
import {ExerciseModel} from "@models/exercise.model";
import {Store} from "@ngrx/store";
import {AppState} from "@reducers/index";
import {GetExercises} from "@actions/exercises.actions";

@Component({
  selector: 'app-create-exercise-form',
  templateUrl: './create-exercise-form.component.html',
  styleUrls: ['./create-exercise-form.component.scss']
})
export class CreateExerciseFormComponent implements OnInit {


  public form: FormGroup;
  public busy = false;

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
  ) {
    this.form = this._fb.group({
      startDate: [undefined, [Validators.required]],
      endDate: [undefined, [Validators.required]],
      isActive: [false, []],
    });
  }

  ngOnInit(): void {
    // TODO I thing we should enable exercise creation only within a certain period of time.
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    this._apisService.post<ExerciseModel>('/exercises', {
      ...this.form.value,
    }).subscribe(res => {
      this.busy = false;
      this.ref.close(res);
      this._store.dispatch(GetExercises({}))

      this._appService.showToast({
        detail: 'messages.success',
        summary: 'messages.exercises.createSuccess',
        severity: 'success',
        life: 3000,
        closable: true,
      });
    }, ({error}) => {
      console.log(error);
      let err = 'errors.exercises.conflict';
      if (error?.statusCode === 409) {
        err = 'errors.exercises.conflict';
      } else {
        err = 'errors.unknown'
      }
      this.busy = false;
      this._appService.showToast({
        detail: err,
        summary: 'errors.error',
        severity: 'error',
        life: 5000,
        closable: true,
      });
    })
  }

}
