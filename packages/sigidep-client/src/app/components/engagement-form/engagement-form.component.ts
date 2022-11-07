import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '@components/base.component';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import {
  getDataSelector as getMissionDataSelector,
  getLoadingSelector as getMissionLoadingSelector,
} from '@reducers/engagement-mission.reducer';
import {
  getDataSelector as getDecisionDataSelector,
  getLoadingSelector as getDecisionLoadingSelector,
} from '@reducers/engagement-decision.reducer';

import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/engagements.reducer';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import {
  EngagementJuridiqueModel,
  EtatEngagementEnum,
} from '@models/engagement-juridique.model';
import { map } from 'rxjs/operators';
import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { CategorieProcedure, Engagement } from 'app/utils/types';
import { GetEngagementJuridiquesByCategory } from '@actions/engagements.actions';

@Component({
  selector: 'app-engagement-form',
  templateUrl: './engagement-form.component.html',
  styleUrls: ['./engagement-form.component.scss'],
})
export class EngagementFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() dataEngagement!: any;
  @Input() readOnly!: boolean;
  @Input() isCheck!:boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Input() category: CategorieProcedure = 'decision';
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public engagementForm!: FormGroup;
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  missions!: EngagementMissionModel[];
  act:any;
  public engagements!: (
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel
  )[];
  procedure?: string;

  constructor(public ref: DynamicDialogRef, private _store: Store<AppState>) {
    super();
    this._initListeners();
  }

  ngOnInit(): void {
    console.log('engagements',this.engagements)
    this.engagementForm = this.startingForm;
   // console.log('engagementForm',this.engagementForm)
    this.subformInitialized.emit(this.engagementForm);
    if (this.readOnly) this.engagementForm.disable();

    //prime procedure code is 1121
    this._store.dispatch(
      GetEngagementJuridiquesByCategory({
        category: this.category,
        etats: [EtatEngagementEnum.RESERVED]
      })

      );

    /*
    GetEngagementDecisions({
      //procedures: [procedure],
      etats: [EtatEngagementEnum.SAVE],
    })
    */
    this.onDisable();
  }
  onDisable() {
    this.engagementForm.controls['codeProcedure'].disable();
    this.engagementForm.controls['reference'].disable();
    this.engagementForm.controls['dateSignature'].disable();
    this.engagementForm.controls['signatairej'].disable();
    this.engagementForm.controls['objetj'].disable();
    this.engagementForm.controls['imputation'].disable();
    this.engagementForm.controls['nomBeneficaire'].disable();
    this.engagementForm.controls['matriculeBeneficaire'].disable();
    this.engagementForm.controls['montantBrut'].disable();
    this.engagementForm.controls['montantIRNC'].disable();
    this.engagementForm.controls['netAPercevoir'].disable();
    this.engagementForm.controls['nomUnitAdminBenef'].disable();
    this.engagementForm.controls['codeUnitAdminBenef'].disable();
    this.engagementForm.controls['montantAE'].disable();
    this.engagementForm.controls['montantBrut'].disable();
    this.engagementForm.controls['montantIRNC'].disable();
    this.engagementForm.controls['numContribuable'].disable();
    this.engagementForm.controls['raisonSociale'].disable();
    this.engagementForm.controls['taxesApplicable'].disable();
    this.engagementForm.controls['tauxTVA'].disable();
    this.engagementForm.controls['tauxIR'].disable();
    this.engagementForm.controls['RIB'].disable();
    this.engagementForm.controls['itineraire'].disable();
    this.engagementForm.controls['dateDebut'].disable();
    this.engagementForm.controls['dateFin'].disable();
    this.engagementForm.controls['nombreJours'].disable();
    this.engagementForm.controls['baremeJour'].disable();
    this.engagementForm.controls['montantMission'].disable();
    this.engagementForm.controls['numeroj'].disable();
  }
  onActeJuridiqueChange = (event: any) => {
    const act: Engagement | undefined = this.engagements.find(
      (item:any) => item.id === event.value
    );
    console.log(act)
    localStorage.setItem('imputation', JSON.stringify(act?.imputation));
    this.procedure = act?.codeProcedure;
    if (act) {
      this.engagementForm.patchValue({
        codeProcedure: act?.codeProcedure,
        reference: act?.reference,
        dateSignature: act?.dateSignature,
        signatairej: act?.signataire,
        objetj: act?.objet,
        imputation: act?.imputation,
        numeroj: act?.numero,
        montantAE: act?.montantAE,
        matriculeBeneficaire: (act as any)?.matriculeBeneficiaire || '',
        nomBeneficaire: (act as any)?.nomBeneficiaire,
        netAPercevoir: (act as any)?.netAPercevoir,
        nomUnitAdminBenef: (act as any)?.nomUnitAdminBenef,
        codeUnitAdminBenef: (act as any)?.codeUnitAdminBenef,
        montantBrut: (act as any)?.montantBrut,
        montantIRNC: (act as any)?.montantIRNC,
        montantTVA: (act as any)?.montantTVA,
        numContribuable:
          (act as any)?.numContribuable || (act as any)?.niuContribuable,
        raisonSociale: (act as any)?.raisonSociale,
        taxesApplicable: (act as any)?.taxesApplicable,
        tauxTVA: (act as any)?.tauxTVA,
        tauxIR: (act as any)?.tauxIR,
        itineraire: (act as any)?.itineraire,
        dateDebut: (act as any)?.dateDebut,
        dateFin: (act as any)?.dateFin,
        nombreJours: (act as any)?.nombreJours,
        montantMission: (act as any)?.montant,
        baremeJour: (act as any)?.baremeJour?.montant,
        RIB:
          (act as any)?.codeBanqueContribuable +
          (act as any)?.codeAgenceContribuable +
          (act as any)?.numeroCompteContribuable +
          (act as any)?.cleCompteContribuable,

      });

      this.subformInitialized.emit(this.engagementForm);
    }
  };

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
  close() {
    this.ref.close();
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.engagements = [...data];
        /* if(this.dataEngagement){
          this.scanneEl();
        } */
        if (this.engagementForm != undefined) {
          this.scanneElt(this.engagementForm.value);
        }
      });

    this.loading$ = this._store.pipe(
      select(getDecisionLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getMissionDataSelector))
      .subscribe((payload) => {
        this.missions = [...payload];
      });
    this.loading$ = this._store.pipe(
      select(getMissionLoadingSelector),
      map((status) => status)
    );
  }

  scanneElt = (event: any) => {
    if(this.dataEngagement){
      //console.log("existe")
      if(this.dataEngagement?.numActeJuridique){
         const test =this.dataEngagement?.numActeJuridique;
        if(test.codeProcedure==='1121'){
          this._store.dispatch(
            GetEngagementJuridiquesByCategory({
              category: 'mission',
            })
          );
          this.act = this.engagements.find(
            (item:any) => item.id === test.id
          );
        }

        if(test.codeProcedure==='1122'||test.codeProcedure==='1123'||test.codeProcedure==='1124'||test.codeProcedure==='1125'||test.codeProcedure==='1126'){
          this._store.dispatch(
            GetEngagementJuridiquesByCategory({
              category: 'decision',
            })
          );
          this.act = this.engagements.find(
            (item:any) => item.id === test.id
          );

        }

        if(test.codeProcedure==='1110'||test.codeProcedure==='1111'||test.codeProcedure==='1115'){
          this._store.dispatch(
            GetEngagementJuridiquesByCategory({
              category: 'commande',
            })
          );
          this.act = this.engagements.find(
            (item:any) => item.id === test.id
          );

        }

      }else{
        this.engagements = this.dataEngagement;
        this.act = this.dataEngagement;
      }
    }else{
      //console.log("n'existe pas")
      this.act = this.engagements.find(
        (item:any) => item.id === event.numActeJuridique.id
      );
      //console.log("n'existe pas ",this.act)
    }
    localStorage.setItem('imputation', JSON.stringify(this.act?.imputation));
    this.procedure = this.act?.codeProcedure;
    //console.log('Data. Taxe..', (this.act as any)?.taxesApplicable);

    if (this.act) {
      this.engagementForm.patchValue({
        codeProcedure: this.act?.codeProcedure,
        reference: this.act?.reference,
        dateSignature: this.act?.dateSignature,
        signatairej: this.act?.signataire,
        objetj: this.act?.objet,
        imputation: this.act?.imputation,
        numeroj: this.act?.numero,
        montantAE: this.act?.montantAE,
        itineraire: this.act?.itineraire,
        dateDebut: this.act?.dateDebut,
        dateFin: this.act?.dateFin,
        nombreJours: this.act?.nombreJours,
        baremeJour: this.act?.baremeJour?.montant,
        montantMission: this.act?.montant,
        matriculeBeneficaire: (this.act as any)?.matriculeBeneficiaire,
        nomBeneficaire: (this.act as any)?.nomBeneficiaire,
        netAPercevoir: (this.act as any)?.netAPercevoir,
        nomUnitAdminBenef: (this.act as any)?.nomUnitAdminBenef,
        codeUnitAdminBenef: (this.act as any)?.codeUnitAdminBenef,
        montantBrut: (this.act as any)?.montantBrut,
        montantIRNC: (this.act as any)?.montantIRNC,
        montantTVA: (this.act as any)?.montantTVA,
        numContribuable:
          (this.act as any)?.numContribuable || (this.act as any)?.niuContribuable,
        raisonSociale: (this.act as any)?.raisonSociale,
        taxesApplicable: (this.act as any)?.taxesApplicable,
        tauxTVA: (this.act as any)?.tauxTVA,
        tauxIR: (this.act as any)?.tauxIR,
        RIB:
          (this.act as any)?.codeBanqueContribuable +
          (this.act as any)?.codeAgenceContribuable +
          (this.act as any)?.numeroCompteContribuable +
          (this.act as any)?.cleCompteContribuable,
      });
    }
  };
}
