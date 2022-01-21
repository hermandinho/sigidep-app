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
import { Observable, of, Subject } from 'rxjs';
import { GradeModel } from '@models/grade.model';
import { CategorieAgentModel } from '@models/categorie-agent.model';
import { AgentModel } from '@models/agent.model';
import { GetAgents } from '@actions/agents.actions';
import {
  getDataSelector as getCategoriesDataSelector,
  getLoadingSelector as getCategoriesLoadingSelector,
} from '@reducers/categories-agents.reducer';

import {
  getDataSelector as getGradesDataSelector,
  getLoadingSelector as getGradesLoadingSelector,
} from '@reducers/grades.reducer';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-create-agent-form',
  templateUrl: './create-agent-form.component.html',
  styleUrls: ['./create-agent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAgentFormComponent extends BaseComponent implements OnInit {
  public grades: GradeModel[] = [];
  gradesLoading$: Observable<boolean> = of(true);
  categoriesLoading$: Observable<boolean> = of(true);
  public categories: CategorieAgentModel[] = [];

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
      id: [],
      matricule: [
        undefined,
        [Validators.required, Validators.maxLength(7), Validators.minLength(7)],
      ],
      nom: [undefined, Validators.required],
      prenom: [],
      dateNaissance: [undefined, [this.dateValidator]],
      lieuNaissance: [undefined],
      refActeRecrutement: [undefined],
      dateRecrutement: [undefined, [this.dateValidator]],
      signataireActeRecrutement: [undefined],
      structureRattach: [undefined],
      serviceRattach: [undefined],
      refActeAffectation: [undefined],
      dateSignAffectation: [undefined, [this.dateValidator]],
      signataireActeAffectation: [undefined],
      posteTravail: [undefined],
      fonction: [undefined],
      refActeNomination: [undefined],
      dateNomination: [undefined, [this.dateValidator]],
      signataireNomination: [undefined],
      echelon: [undefined, [Validators.min(1)]],
      indice: [undefined, [Validators.min(1)]],
      dateSignNomination: [undefined, [this.dateValidator]],
      signataireActeNomination: [undefined],
      grade: this._fb.group({
        id: [],
        code: [],
        description: [],
      }),
      categorie: this._fb.group({
        id: [],
        code: [],
        description: [],
      }),
    });
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        id,
        matricule,
        nom,
        prenom,
        dateNaissance,
        lieuNaissance,
        refActeRecrutement,
        dateRecrutement,
        signataireActeRecrutement,
        structureRattach,
        serviceRattach,
        refActeAffectation,
        dateSignAffectation,
        signataireActeAffectation,
        posteTravail,
        fonction,
        refActeNomination,
        dateNomination,
        signataireNomination,
        echelon,
        indice,
        dateSignNomination,
        signataireActeNomination,
        grade,
        categorie,
      } = this.config.data?.item as AgentModel;
      this.form.patchValue({
        id,
        matricule,
        nom,
        prenom,
        dateNaissance,
        lieuNaissance,
        refActeRecrutement,
        dateRecrutement,
        signataireActeRecrutement,
        structureRattach,
        serviceRattach,
        refActeAffectation,
        dateSignAffectation,
        signataireActeAffectation,
        posteTravail,
        fonction,
        refActeNomination,
        dateNomination,
        signataireNomination,
        echelon,
        indice,
        dateSignNomination,
        signataireActeNomination,
        grade,
        categorie,
      });
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getGradesDataSelector))
      .subscribe((payload) => {
        this.grades = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getCategoriesDataSelector))
      .subscribe((payload) => {
        this.categories = [...payload];
      });

    this.gradesLoading$ = this._store.pipe(
      select(getGradesLoadingSelector),
      map((status) => status)
    );
    this.categoriesLoading$ = this._store.pipe(
      select(getCategoriesLoadingSelector),
      map((status) => status)
    );
  }

  submit() {
    this.busy = true;
    const editedAgent = {
      ...this.form.value,
      grade: this.grades.find(
        (item) => item.code === this.form.value?.grade?.code
      ),
      categorie: this.categories?.find(
        (item) => item.code === this.form.value?.categorie?.code
      ),
      dateNaissance: this.form.value?.dateNaissance
        ? new Date(this.form.value?.dateNaissance).toISOString()
        : undefined,
      dateRecrutement: this.form.value?.dateRecrutement
        ? new Date(this.form.value?.dateRecrutement).toISOString()
        : undefined,
      dateNomination: this.form.value?.dateNomination
        ? new Date(this.form.value?.dateNomination).toISOString()
        : undefined,
      dateSignAffectation: this.form.value?.dateSignAffectation
        ? new Date(this.form.value?.dateSignAffectation).toISOString()
        : undefined,
      dateSignNomination: this.form.value?.dateSignNomination
        ? new Date(this.form.value?.dateSignNomination).toISOString()
        : undefined,
    } as AgentModel;

    if (this.isUpdateForm) {
      this._apisService.put<AgentModel>('/agents', editedAgent).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetAgents());
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.agents.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.agents.notfound';
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
      this._apisService.post<AgentModel>('/agents', editedAgent).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetAgents());
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.agents.createSuccess',
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
