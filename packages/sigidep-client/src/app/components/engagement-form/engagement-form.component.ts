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
  getLoadingSelector as getDecisionLoadingSelector
} from '@reducers/engagement-decision.reducer';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { EtatEngagementEnum } from '@models/engagement-juridique.model';
import { map } from 'rxjs/operators';
import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';

@Component({
  selector: 'app-engagement-form',
  templateUrl: './engagement-form.component.html',
  styleUrls: ['./engagement-form.component.scss'],
})
export class EngagementFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
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
  engagements!: EngagementDecisionModel[];
  procedure?:string;

  constructor(public ref: DynamicDialogRef, private _store: Store<AppState>) {
    super();
    this._initListeners();
  }

  ngOnInit(): void {
    this.engagementForm = this.startingForm;
    this.subformInitialized.emit(this.engagementForm);
    if (this.readOnly) this.engagementForm.disable();

    //prime procedure code is 1122
    this._store.dispatch(
      GetEngagementDecisions({
        //procedures: [procedure],
        etats: [EtatEngagementEnum.SAVE],
      })
    );
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
  }

  onActeJuridiqueChange = (event: any) => {

    const act = this.engagements.find((item) => item.id === event.value);
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
        matriculeBeneficaire: act?.matriculeBeneficiaire,
        nomBeneficaire: act?.nomBeneficiaire,
        netAPercevoir: act?.netAPercevoir,
        nomUnitAdminBenef: act?.nomUnitAdminBenef,
        codeUnitAdminBenef:act?.codeUnitAdminBenef,
        montantBrut: act?.montantBrut,
        montantIRNC: act?.montantIRNC,
        numContribuable: act?.numContribuable,
        raisonSociale: act?.raisonSociale,
        taxesApplicable: act?.taxesApplicable,
        tauxTVA: act?.tauxTVA,
        tauxIR: act?.tauxIR,
        RIB: act?.codeBanqueContribuable + act?.codeAgenceContribuable + act?.numeroCompteContribuable + act?.cleCompteContribuable,

      });
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
      .pipe(this.takeUntilDestroy, select(getDecisionDataSelector))
      .subscribe((data) => {
        this.engagements = [...data];
        console.log(this.engagements)
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
    const act = this.engagements.find(
      (item) => item.id === event.numActeJuridique.id
    );
    localStorage.setItem('imputation', JSON.stringify(act?.imputation));
    this.procedure = act?.codeProcedure;
    if (act){
      this.engagementForm.patchValue({
        codeProcedure: act?.codeProcedure,
        reference: act?.reference,
        dateSignature: act?.dateSignature,
        signatairej: act?.signataire,
        objetj: act?.objet,
        imputation: act?.imputation,
        numeroj: act?.numero,
        montantAE: act?.montantAE,
        matriculeBeneficaire: act?.matriculeBeneficiaire,
        nomBeneficaire: act?.nomBeneficiaire,
        netAPercevoir: act?.netAPercevoir,
        nomUnitAdminBenef: act?.nomUnitAdminBenef,
        codeUnitAdminBenef:act?.codeUnitAdminBenef,
        montantBrut: act?.montantBrut,
        montantIRNC: act?.montantIRNC,
        numContribuable: act?.numContribuable,
        raisonSociale: act?.raisonSociale,
        taxesApplicable: act?.taxesApplicable,
        tauxTVA: act?.tauxTVA,
        tauxIR: act?.tauxIR,
        RIB: act?.codeBanqueContribuable + act?.codeAgenceContribuable + act?.numeroCompteContribuable + act?.cleCompteContribuable,
      });
    }

  };
}
