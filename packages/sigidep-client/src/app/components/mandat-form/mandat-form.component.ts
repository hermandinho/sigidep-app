import { GetCarnetMandats } from '@actions/carnets-mandats.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import {
  EtatEngagementMandatEnum,
  TypeMarcheEngagementMandatEnum,
} from '@models/engagement-mandat.model';
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

export class Type {
  name!: string;
}
@Component({
  selector: 'app-mandat-form',
  templateUrl: './mandat-form.component.html',
  styleUrls: ['./mandat-form.component.scss'],
})
export class MandatFormComponent extends BaseComponent implements OnInit {
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
  public mandatForm!: FormGroup;
  loading$: Observable<boolean> = of(true);
  data!: CarnetMandatModel[];
  typeMissions: Type[] = [];
  typeMarches: Type[] = [];
  carnet: any;
  // procedure: string = '';
  public typesMarche: any[] = [];
  constructor(
    private _store: Store<AppState>,
    private translate: TranslateService,
    private _appService: AppService
  ) {
    super();
    this.typesMarche = Object.keys(TypeMarcheEngagementMandatEnum).map(
      (key) => ({
        label: this.translate.instant(
          (TypeMarcheEngagementMandatEnum as any)[key]
        ),
        value: key,
      })
    );
    this._initListeners();
  }

  ngOnInit(): void {
    //this.procedure = JSON.parse(localStorage.getItem('procedure')!!);
    this._appService.currentProcedureChange.subscribe((val) => {
      this.procedure = val;
    });
    this.mandatForm = this.startingForm;
    this.subformInitialized.emit(this.mandatForm);
    if (this.readOnly) this.mandatForm.disable();
    this._store.dispatch(GetCarnetMandats());
    this.mandatForm.controls['matriculeGestionnaire'].disable();
    this.mandatForm.controls['nomGestionnaire'].disable();
    //this.mandatForm.controls['montantCPChiffres'].disable();
    this.setTypeMissions();
    this.setTypeMarches();
  }

  getMontantCPEnLettres() {
    return;
  }

  setTypeMarches() {
    this.translate
      .get(TypeMarcheEngagementMandatEnum.AVANCE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
    this.translate
      .get(TypeMarcheEngagementMandatEnum.DECOMPTE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
    this.translate
      .get(TypeMarcheEngagementMandatEnum.MARCHE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMarches.push(typemap);
      });
  }
  setTypeMissions() {
    this.translate
      .get(EtatEngagementMandatEnum.CONTROLE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
    this.translate
      .get(EtatEngagementMandatEnum.EFFECTUER)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
    this.translate
      .get(EtatEngagementMandatEnum.ORDINAIRE)
      .subscribe((res: string) => {
        const typemap: Type = {
          name: res,
        };
        this.typeMissions.push(typemap);
      });
  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log(data);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  onNumeroMandatChange = (event: any) => {
    const act = this.data.find((item) => item.code === event.value);
    this.carnet = act;
    if (act)
      this.mandatForm.patchValue({
        numero: act.code,
        matriculeGestionnaire: act.gestionnaire.matricule,
        nomGestionnaire: act.gestionnaire.nom,
        dateAffectation: act.dateAffectation,
      });
  };

  onBlur = () => {
    const currentValue = this.mandatForm.value?.montantCPChiffres || 0;
    this.mandatForm.patchValue({
      montantCPLettres: converter.toWords(currentValue),
    });
  };
}
