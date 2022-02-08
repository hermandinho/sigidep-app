import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';
import { CreateEncoursModel } from '@models/create-encours.model';
import { GetEncours } from '@actions/encours.actions';
import {
  getDataSelector as getExercicesDataSelector,
  getLoadingSelector as getExercicesLoadingSelector,
} from '@reducers/exercise.reducer';
import { ExerciseModel } from '@models/exercise.model';
import { map } from 'rxjs/operators';
import { EncoursModel } from '@models/encours.model';
import { DialogsService } from '@services/dialogs.service';

@Component({
  selector: 'app-create-encours-form',
  templateUrl: './create-encours-form.component.html',
  styleUrls: ['./create-encours-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEncoursFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public exercices: ExerciseModel[] = [];
  public exercicesLoading$: Observable<boolean> = of(true);
  public busy = false;
  public encours!: EncoursModel;
  public loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined],
      exercise: ['', Validators.required],
      valeurSeuil: [0, [Validators.min(0), Validators.max(100)]],
    });
    this._store
      .pipe(this.takeUntilDestroy, select(getExercicesDataSelector))
      .subscribe((payload) => {
        this.exercices = [...payload];
      });

    this.exercicesLoading$ = this._store.pipe(
      select(getExercicesLoadingSelector),
      map((status) => status)
    );
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, exercise, valeurSeuil } = this.config.data
        ?.item as CreateEncoursModel;
      this.form.patchValue({
        id: id,
        exercise: exercise,
        valeurSeuil: valeurSeuil,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    this.loading = true;
    const editedEncours = {
      ...this.form?.value,
    } as CreateEncoursModel;

    this._apisService.post<EncoursModel>('/encours', editedEncours).subscribe(
      (res) => {
        this.busy = false;
        this.loading = false;
        this.ref.close(res);
        this.openStatisticsForm(res);
        this._store.dispatch(GetEncours());
        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.encours.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        this.loading = false;
        this.busy = false;
        this.ref.close();
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.dejaEncours';
        } else {
          err = 'errors.unknown';
        }
        this._appService.showToast({
          detail: err,
          summary: 'errors.error',
          severity: 'error',
          life: 5000,
          closable: true,
        });
      }
    );
  }

  openStatisticsForm = async (item: EncoursModel) => {
    this._dialogService.launchEncoursStatisticsDialog(item);
  };
}
