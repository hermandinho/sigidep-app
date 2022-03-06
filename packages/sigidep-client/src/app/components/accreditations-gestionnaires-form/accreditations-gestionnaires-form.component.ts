import { AdministrativeUnitModel } from '@models/index';
import { GestionnaireModel } from './../../models/gestionnaire.model';
import {
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
} from '@models/sub-program.model';
import { SubProgramModel } from './../../models/sub-program.model';
import { AgentModel } from '@models/agent.model';
import { ExerciseModel } from './../../models/exercise.model';
import { ContribuableBugetaireModel } from '@models/contribuable-budgetaire.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from './../../services/app.service';
import { ApisService } from './../../services/apis.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from './../base.component';
import { Component, OnInit } from '@angular/core';
import { GetContribuablesBugetaires } from '@actions/contribuables-budgetaires.actions';
import { BankModel } from '@models/banque.model';
import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import { EncoursModel } from '@models/encours.model';
import { FilterService } from './filter.service';
import { getDataSelector, getLoadingSelector } from '@reducers/encours.reducer';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-accreditations-gestionnaires-form',
  templateUrl: './accreditations-gestionnaires-form.component.html',
  styleUrls: ['./accreditations-gestionnaires-form.component.scss'],
})
export class AccreditationsGestionnairesFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public busy = false;
  isEditMode = false;
  loadingRemoveAccreditation = false;
  loadingSaveAccreditation = false;

  public loading$: Observable<boolean> = of(true);

  agentsList: AgentModel[] = [];
  exercicesInprogressList: ExerciseModel[] = [];
  subProgramsList: SubProgramModel[] = [];
  administrativeUnitList: AdministrativeUnitModel[] = [];

  // imputationsOperationsList: any[] = [];
  imputationsOperationsList: AccreditationGestionnaireModel[] = [];

  public allEncours: EncoursModel[] = [];
  public filteredEncours: EncoursModel[] = [];
  public selectedsEncours: EncoursModel[] = [];
  public tasks:[] = []
  public exercicesCodeList:string[] = []

  constructor(
    private _fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private filterService: FilterService
  ) {
    super();
    this.form = this._fb.group({
      exercice: [undefined, [Validators.required]],
      agent: [undefined, [Validators.required]],
      typeAccreditation: [undefined, [Validators.required]],
      subProgram: [undefined, []],
      action: [undefined, []],
      activity: [undefined, []],
      task: [undefined, []],
      administrativeUnit: [undefined, [Validators.required]],
      id: [undefined, []],
    });

    this.listenForm()
  }
  private listenForm() {
    this.form.get('subProgram')?.valueChanges.subscribe((value) =>{
      if (value) {
        this.filteredEncours = this.filteredEncours.filter(e=>e.subProgram==value)
      }
    })

    this.form.get('action')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.filteredEncours.filter(e => e.action == value)
      }
    })
    this.form.get('task')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.filteredEncours.filter(e => e.task == value)
      }
    })
    this.form.get('activity')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.filteredEncours.filter(e => e.activity == value)
      }
    })
    this.form.get('activity')?.valueChanges.subscribe((value) => {
      if (value) {
        this.filteredEncours = this.filteredEncours.filter(e => e.activity == value)
      }
    })
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.allEncours = [...data];
        this.filteredEncours = [...data];
        console.log('.........', data);
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
    this._initListeners()

    if (this.config.data?.item) {
      const { id, matricule } = this.config.data?.item as GestionnaireModel;
      /* this.form.patchValue({
        id,
        code,
        raisonSociale,
        exercice,
        banque,
        agence,
        numeroCompte,
        cle,
      }); */
      this.isEditMode = true;

      const a = this.agentsList.find((elt) => elt.matricule === matricule);
      this.form.get('agent')?.setValue(a);
      this.form.get('agent')?.disable();
    }
  }

  uniqueItemsWith(key:string) {
    return [...new Map(this.allEncours.map((item:any) =>
      [item[key], item])).values()] as EncoursModel[];
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
    this.imputationsOperationsList = agentWithAcrreditationResult && agentWithAcrreditationResult.accreditations.length>0
      ? agentWithAcrreditationResult.accreditations
      : [
        // TODO: Juste pour le test, a retirer
        {
          createdAt: new Date(),
          dateDebut: new Date(),
          dateFin: new Date(),
          imputation: "yo",
          labelOperation: "test",
          id: 1,
          updatedAt: new Date(),
        }
      ];
  }

  async saveAccreditation() {
    const item = this.imputationsOperationsList.find((elt) => !elt.id);

    if (item) {
      this.busy = true;

      try {
        const seletedAgent = this.form.get('agent')?.value as AgentModel;
        let gestionnaire: GestionnaireModel | undefined =
          seletedAgent.gestionnaire;

        //const item2 = this.imputationsOperationsList.find((elt) => elt.id);
        if (!seletedAgent.gestionnaire) {
          gestionnaire = await this._apisService
            .post<GestionnaireModel>(`/gestionnaires`, {
              matricule: seletedAgent.matricule,
              nom: seletedAgent.nom,
              prenom: seletedAgent.prenom,
              fonction: seletedAgent.fonction,

              agent: seletedAgent,
            })
            .toPromise();
        }

        await (() => {
          if (!item.id) {
            return this._apisService.post<ContribuableBugetaireModel>(
              `/accreditations`,
              {
                ...item,
                gestionnaire,
              }
            );
          } else {
            return this._apisService.patch<ContribuableBugetaireModel>(
              `/accreditations/${item['id']}`,
              {
                ...item,
                gestionnaire,
              }
            );
          }
        })().toPromise();

        this.getGestionnaireWithAccreditation();

        this.form.get('administrativeUnit')?.setValue(undefined);
        this.form.get('subProgram')?.setValue(undefined);
        this.form.get('action')?.setValue(undefined);
        this.form.get('activity')?.setValue(undefined);
        this.form.get('task')?.setValue(undefined);
      } catch (error: any) {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.paragraphs.conflict';
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
      } finally {
        this.busy = false;
      }
    }
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
      .finally(()=>{
        this.loadingRemoveAccreditation = false;
      });
  }

  submit() {

  }

}
