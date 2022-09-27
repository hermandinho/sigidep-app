import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '@components/base.component';
import { map } from 'rxjs/operators';
import { GetBonsEngagements } from '@actions/bons-engagements.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/bons-engagements.reducer';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';
import {
  getDataSelector as getDataSelectorCommande,
  getLoadingSelector as getLoadingSelectorCommande,
} from '@reducers/engagement-commande.reducer';
import {
  getDataSelector as getDataSelectorDecission,
  getLoadingSelector as getLoadingSelectorDecission,
} from '@reducers/engagement-decision.reducer';
import {
  getDataSelector as getDataSelectorMission,
  getLoadingSelector as getLoadingSelectorMission,
} from '@reducers/engagement-mission.reducer';

@Component({
  selector: 'app-create-situation-traitement',
  templateUrl: './create-situation-traitement.component.html',
  styleUrls: ['./create-situation-traitement.component.scss']
})
export class CreateSituationTraitementComponent extends BaseComponent implements OnInit {
  @Input() situation!: any;
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  public traitement:any;
  act:any;
  public engagements:any[] = [];
  constructor(private _store: Store<AppState>) {
    super();
   this._initListeners();
   }

  ngOnInit(): void {

   console.log('traitement', this.situation)
   if(this.situation?.traitements){
    this.traitement=this.situation;
   }else{
    this._store.dispatch(GetBonsEngagements({numeros:[this.situation?.numero]}));
   }
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.engagements = [...data];
    //this.traitement = this.engagements[0];
        console.log('traitement', this.engagements)
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

}

