import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

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

  public commonForm!: FormGroup;

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
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.commonForm?.value?.id;
  }

  doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }

  ngOnInit(): void {
    this.commonForm = this.startingForm;
    this.subformInitialized.emit(this.commonForm);
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
        //console.log('data', payload);
        /*  this.sousProgrammes = [payload[0]?.sousProgramme];
        this.actions = payload[0]?.sousProgramme?.actions;

        this.activities = flatten(
          payload[0]?.actions?.map((item) => this.activities ?? [])
        );
        this.tasks = flatten(
          payload[0]?.activities?.map((item) => item.tasks ?? [])
        );
        this.adminUnits = payload[0]?.adminUnits;
        this.imputations = payload[0]?.imputations;
        */
      });
  }
  submit() {
    this.changeStep.emit('forward');
  }

  onChange = (event: any) => {
    this._fetchItem(event.value);
  };

  onChangeType = (event: any) => {
    const typeProcedure = this.typesProcedures.find(
      (item) => item.code === event.value
    );
    this.commonForm.patchValue({ typeProcedure });
    this.subformInitialized.emit(this.commonForm);
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
