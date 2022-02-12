import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ExerciseModel } from '@models/index';
import { Observable, of, Subject } from 'rxjs';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/types-procedures.reducer';
import { getDataSelector as getEncoursDataSelector } from '@reducers/encours.reducer';
import { getDataSelector as getProceduresDataSelector } from '@reducers/exec-procedure.reducer';
import { getDataSelector as getExercisesDataSelector } from '@reducers/exercise.reducer';
import {
  GetEncours,
  GetExercises,
  GetTypesProcedures,
  GetEngagementJuridiques,
  GetProcedures,
  GetAdministrativeUnites,
} from '@store/actions';

import {
  EncoursModel,
  EngagementJuridiqueModel,
  TypeProcedureModel,
  SubProgramActivityModel,
  SubProgramActionModel,
  SubProgramModel,
  ExecProcedureModel,
  SubProgramActivityTaskModel,
  AdministrativeUnitModel,
} from '@models/index';
import { flatten } from '@angular/compiler';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-create-engagement-form',
  templateUrl: './create-engagement-form.component.html',
  styleUrls: ['./create-engagement-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEngagementFormComponent
  extends BaseComponent
  implements OnInit
{
  loading$: Observable<boolean> = of(true);
  public exercises: ExerciseModel[] = [];
  public encours!: EncoursModel;
  public typesProcedures: TypeProcedureModel[] = [];
  public activities: SubProgramActivityModel[] = [];
  public actions: SubProgramActionModel[] = [];
  public sousProgrammes: SubProgramModel[] = [];
  public imputations: string[] = [];
  public tasks: SubProgramActivityTaskModel[] = [];
  public adminUnits: AdministrativeUnitModel[] = [];
  public procedures: ExecProcedureModel[] = [];

  public form: FormGroup;

  public busy = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();

    this.form = this._fb.group({
      id: [undefined],
      typeProcedure: this._fb.group({
        id: [undefined],
        imputation: [],
        code: [undefined, Validators.required],
        label: [],
      }),
      procedure: this._fb.group({
        id: [undefined],
        nomAgent: [undefined],
      }),
      exercise: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
      montantAE: [undefined],
      adminUnit: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
      imputation: [undefined],
      numero: [undefined],
      reference: [undefined],
      task: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
      activity: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
      action: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
      sousProgramme: this._fb.group({
        id: [undefined],
        code: [undefined],
      }),
    });
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this._store.dispatch(GetExercises({}));
    this._store.dispatch(GetProcedures());
    this._store.dispatch(GetAdministrativeUnites());
    this._store.dispatch(GetTypesProcedures());
    if (this.config.data?.item) {
      const {
        procedure,
        exercise,
        sousProgramme,
        action,
        activity,
        task,
        reference,
        numero,
        imputation,
        adminUnit,
        montantAE,
        etat,
      } = this.config.data?.item as EngagementJuridiqueModel;
      this.form.patchValue({
        procedure,
        exercise,
        sousProgramme,
        action,
        activity,
        task,
        reference,
        numero,
        imputation,
        adminUnit,
        montantAE,
        etat,
      });
      /*  this.agences =
        this.banques.find((item) => item.code === banque.code)?.agences ?? [];
        */
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store.dispatch(GetEncours());
    this._store.pipe(this.takeUntilDestroy, select(getDataSelector));
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.typesProcedures = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getExercisesDataSelector))
      .subscribe((payload) => {
        this.exercises = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getProceduresDataSelector))
      .subscribe((payload) => {
        this.procedures = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getEncoursDataSelector))
      .subscribe((payload) => {
        this.encours = payload[0];
        console.log('data', payload);
        this.sousProgrammes = [payload[0]?.sousProgramme];
        this.actions = payload[0]?.sousProgramme?.actions;

        this.activities = flatten(
          payload[0]?.actions?.map((item) => this.activities ?? [])
        );
        this.tasks = flatten(
          payload[0]?.activities?.map((item) => item.tasks ?? [])
        );
        this.adminUnits = payload[0]?.adminUnits;
        this.imputations = payload[0]?.imputations;
      });
  }

  submit() {
    this.busy = true;
    const editedEngagement = {
      ...this.form.value,
    } as EngagementJuridiqueModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<EngagementJuridiqueModel>('/engagements', editedEngagement)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetEngagementJuridiques());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.engagements.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.notfound';
            } else {
              err = 'errors.unknown';
            }
            this.busy = false;
            this._appService.showToast({
              detail: err,
              summary: 'errors.error',
              severity: 'error',
              life: 5000,
              closable: true,
            });
          }
        );
    } else {
      this._apisService
        .post<EngagementJuridiqueModel>('/engagements', editedEngagement)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetEngagementJuridiques());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.engagements.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.conflict';
            } else {
              err = 'errors.unknown';
            }
            this.busy = false;
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
  }

  onChange = (event: any) => {
    console.log('CHANGR§§§§§§§§§', event.value);
    this._fetchItem(event.value);
  };

  private _fetchItem(id: number) {
    //this.loading = true;
    this._apisService.get<EncoursModel>(`/encours/${id}`).subscribe(
      (res) => {
        //this.loading = false;
        //this.encours = res;
        /* console.log('EKIEEE ', res);
        this.actions = res.actions;
        this.sousProgrammes = [res.sousProgramme];
        this.activities = res.activities;
        this.tasks = res.tasks;
        this.adminUnits = res.adminUnits;
        this.imputations = res.imputations; */
      },
      (error) => {
        //this.loading = false;
        //this.notFound = true;
      }
    );
  }
}
