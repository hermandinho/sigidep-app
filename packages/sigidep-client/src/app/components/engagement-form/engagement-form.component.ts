import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '@components/base.component';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { GetEngagementMissionPrime } from '@actions/engagement-mission.actions';
import { getDataSelector as getMissionDataSelector, getLoadingSelector } from '@reducers/engagement-mission.reducer';
import { getDataSelector as getDecisionDataSelector } from '@reducers/engagement-decision.reducer';
import { EngagementDecisionModel } from '@models/engagement-decision.model';

@Component({
  selector: 'app-engagement-form',
  templateUrl: './engagement-form.component.html',
  styleUrls: ['./engagement-form.component.scss']
})
export class EngagementFormComponent extends BaseComponent implements OnInit {

  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public engagementForm!: FormGroup;
  public form!: FormGroup;
  public disabled:boolean=true;
  loading$: Observable<boolean> = of(true);
  missions!: EngagementMissionModel[];
  engagements!: EngagementDecisionModel[];



  constructor(
    public ref: DynamicDialogRef,
    private _store: Store<AppState>,

  ) {
    super();
    this._initListeners();
  }

  ngOnInit(): void {

    this.engagementForm = this.startingForm;
    this.subformInitialized.emit(this.engagementForm);
    if (this.readOnly) this.engagementForm.disable();
    this._store.dispatch(GetEngagementMissionPrime());
    this.onDisable();

  }

/*   get engagementFormGroup(): FormGroup {
    return this.form?.get('engagementForm') as FormGroup;
  } */
  onDisable(){
    this.engagementForm.controls['codeProcedure'].disable();
    this.engagementForm.controls['reference'].disable();
    this.engagementForm.controls['dateSignature'].disable();
    this.engagementForm.controls['signatairej'].disable();
    this.engagementForm.controls['objetj'].disable();
    this.engagementForm.controls['imputation'].disable();
    this.engagementForm.controls['matriculeBeneficaire'].disable();
    this.engagementForm.controls['nomBeneficaire'].disable();
    this.engagementForm.controls['itineraire'].disable();
    this.engagementForm.controls['dateDebut'].disable();
    this.engagementForm.controls['dateFin'].disable();
    this.engagementForm.controls['nombreJours'].disable();
    this.engagementForm.controls['montantMission'].disable();
    this.engagementForm.controls['baremeJour'].disable();

  }

  onActeJuridiqueChange = (event: any) => {
    const act = this.engagements.find((item) => item.id === event.value);
    localStorage.setItem('imputation', JSON.stringify(act?.imputation));

    if (act){
      this.engagementForm.patchValue({
        codeProcedure: act.codeProcedure,
        reference: act.reference,
        dateSignature: act.dateSignature,
        signatairej: act.signataire,
        objetj: act.objet,
        imputation: act.imputation,
        numeroj: act.numero,
        montantAE:act.montantAE
      });

      this.onMissionChange(act.matriculeBeneficiaire);
    }


  };

  onMissionChange = (event: any) => {
    const act = this.missions.find((item) => item.matriculeBeneficiaire === event.value);
    if (act)
      this.engagementForm.patchValue({
        matriculeBeneficaire: act.matriculeBeneficiaire,
        nomBeneficaire: act.nomBeneficiaire,
        itineraire: act.itineraire,
        dateDebut: act.dateDebut,
        dateFin: act.dateFin,
        nombreJours: act.nombreJours,
        montantMission: act.montant,
        baremeJour:act.baremeJour,
      });
  };

  doChangeStep = (direction:any) => {
    this.changeStep.emit(direction);
  };
  close() {
    this.ref.close();
  }

  private _initListeners() {
      this._store
      .pipe(this.takeUntilDestroy, select(getDecisionDataSelector))
      .subscribe((payload) => {
       this.engagements = [...payload];
       if(this.engagementForm != undefined){
        this.scanneElt(this.engagementForm.value)
      }
      });

      this._store
      .pipe(this.takeUntilDestroy, select(getMissionDataSelector))
      .subscribe((payload) => {
       this.missions = [...payload];
       console.log(this.missions)
      });
  }

  scanneElt = (event:any) => {
    const act = this.engagements.find((item) => item.numero === event.numActeJuridique.numero);
    localStorage.setItem('imputation', JSON.stringify(act?.imputation));

    if (act)
      this.engagementForm.patchValue({
        codeProcedure: act.codeProcedure,
        reference: act.reference,
        dateSignature: act.dateSignature,
        signatairej: act.signataire,
        objetj: act.objet,
        imputation: act.imputation,
        numeroj: act.numero,
      });
  }



}
