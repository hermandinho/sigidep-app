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
    this.engagementForm = this.startingForm;
    this.subformInitialized.emit(this.engagementForm);
    if (this.readOnly) this.engagementForm.disable();

    //prime procedure code is 1122
    this._store.dispatch(
      GetEngagementJuridiquesByCategory({
        category: this.category,
        etats: [EtatEngagementEnum.RESERVED],
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
    this.engagementForm.controls['montantBrut'].disable();
    this.engagementForm.controls['montantIRNC'].disable();
    this.engagementForm.controls['numContribuable'].disable();
    this.engagementForm.controls['raisonSociale'].disable();
    this.engagementForm.controls['taxesApplicable'].disable();
    this.engagementForm.controls['tauxTVA'].disable();
    this.engagementForm.controls['tauxIR'].disable();
    this.engagementForm.controls['RIB'].disable();
  }

  onActeJuridiqueChange = (event: any) => {
    const act: Engagement | undefined = this.engagements.find(
      (item) => item.id === event.value
    );
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
        numContribuable:
          (act as any)?.numContribuable || (act as any)?.niuContribuable,
        raisonSociale: (act as any)?.raisonSociale,
        taxesApplicable: (act as any)?.taxesApplicable,
        tauxTVA: (act as any)?.tauxTVA,
        tauxIR: (act as any)?.tauxIR,
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
    const act: Engagement | undefined = this.engagements.find(
      (item) => item.id === event.numActeJuridique.id
    );
    localStorage.setItem('imputation', JSON.stringify(act?.imputation));
    this.procedure = act?.codeProcedure;
    console.log('Data. Taxe..', (act as any)?.taxesApplicable);
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
        matriculeBeneficaire: (act as any)?.matriculeBeneficiaire,
        nomBeneficaire: (act as any)?.nomBeneficiaire,
        netAPercevoir: (act as any)?.netAPercevoir,
        nomUnitAdminBenef: (act as any)?.nomUnitAdminBenef,
        codeUnitAdminBenef: (act as any)?.codeUnitAdminBenef,
        montantBrut: (act as any)?.montantBrut,
        montantIRNC: (act as any)?.montantIRNC,
        numContribuable:
          (act as any)?.numContribuable || (act as any)?.niuContribuable,
        raisonSociale: (act as any)?.raisonSociale,
        taxesApplicable: (act as any)?.taxesApplicable,
        tauxTVA: (act as any)?.tauxTVA,
        tauxIR: (act as any)?.tauxIR,
        RIB:
          (act as any)?.codeBanqueContribuable +
          (act as any)?.codeAgenceContribuable +
          (act as any)?.numeroCompteContribuable +
          (act as any)?.cleCompteContribuable,
      });
    }
  };
}
