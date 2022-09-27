import { SetAppBreadcrumb } from '@actions/app.actions';
import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableColumnsBordereau } from './consts';
import { BonEngagementModel } from '@models/bon-engagement.model';
import { GetTransmissionsReceptionsBons } from '@actions/bons-engagements.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/bons-engagements.reducer';
import { GetExercises } from '@actions/exercises.actions';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { EtatBonEnum } from '../../utils/etat-bon-engagement.enum';
import { ActivatedRoute } from '@angular/router';



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
  @Input() transmission!:string;
  @Input() etat!:string;
  @Input() etatedOrd!:any;
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
  bons_tmp: any[] = [];
  bon_engagement: BonEngagementModel[]=[];
  exercices:any;
  color:string='while';

  constructor(
    private _store: Store<AppState>,
    public translate: TranslateService,
    private route: ActivatedRoute
  ) {
    super();
    this.tableColumnsBordereau = TableColumnsBordereau;
    this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
      this._initListeners();

  }

  async ngOnInit(){

    this.constitutionForm = this.startingForm;
    this.subformInitialized.emit(this.constitutionForm);

    if(this.etatedOrd === EtatBonEnum.ORDONNANCEMENT){
      console.log('1')
      this.etat === EtatBonEnum.ORDONNANCEMENT
      this._store.dispatch(
        GetTransmissionsReceptionsBons({etats: [EtatBonEnum.ORDONNANCEMENT]})
      );
    }else {
      console.log('11')
      this._store.dispatch(
        GetTransmissionsReceptionsBons({etats: [this.etat]})
      );
    }

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

  searchSelect(event: any) {
    this.bons = this.bons_tmp;
    this.bons = this.bons_tmp.filter( (item) =>
        (item.bon_engagement?.numero ? item.bon_engagement?.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.numActeJuridique.numero ? item.bon_engagement?.numActeJuridique.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.numActeJuridique.imputation ? item.bon_engagement?.numActeJuridique.imputation.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.etat ? item.bon_engagement?.etat.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.objet ? item.bon_engagement?.objet.toLowerCase().includes(event.target.value.toLowerCase()) : '')||
        (item.bon_engagement?.numActeJuridique.montantAE ? item.bon_engagement?.numActeJuridique.montantAE.toString().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.montantCPChiffres ? item.bon_engagement?.montantCPChiffres.toString().includes(event.target.value.toLowerCase()): '') ||
       (item.bon_engagement?.dateEngagement ? item.bon_engagement?.dateEngagement.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
        (item.bon_engagement?.nomGestionnaire ? item.bon_engagement?.nomGestionnaire.toLowerCase().includes(event.target.value.toLowerCase()):'')
    );
  }
test(){
  this.etatedOrd = this.route.snapshot.queryParamMap.get('param');
  if(this.etatedOrd === EtatBonEnum.ORDONNANCEMENT){
    console.log('1')
    this.etat === EtatBonEnum.ORDONNANCEMENT
  }
}
  handleFilter = (event: any) => {
    if(event?.value){
        this._store.dispatch(
          GetTransmissionsReceptionsBons({exercices:[event?.value[0]?.toLowerCase()],etats: [this.etat]})
        );
    }else{
        this._store.dispatch(
          GetTransmissionsReceptionsBons({etats: [this.etat]})
        );
    }

};

  private async _initListeners() {
   // await this.test();
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

      if(this.etat !== ''){
        this._store
        .pipe(this.takeUntilDestroy, select(getDataSelector))
        .subscribe((data) => {
          this.bons = [...data];
          this.bons_tmp = [...data];
          console.log("bons ", this.bons)
        });

      this.loading$ = this._store.pipe(
        select(getLoadingSelector),
        map((status) => status)
      );
      }

  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  detail(item:any){
    if(this.bon_engagement.includes(item)){
      const index = this.bon_engagement.indexOf(item);
      console.log('index ', index)
      this.bon_engagement.splice(index,1);
      this.color='while';
    }else{
      console.log("l'element n'existe pas")
      this.bon_engagement.push(item)
      this.color='blue';
    }
    this.constitutionForm.patchValue({
      bon_engagement:this.bon_engagement,
      transmission:this.transmission
    });
  }

  selected(e:any) {
    if (e.target.checked) {
      console.log('selected')
      e.currentTarget.parentNode.style.backgroundColor = 'rgb(0, 140, 255)'
      const parent = e.currentTarget.parentNode;
      parent.children[0].style.backgroundColor = 'rgb(0, 140, 255)';
    }
    else {
      console.log('selected selected error')
      e.currentTarget.parentNode.style.backgroundColor = 'white'
      const parent = e.currentTarget.parentNode;
      parent.children[0].style.backgroundColor = 'white';
    }
  }

}
