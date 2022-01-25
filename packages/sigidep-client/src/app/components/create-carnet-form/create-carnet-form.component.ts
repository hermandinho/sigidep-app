import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { AgentModel } from '@models/agent.model';
import {
  getDataSelector as getGestionnairesDataSelector,
  getLoadingSelector as getGestionnairesLoadingSelector,
} from '@reducers/agents.reducer';

import {
  getDataSelector as getExercicesDataSelector,
  getLoadingSelector as getExercicesLoadingSelector,
} from '@reducers/exercise.reducer';

import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import { GetCarnetMandats } from '@actions/carnets-mandats.actions';
import { ExerciseModel } from '@models/exercise.model';

@Component({
  selector: 'app-create-carnet-form',
  templateUrl: './create-carnet-form.component.html',
  styleUrls: ['./create-carnet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCarnetFormComponent extends BaseComponent implements OnInit {
  public gestionnairesLoading$: Observable<boolean> = of(true);
  public gestionnaires: AgentModel[] = [];
  public exercices: ExerciseModel[] = [];
  public exercicesLoading$: Observable<boolean> = of(true);
  public assignment: boolean = false;
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
      code: [undefined, [Validators.required, Validators.maxLength(10)]],
      exercice: this._fb.group({
        id: [],
        code: [undefined, Validators.required],
        year: [],
      }),
      premierFeuillet: [
        undefined,
        [Validators.required, Validators.maxLength(10)],
      ],
      dernierFeuillet: [
        undefined,
        [Validators.required, Validators.maxLength(10)],
      ],
      dateAffectation: [undefined, this.dateValidator],
      dateRetrait: [undefined, this.dateValidator],
      matAgentRetrait: [
        undefined,
        [Validators.maxLength(7), Validators.minLength(7)],
      ],
      nomAgentRetrait: [undefined],
      numCniAgentRetrait: [undefined],
      dateDelivranceCni: [undefined, this.dateValidator],
      lieuDelivranceCni: [],
      gestionnaire: this._fb.group({
        id: [],
        matricule: [],
      }),
    });
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this.assignment = this.config.data?.assignment;
    if (this.config.data?.item) {
      const {
        id,
        code,
        premierFeuillet,
        dernierFeuillet,
        gestionnaire,
        dateAffectation,
        dateRetrait,
        matAgentRetrait,
        nomAgentRetrait,
        numCniAgentRetrait,
        dateDelivranceCni,
        lieuDelivranceCni,
        exercice,
      } = this.config.data?.item as CarnetMandatModel;
      this.form.patchValue({
        id,
        code,
        premierFeuillet,
        dernierFeuillet,
        gestionnaire,
        dateAffectation,
        dateRetrait,
        matAgentRetrait,
        nomAgentRetrait,
        numCniAgentRetrait,
        dateDelivranceCni,
        lieuDelivranceCni,
        exercice,
      });

      if (this.assignment) {
        this.form.controls['exercice'].disable();
        this.form.controls['code'].disable();
        this.form.controls['premierFeuillet'].disable();
        this.form.controls['dernierFeuillet'].disable();
      }
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getGestionnairesDataSelector))
      .subscribe((payload) => {
        this.gestionnaires = [...payload];
      });

    this.gestionnairesLoading$ = this._store.pipe(
      select(getGestionnairesLoadingSelector),
      map((status) => status)
    );

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

  submit() {
    this.busy = true;
    const editedCarnet = {
      ...this.form.value,
      exercice:
        this.exercices.find(
          (item) => item.code === this.form.value?.exercice?.code
        ) ?? null,
      gestionnaire:
        this.gestionnaires.find(
          (item) => item.matricule === this.form.value?.gestionnaire?.matricule
        ) ?? null,
      dateAffectation: this.form.value?.dateAffectation
        ? new Date(this.form.value?.dateAffectation).toISOString()
        : null,
      dateRetrait: this.form.value?.dateRetrait
        ? new Date(this.form.value?.dateRetrait).toISOString()
        : null,
      dateDelivranceCni: this.form.value?.dateDelivranceCni
        ? new Date(this.form.value?.dateDelivranceCni).toISOString()
        : null,
    } as CarnetMandatModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<CarnetMandatModel>('/carnets-mandats', editedCarnet)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetCarnetMandats());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.carnets.updateSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.carnets.notfound';
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
        .post<CarnetMandatModel>('/carnets-mandats', editedCarnet)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetCarnetMandats());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.carnets.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.agents.conflict';
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

  dateValidator = (control: FormControl): { [s: string]: any } | null => {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
        return { invalidDate: 'errors.futureDate' };
      }
    }
    return null;
  };
}
