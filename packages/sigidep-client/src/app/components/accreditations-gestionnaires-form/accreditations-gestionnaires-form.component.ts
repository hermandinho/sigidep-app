import { AdministrativeUnitModel } from '@models/index';
import { GestionnaireModel } from './../../models/gestionnaire.model';
import { SubProgramModel } from './../../models/sub-program.model';
import { AgentModel } from '@models/agent.model';
import { ExerciseModel } from './../../models/exercise.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from './../../services/app.service';
import { ApisService } from './../../services/apis.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from './../base.component';
import { Component, OnInit } from '@angular/core';
import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import { EncoursModel } from '@models/encours.model';
import { getDataSelector, getLoadingSelector } from '@reducers/encours.reducer';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GetEncourByExercice, GetEncours } from '@actions/encours.actions';

@Component({
  selector: 'app-accreditations-gestionnaires-form',
  templateUrl: './accreditations-gestionnaires-form.component.html',
  styleUrls: ['./accreditations-gestionnaires-form.component.scss'],
})
export class AccreditationsGestionnairesFormComponent
  extends BaseComponent
  implements OnInit {
  public form: FormGroup;
  public busy = false;
  isEditMode = false;
  loadingRemoveAccreditation = false;
  loadingSaveAccreditation = false;
  public exercice = null;

  public loading$: Observable<boolean> = of(true);

  agentsList: AgentModel[] = [];
  exercicesInprogressList: ExerciseModel[] = [];
  subProgramsList: SubProgramModel[] = [];
  administrativeUnitList: AdministrativeUnitModel[] = [];

  // imputationsOperationsList: any[] = [];
  imputationsOperationsList: AccreditationGestionnaireModel[] = [];

  public allEncours: {
    startDate: Date;
    endDate: Date;
    element: EncoursModel;
  }[] = [];
  public filteredEncours: {
    startDate: Date;
    endDate: Date;
    element: EncoursModel;
  }[] = [];
  public selectedsEncours: {
    startDate: Date;
    endDate: Date;
    element: EncoursModel;
  }[] = [];
  public tasks: [] = [];
  public exercicesCodeList: string[] = [];

  constructor(
    private _fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      exercice: [undefined, []],
      gestionnaire: [undefined, [Validators.required]],
      typeAccreditation: [undefined, [Validators.required]],
      subProgram: [undefined, []],
      action: [undefined, []],
      activity: [undefined, []],
      task: [undefined, []],
      administrativeUnit: [undefined, []],
      id: [undefined, []],
      // startDate: [undefined, []],
      // endDate: [undefined, []],
    });

    this.listenForm();
  }
  private listenForm() {
    this.form.get('subProgram')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.allEncours.filter((e) =>
          e.element.subProgram == value.subProgram ? e : null
        );
      }
    });
    this.form.get('action')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.allEncours.filter((e) => {
          return e.element.action == value.action ? e : null;
        });
      }
    });
    this.form.get('task')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.allEncours.filter((e) =>
          e.element.task == value.task ? e : null
        );
      }
    });
    this.form.get('activity')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.allEncours.filter((e) => {
          return e.element.activity == value.activity ? e : null;
        });
      }
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.allEncours = [
          ...data.map((e) => ({
            element: e,
            startDate: new Date(),
            endDate: new Date(),
          })),
        ];
        this.filteredEncours = [...this.allEncours];
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  async ngOnInit(): Promise<void> {
    await this.getInitialData();
    this._initListeners();
    this._store.dispatch(GetEncours());
    if (this.config.data?.item) {
      const { id, matricule } = this.config.data?.item as GestionnaireModel;
      this.isEditMode = true;

      const a = this.agentsList.find((elt) => elt.matricule === matricule);
      this.form.get('agent')?.setValue(a);
      this.form.get('agent')?.disable();
    }
  }

  uniqueItemsWith(key: string) {
    let values = [
      ...new Map(
        this.allEncours.map((item: any) => [item.element[key], item.element])
      ).values(),
    ] as EncoursModel[];

    return values;
  }

  close() {
    this.ref.close();
  }

  async getInitialData() {
    const exercicesResult = await this._apisService
      .get<ExerciseModel[]>(`/exercises`) // TODO: reutiliser la ligne suivante
      // .get<ExerciseModel[]>(`/exercises?status=in_progress`)
      .toPromise();
    this.exercicesInprogressList = exercicesResult;

    const agentsResult = await this._apisService
      .get<AgentModel[]>(`/agents`)
      .toPromise();
    this.agentsList = agentsResult;

    const subProgramsResult = await this._apisService
      .get<SubProgramModel[]>(`/sub-programs`)
      .toPromise();
    this.subProgramsList = subProgramsResult;

    const administrativesUnitsResult = await this._apisService
      .get<AdministrativeUnitModel[]>(`/administrative-units`)
      .toPromise();
    this.administrativeUnitList = administrativesUnitsResult;
  }

  async getGestionnaireWithAccreditation() {
    const agentWithAcrreditationResult = await this._apisService
      .get<GestionnaireModel>(
        `/gestionnaires/agent/${this.form.get('agent')?.value.id}`
      )
      .toPromise();
    this.imputationsOperationsList =
      agentWithAcrreditationResult &&
        agentWithAcrreditationResult.accreditations.length > 0
        ? agentWithAcrreditationResult.accreditations
        : [
          // TODO: Juste pour le test, a retirer
          {
            createdAt: new Date(),
            dateDebut: new Date(),
            dateFin: new Date(),
            imputation: 'yo',
            labelOperation: 'test',
            id: 1,
            updatedAt: new Date(),
          },
        ];
  }

  async deleteAccreditation(item: AccreditationGestionnaireModel) {
    if (this.loadingRemoveAccreditation) return;
    this.loadingRemoveAccreditation = true;
    this._apisService
      .delete<any>(`/accreditations?ids=${item.id}`, {})
      .toPromise()
      .then((result: any) => {
        this.getGestionnaireWithAccreditation();
      })
      .catch((err: any) => {
        this._appService.showToast({
          detail: err,
          summary: 'errors.error',
          severity: 'error',
          life: 5000,
          closable: true,
        });
      })
      .finally(() => {
        this.loadingRemoveAccreditation = false;
      });
  }

  validDates(startDate: any, endDate: any) {
    return new Date(startDate) <= new Date(endDate);
  }

  async reset() {
    this.selectedsEncours = [];
    this.filteredEncours = [...this.allEncours];
    await this.ngOnInit();
  }

  addToSelected(item: {
    startDate: Date;
    endDate: Date;
    element: EncoursModel;
  }) {
    this.filteredEncours = [...this.filteredEncours.filter((e) => e != item)];
    this.selectedsEncours = [...this.selectedsEncours, item];
  }
  removeFromSelected(item: {
    startDate: Date;
    endDate: Date;
    element: EncoursModel;
  }) {
    this.selectedsEncours = [...this.selectedsEncours.filter((e) => e != item)];
    this.filteredEncours = [...this.filteredEncours, item];
  }

  submit() {
    const accreditation = {
      ...this.form.value,
      imputations: this.selectedsEncours,
    } as AccreditationGestionnaireModel;
    this.busy = true;
    this._apisService
      .post<AccreditationGestionnaireModel>('/accreditations', accreditation)
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._appService.showToast({
            summary: 'message.success',
            detail: 'messages.accreditation.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          this.busy = false;
          this.ref.close();
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.dejaRegion';
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
  /**
   * setOtherField
   */
  public setOtherField() {
    this._store.dispatch(GetEncourByExercice({ id: this.exercice!['code'] }));
  }
}
