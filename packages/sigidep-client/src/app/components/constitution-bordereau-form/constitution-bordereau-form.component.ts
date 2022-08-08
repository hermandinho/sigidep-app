import { SetAppBreadcrumb } from '@actions/app.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableColumnsBordereau } from './consts';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { BonEngagementModel } from '@models/bon-engagement.model';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { GetTransmissionsReceptionsBons } from '@actions/bons-engagements.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/bons-engagements.reducer';
import { GetExercises } from '@actions/exercises.actions';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';



@Component({
  selector: 'app-constitution-bordereau-form',
  templateUrl: './constitution-bordereau-form.component.html',
  styleUrls: ['./constitution-bordereau-form.component.scss']
})
export class ConstitutionBordereauFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() dataEngagement!: any;
  @Input() readOnly!: boolean;
  @Input() isCheck!:boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public constitutionForm!: FormGroup;
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  loading1$: Observable<boolean> = of(true);

  public tableColumnsTransmission:any[]=[];
  public tableColumnsBordereau:any[]=[];
  public bordereauxTransmissions:any[]=[];
  public dossiersBordereaux:any[]=[];
  public globalColumnsTransmission!: string[];
  public globalColumnsBordereaux!: string[];
  public filters: any[] = [];
  public selectedFilters!: string[];
  data: any[] = [];
  bons: any[] = [];
  bon_engagement: BonEngagementModel[]=[];
  exercices:any;





  constructor(
    private _store: Store<AppState>,
    public translate: TranslateService,
    public ref: DynamicDialogRef
  ) {
    super();
    this.tableColumnsBordereau = TableColumnsBordereau;
    this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this.constitutionForm = this.startingForm;
    console.log('constitutionForm',this.constitutionForm)
    this.subformInitialized.emit(this.constitutionForm);
    this._store.dispatch(
      GetTransmissionsReceptionsBons({})
    );
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({})
    );
    this._store.dispatch(
      GetExercises({})
    );
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.transmissionsReceptions',
          },
        ],
      })
    );

  }

  handleFilter = (event: any) => {
    if(event?.value){
      this._store.dispatch(
        GetTransmissionsReceptionsBons({exercices:[event?.value[0]?.toLowerCase()]})
      );
      this._store.dispatch(
        GetTransmissionsReceptionsDetails({exercices:[event?.value[0]?.toLowerCase()]})
      );
    }else{
      this._store.dispatch(
        GetTransmissionsReceptionsBons({})
      );
      this._store.dispatch(
        GetTransmissionsReceptionsDetails({})
      );
    }

};

  private _initListeners() {

    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelector))
    .subscribe((data) => {
      this.bons = [...data];
      //this.bons = [...data];
      console.log("bons ", this.bons)
    });

  this.loading$ = this._store.pipe(
    select(getLoadingSelector),
    map((status) => status)
  );

  this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
    .subscribe((data) => {
      this.dossiersBordereaux = [...data];
      console.log('dossiersBordereaux ', this.dossiersBordereaux)

    });

    this.loading1$ = this._store.pipe(
      select(getLoadingSelectorDetail),
      map((status) => status)
    );

    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorEx))
    .subscribe((data) => {
      this.exercices = [...data];
      console.log('exercices ', this.exercices)

    });

    this.loading1$ = this._store.pipe(
      select(getLoadingSelectorEx),
      map((status) => status)
    );

  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
  close() {
    this.ref.close();
  }

  detail(item:any){
    this.bon_engagement.push(item);
    console.log('bon_engagement',this.bon_engagement)
    this.constitutionForm.patchValue({
      bon_engagement:this.bon_engagement
    });
    console.log('constitutionForm',this.constitutionForm)
  }


}
