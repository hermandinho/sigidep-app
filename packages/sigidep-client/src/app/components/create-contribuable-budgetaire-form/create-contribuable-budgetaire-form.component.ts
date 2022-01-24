import { ExerciseModel } from './../../models/exercise.model';
import { AgenceModel } from './../../models/agence.model';
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

@Component({
  selector: 'app-create-contribuable-budgetaire-form',
  templateUrl: './create-contribuable-budgetaire-form.component.html',
  styleUrls: ['./create-contribuable-budgetaire-form.component.scss'],
})
export class CreateContribuableBudgetaireFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public busy = false;
  isEditMode = false;

  banksList: BankModel[] = [];
  agencesList: AgenceModel[] = [];
  exercicesInprogressList: ExerciseModel[] = [];

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
      code: [undefined],
      raisonSociale: [undefined, [Validators.required]],
      exercice: [undefined, [Validators.required]],
      banque: [undefined, [Validators.required]],
      agence: [undefined, [Validators.required]],
      numeroCompte: [
        undefined,
        [Validators.required, Validators.pattern('[0-9]{11}')],
      ],
      cle: [undefined, [Validators.required, Validators.pattern('[0-9]{2}')]],
      id: [undefined, []],
    });

    this.form.get('banque')?.valueChanges.subscribe((val: BankModel) => {
      if (val.id) {
        this.agencesList = val.agences;
      } else {
        this.agencesList = [];
      }
      this.form.get('agence')?.setValue(undefined);
    });
    this.form.get('code')?.disable();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  async ngOnInit(): Promise<void> {

    await this.getInitialData();

    if (this.config.data?.item) {
      const {
        id,
        code,
        raisonSociale,
        exercice,
        banque,
        agence,
        numeroCompte,
        cle,
      } = this.config.data?.item as ContribuableBugetaireModel;
      this.form.patchValue({
        id,
        code,
        raisonSociale,
        exercice,
        banque,
        agence,
        numeroCompte,
        cle,
      });
      this.isEditMode = true;

      const b = this.banksList.find(elt => elt.id === banque.id);
      this.form.get('banque')?.setValue(b);
      
    }
  }

  close() {
    this.ref.close();
  }

  async getInitialData() {
    const banksResult = await this._apisService
      .get<BankModel[]>(`/banks`)
      .toPromise();
    this.banksList = banksResult;

    const exercicesResult = await this._apisService
      .get<ExerciseModel[]>(`/exercises?status=in_progress`)
      .toPromise();
    this.exercicesInprogressList = exercicesResult;
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
