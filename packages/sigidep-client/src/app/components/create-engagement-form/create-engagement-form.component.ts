import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

import {
  getDataSelector as getEngagementDataSelector,
  getLoadingSelector as getEngagementLoadingSelector,
} from '@reducers/engagement-juridique.reducer';

import { GetEncours, GetEngagementJuridiques } from '@store/actions';

import {
  EncoursModel,
  TypeProcedureModel,
  EngagementJuridiqueModel,
  EtatEngagementEnum,
} from '@models/index';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { imputationColumnsConst } from './consts';

@Component({
  selector: 'app-create-engagement-form',
  templateUrl: './create-engagement-form.component.html',
  styleUrls: ['./create-engagement-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateEngagementFormComponent
  extends BaseComponent
  implements OnInit
{
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  loading$: Observable<boolean> = of(true);
  public exercises: string[] = [];
  public encoursList!: EncoursModel[];
  public originalEncoursList!: EncoursModel[];
  public typesProcedures: TypeProcedureModel[] = [];
  public adminUnits: string[] = [];
  public paragraphes: string[] = [];

  public commonForm!: FormGroup;

  public imputationColumns = imputationColumnsConst;

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
    if (this.readOnly) this.commonForm.disable();
    this.subformInitialized.emit(this.commonForm);
  }

  close() {
    this.ref.close();
  }
  calculSommeMontantAE = (
    engagements: EngagementJuridiqueModel[],
    imputation: string
  ) => {
    const sommeMontantAE: number = engagements
      .filter(
        (item) =>
          item.imputation === imputation &&
          item.etat === EtatEngagementEnum.RESERVED
      )
      .map((item) => item.montantAE)
      .reduce((acc, curr) => acc + curr, 0);
    return sommeMontantAE;
  };
  private _initListeners() {
    this._store.dispatch(GetEncours());
    this._store.dispatch(GetEngagementJuridiques());
    this.loading$ = this._store.pipe(
      select(getEncoursLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getEncoursDataSelector))
      .subscribe((encoursPayload) => {
        this._store
          .pipe(this.takeUntilDestroy, select(getEngagementDataSelector))
          .subscribe((engagementPayload) => {
            if (encoursPayload != null) {
              this.encoursList = encoursPayload.map((item) => {
                const sommeMontantAE = this.calculSommeMontantAE(
                  engagementPayload,
                  item.imputation
                );
                return {
                  ...item,
                  aeDisponible: item.aeInitRevisee - sommeMontantAE,
                  cpDisponible: item.cpInitRevisee - sommeMontantAE,
                };
              });
              this.originalEncoursList = this.encoursList;
              this.exercises = [
                ...new Set(this.encoursList.map((item) => item.exercise)),
              ];
              this.adminUnits = [
                ...new Set(this.encoursList.map((item) => item.adminUnit)),
              ];
              this.paragraphes = [
                ...new Set(this.encoursList.map((item) => item.paragraph)),
              ];

              if (this.commonForm?.value?.id) {
                const operationId = this.commonForm.value?.operationId;

                const selected = this.encoursList.filter(
                  (item) => item.operation.id === operationId
                );
                if (operationId && selected)
                  this.selectedImputation = selected[0];
              }
            }
          });
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.typesProcedures = [...payload];
      });
  }
  submit() {
    this.changeStep.emit('forward');
  }

  onExerciseChange = (event: any) => {
    this.encoursList = this.originalEncoursList.filter(
      (item) => item.exercise === event.value
    );
  };
  onAdminUnitChange = (event: any) => {
    this.encoursList = this.originalEncoursList.filter(
      (item) => item.adminUnit === event.value
    );
  };
  onParagrapheChange = (event: any) => {
    this.encoursList = this.originalEncoursList.filter(
      (item) => item.paragraph === event.value
    );
  };

  onRowSelect = (event: any) => {
    this.commonForm.patchValue({
      imputation: this.selectedImputation.imputation,
      task: this.selectedImputation.task,
      activity: this.selectedImputation.activity,
      action: this.selectedImputation.action,
      subProgram: this.selectedImputation.subProgram,
      operationId: this.selectedImputation.operation.id,
      aeDisponible: this.selectedImputation.aeDisponible,
    });
    /*this.commonForm.controls['montantAE'].setValidators(
      Validators.max(this.selectedImputation.aeDisponible)
    );
    */
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
