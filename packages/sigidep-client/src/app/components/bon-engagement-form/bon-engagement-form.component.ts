import { GetCarnetMandats } from '@actions/carnets-mandats.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import {
  EtatBonEngagementEnum,
  TypeMarcheBonEngagementEnum,
} from '@models/bon-engagement.model';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/carnets-mandats.reducer';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as converter from 'number-to-words';
import { AppService } from '@services/app.service';
import { GetGestionnaires } from '../../store/actions/gestionnaires.actions';
import { getDataSelector as getDataSelectorGes, getLoadingSelector as getLoadingSelectorGes } from '@reducers/gestionnaires.reducer';
import { GestionnaireModel } from '../../models/gestionnaire.model';


export class Type {
  name!: string;
}
@Component({
  selector: 'app-bon-engagement-form',
  templateUrl: './bon-engagement-form.component.html',
  styleUrls: ['./bon-engagement-form.component.scss'],
})
export class BonEngagementFormComponent
  extends BaseComponent
  implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Input() procedure!: string;
  @Input() dataEngagement!: any;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public bonEngagementForm!: FormGroup;
  loading$: Observable<boolean> = of(true);
  data!: CarnetMandatModel[];
  typeMissions: Type[] = [];
  typeMarches: Type[] = [];
  carnet: any;
  public gestionnaires: GestionnaireModel[] = [];

  // procedure: string = '';
  public typesMarche: any[] = [];
  constructor(
    private _store: Store<AppState>,
    private translate: TranslateService,
    private _appService: AppService
  ) {
    super();
    this.typesMarche = Object.keys(TypeMarcheBonEngagementEnum).map((key) => ({
      label: this.translate.instant((TypeMarcheBonEngagementEnum as any)[key]),
      value: key,
    }));
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(
      GetGestionnaires()
    );
    if (!this.procedure) {
      this.procedure = this._appService.currentProcedure;
      console.log(this.procedure);
    }
    this.bonEngagementForm = this.startingForm;
    console.log(this.bonEngagementForm);
    this.subformInitialized.emit(this.bonEngagementForm);
    if (this.readOnly) this.bonEngagementForm.disable();
    this._store.dispatch(GetCarnetMandats());
/*     this.bonEngagementForm.controls['matriculeGestionnaire'].disable();*/
    this.bonEngagementForm.controls['nomGestionnaire'].disable();
    //this.bonEngagementForm.controls['montantCPChiffres'].disable();
    this.setTypeMissions();
    this.setTypeMarches();
  }

  getMontantCPEnLettres() {
    return;
  }

  setTypeMarches() {
    this.translate
      .get(TypeMarcheBonEngagementEnum.AVANCE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
    this.translate
      .get(TypeMarcheBonEngagementEnum.DECOMPTE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
    this.translate
      .get(TypeMarcheBonEngagementEnum.MARCHE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
  }
  setTypeMissions() {
    this.translate
      .get(EtatBonEngagementEnum.CONTROLE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
    this.translate
      .get(EtatBonEngagementEnum.EFFECTUER)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
    this.translate
      .get(EtatBonEngagementEnum.ORDINAIRE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
  }
  doChangeStep = (direction: any) => {
    this._appService.setCurrentProcedure(this.procedure);
    this.changeStep.emit(direction);
  };

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        if(this.dataEngagement){
          this.scanneElt(this.dataEngagement)
        }
        console.log(data);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorGes))
    .subscribe((data) => {
      this.gestionnaires = [...data];
    });

    this.loading$ = this._store.pipe(
      select(getLoadingSelectorGes),
      map((status) => status)
    );
  }

  onBlur = () => {
    const currentValue = this.bonEngagementForm.value?.montantCPChiffres || 0;
    this.bonEngagementForm.patchValue({
      montantCPLettres: converter.toWords(currentValue),
    });
  };


  scanneElt = (dataEngagement: any) => {
    if(dataEngagement){
      this.bonEngagementForm.patchValue({
        numero: dataEngagement?.numero,
        matriculeGestionnaire: dataEngagement?.matriculeGestionnaire,
        objet: dataEngagement?.objet,
        dateEngagement: dataEngagement?.dateEngagement,
        montantCPChiffres: dataEngagement?.montantCPChiffres,
        montantCPLettres: dataEngagement?.montantCPLettres,
        signataire: dataEngagement?.montantCPLettres,
      });
    }
  };

  onGestionnaireChange(event:any){
    const act: GestionnaireModel | undefined = this.gestionnaires.find(
      (item:GestionnaireModel) => item.matricule === event.value
    );
    console.log(act)
    if (act) {
      this.bonEngagementForm.patchValue({
        nomGestionnaire: act?.nom + '' + act?.prenom,
        matriculeGestionnaire: act?.matricule
      })
    }
  }
}
