import { Component, OnInit } from '@angular/core';
import { EncoursModel } from '@models/encours.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getDataSelector as getDataEngSelector, getLoadingSelector as getLoadingEngSelector } from '@reducers/engagement-juridique.reducer';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@reducers/index';
import { BaseComponent } from '@components/base.component';
import { GetEngagementJuridiques } from '@actions/engagement-juridique.actions';
import { GetEngagementMandats } from '@actions/engagement-mandat.actions';
import { getDataSelector as getDataMadSelector, getDataSelector as getDataSelectorMandat, getLoadingSelector as getLoadingMadSelector, getLoadingSelector as getLoadingSelectorMandat} from '@reducers/engagement-mandat.reducer';
import { EtatEngagementEnum } from '@models/engagement-juridique.model';
import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';



@Component({
  selector: 'app-etat-imputation',
  templateUrl: './etat-imputation.component.html',
  styleUrls: ['./etat-imputation.component.scss'],
})
export class EtatImputationComponent extends BaseComponent implements OnInit {
  public imputation!: EncoursModel;
  public engagements:any;
  loading$: Observable<boolean> = of(true);
  public aeabattement:any=0;
  public cpabattement:any=0;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _store: Store<AppState>,
  ) {
    super();
    this._initListeners()
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      this.imputation = this.config.data?.item as EncoursModel;
      console.log(this.imputation);
      this._store.dispatch(GetEngagementJuridiques({ imputation: this.imputation.imputation }));
      this.aeabattement = this.imputation?.aeInitial-this.imputation?.aeInitRevisee
      this.cpabattement = this.imputation?.cpInitial-this.imputation?.cpInitRevisee

    }

  }

  close() {
    this.ref.close();
  }

  private _initListeners() {
     this._store
    .pipe(this.takeUntilDestroy, select(getDataEngSelector))
    .subscribe((data) => {
      this.engagements = [...data];
      console.log('engagements ', this.engagements);
    });
  this.loading$ = this._store.pipe(
    select(getLoadingEngSelector),
    map((status) => status)
  );
  }
}
