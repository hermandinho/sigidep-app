import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { ExerciseModel } from '@models/exercise.model';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { GetExercises } from '@actions/exercises.actions';
import * as moment from 'moment';
import { BaseComponent } from '@components/base.component';
import { ContribuableModel } from '@models/contribuable.model';
import { GetContribuables } from '@actions/contribuables.actions';

@Component({
  selector: 'app-create-contribuable-form',
  templateUrl: './create-contribuable-form.component.html',
  styleUrls: ['./create-contribuable-form.component.scss'],
})
export class CreateContribuableFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public busy = false;
  public regimes = [
    { regime: 'REEL', label: 'contribuables.reel' },
    { regime: 'SIMPLIFIE', label: 'contribuables.simplifie' },
  ];

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined, []],
      code: [undefined, [Validators.required]],
      raisonSociale: [undefined, [Validators.required]],
      secteurActivite: [undefined, [Validators.required]],
      regimeFiscal: [undefined, [Validators.required]],
      adresse: [undefined, [Validators.required]],
      quartier: [undefined, [Validators.required]],
      localisation: [undefined, [Validators.required]],
      siege: [undefined, [Validators.required]],
      ville: [undefined, [Validators.required]],
      contact: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      rib: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;

    if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    }
    this._apisService
      .post<ContribuableModel>('/contribuables', {
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetContribuables());

          this._appService.showToast({
            detail: 'messages.success',
            summary: 'messages.contribuables.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          console.log(error);
          let err = 'errors.contribuables.conflict';
          if (error?.statusCode === 409) {
            err = 'errors.contribuables.conflict';
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
