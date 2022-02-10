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
import { Store } from '@ngrx/store';
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

  agentsList: AgentModel[] = [];
  exercicesInprogressList: ExerciseModel[] = [];
  subProgramsList: SubProgramModel[] = [];
  administrativeUnitList: AdministrativeUnitModel[] = [];

  imputationsOperationsList: AccreditationGestionnaireModel[] = [];

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
      exercice: [undefined, [Validators.required]],
      agent: [undefined, [Validators.required]],
      typeAccreditation: [undefined, [Validators.required]],
      subProgram: [undefined, [Validators.required]],
      action: [undefined, [Validators.required]],
      activity: [undefined, [Validators.required]],
      task: [undefined, []],

      administrativeUnit: [undefined, [Validators.required]],
      id: [undefined, []],
    });

    this.form.get('agent')?.valueChanges.subscribe((val: AgentModel) => {
      if (val) {
        this.getGestionnaireWithAccreditation();
      }
    });

    this.form
      .get('typeAccreditation')
      ?.valueChanges.subscribe((val: SubProgramActivityModel) => {
        if (val) {
          this.form.get('administrativeUnit')?.setValue(undefined);
          this.form.get('subProgram')?.setValue(undefined);
          this.form.get('action')?.setValue(undefined);
          this.form.get('activity')?.setValue(undefined);
          this.form.get('task')?.setValue(undefined);
        }
      });

    this.form
      .get('subProgram')
      ?.valueChanges.subscribe((val: SubProgramActivityModel) => {
        if (val) {
          this.form.get('action')?.setValue(undefined);
          this.form.get('activity')?.setValue(undefined);
          this.form.get('task')?.setValue(undefined);
        }
      });

    /* this.form
      .get('activity')
      ?.valueChanges.subscribe((val: SubProgramActivityModel) => {
        if (val) {
          // Let Add new Item iside table
          const ac = new AccreditationGestionnaireModel({});

          // Let Build Imputation Number
          const { exercice, agent, subProgram, action, activity, task } =
            this.form.value;
          ac.imputation = `${exercice.code} ${agent.matricule} ${subProgram.code} ${action.code} ${val.code}`;

          const found = this.imputationsOperationsList.find(
            (elt) => elt.imputation === ac.imputation || !elt.id
          );

          if (!found) {
            this.imputationsOperationsList.push(ac);
          }
        }
      }); */

    this.form
      .get('task')
      ?.valueChanges.subscribe((val: SubProgramActivityTaskModel) => {
        if (val) {
          // Let Add new Item inside table
          const ac = new AccreditationGestionnaireModel({});

          // Let Build Imputation Number
          const { exercice, agent, subProgram, action, activity } =
            this.form.value;
          ac.imputation = `${exercice.code} ${agent.matricule} ${subProgram.code} ${action.code} ${activity.code} ${val.code}`;

          const found = this.imputationsOperationsList.find(
            (elt) => elt.imputation === ac.imputation || !elt.id
          );

          if (!found) {
            this.imputationsOperationsList.push(ac);
          }
        }
      });

    this.form
      .get('administrativeUnit')
      ?.valueChanges.subscribe((val: AdministrativeUnitModel) => {
        if (val) {
          // Let Add new Item iside table
          const ac = new AccreditationGestionnaireModel({});

          // Let Build Imputation Number
          const { exercice, agent, administrativeUnit } = this.form.value;
          ac.imputation = `${exercice.code} ${agent.matricule} ${administrativeUnit.code}`;

          const found = this.imputationsOperationsList.find(
            (elt) => elt.imputation === ac.imputation || !elt.id
          );

          if (!found) {
            this.imputationsOperationsList.push(ac);
          }
        }
      });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  async ngOnInit(): Promise<void> {
    await this.getInitialData();

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

  close() {
    this.ref.close();
  }

  async getInitialData() {
    const exercicesResult = await this._apisService
      .get<ExerciseModel[]>(`/exercises?status=in_progress`)
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
    this.imputationsOperationsList = agentWithAcrreditationResult
      ? agentWithAcrreditationResult.accreditations
      : [];
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

    /* this._appService.showConfirmation({
      message: 'dialogs.messages.deleteAccreditation',
      
      accept: () => {
       
      },
    }); */
    this._apisService
      .delete<any>(`/accreditations?ids=${item.id}`, {})
      .toPromise()
      .then((result: any) => {
        this.loadingRemoveAccreditation = false;
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
        this.loadingRemoveAccreditation = false;
      });
  }

  submit() {
    this.busy = true;

    /* if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    } */

    (() => {
      if (!this.isUpdateForm) {
        return this._apisService.post<ContribuableBugetaireModel>(
          `/contribuables-budgetaires`,
          {
            ...this.form.value,
          }
        );
      } else {
        return this._apisService.patch<ContribuableBugetaireModel>(
          `/contribuables-budgetaires/${this.form.value['id']}`,
          {
            ...this.form.value,
          }
        );
      }
    })().subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
        this._store.dispatch(GetContribuablesBugetaires());

        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.paragraphs.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
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
      }
    );
  }
}
