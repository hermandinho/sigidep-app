import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';
import { getDataSelector } from '@reducers/types-procedures.reducer';
import {
  getLoadingSelector as getEncoursLoadingSelector,
  getDataSelector as getEncoursDataSelector,
} from '@reducers/encours.reducer';

import { GetEncours } from '@store/actions';

import { EncoursModel, TypeProcedureModel } from '@models/index';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  public exercises: string[] = [];
  public encoursList!: EncoursModel[];
  public typesProcedures: TypeProcedureModel[] = [];
  public adminUnits: string[] = [];
  public paragraphes: string[] = [];

  public commonForm!: FormGroup;

  public imputationColumns = [
    {
      field: 'subProgram',
      title: 'tables.headers.sousProgram',
      sortable: true,
    },
    {
      field: 'action',
      title: 'tables.headers.action',
      sortable: true,
    },
    {
      field: 'activity',
      title: 'tables.headers.activity',
      sortable: true,
    },

    {
      field: 'task',
      title: 'tables.headers.task',
      sortable: true,
    },

    {
      field: 'imputation',
      title: 'tables.headers.imputation',
      sortable: true,
    },
    {
      field: 'operation',
      title: 'tables.headers.operation',
      sortable: true,
    },
    {
      field: 'aeDisponible',
      title: 'tables.headers.aeDisponible',
      sortable: true,
    },
    {
      field: 'cpDisponible',
      title: 'tables.headers.cpDisponible',
      sortable: true,
    },
    {
      field: 'aeDispoANouveau',
      title: 'tables.headers.aeDispoANouveau',
      sortable: true,
    },
    {
      field: 'cpDispoANouveau',
      title: 'tables.headers.cpDispoANouveau',
      sortable: true,
    },
    {
      field: 'gestionnaire',
      title: 'tables.headers.gestionnaire',
      sortable: true,
    },
    {
      field: 'modeGestion',
      title: 'tables.headers.modeGestion',
      sortable: true,
    },

    {
      field: 'region',
      title: 'tables.headers.region',
      sortable: true,
    },
    {
      field: 'department',
      title: 'tables.headers.department',
      sortable: true,
    },
    {
      field: 'arrondissement',
      title: 'tables.headers.arrondissement',
      sortable: true,
    },
    {
      field: 'localite',
      title: 'tables.headers.localite',
      sortable: true,
    },

    {
      field: 'aeInitRevisee',
      title: 'tables.headers.aeInitRevisee',
      sortable: true,
    },
    {
      field: 'cpInitRevisee',
      title: 'tables.headers.cpInitRevisee',
      sortable: true,
    },
  ];

  public selectedImputation!: EncoursModel;

  public busy = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    public translate: TranslateService
  ) {
    super();
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.commonForm?.value?.id;
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
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
    this.loading$ = this._store.pipe(
      select(getEncoursLoadingSelector),
      map((status) => status)
    );
    this._store.pipe(this.takeUntilDestroy, select(getDataSelector));
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.typesProcedures = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getEncoursDataSelector))
      .subscribe((payload) => {
        this.encoursList = payload;
        this.exercises = [
          ...new Set(this.encoursList.map((item) => item.exercise)),
        ];
        this.adminUnits = [
          ...new Set(this.encoursList.map((item) => item.adminUnit)),
        ];
        this.paragraphes = [
          ...new Set(this.encoursList.map((item) => item.paragraph)),
        ];
      });
  }
  submit() {
    this.changeStep.emit('forward');
  }

  onRowSelect = (event: any) => {
    this.commonForm.patchValue({
      imputation: this.selectedImputation.imputation,
      task: this.selectedImputation.task,
      activity: this.selectedImputation.activity,
      action: this.selectedImputation.action,
      subProgram: this.selectedImputation.subProgram,
    });
  };

  onChange = (event: any) => {
    this._fetchItem(event.value);
  };

  onChangeType = (event: any) => {
    const codeProcedure = this.typesProcedures.find(
      (item) => item.code === event.value
    )?.code;
    this.commonForm.patchValue({ codeProcedure });
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
