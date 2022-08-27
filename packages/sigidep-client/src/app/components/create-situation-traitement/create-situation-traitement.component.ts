import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '@components/base.component';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { map } from 'rxjs/operators';
import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { GetBonsEngagements } from '@actions/bons-engagements.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/bons-engagements.reducer';

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
  public engagements!:any[];
  constructor(private _store: Store<AppState>) {
    super();
    this._initListeners();
   }

  ngOnInit(): void {
   console.log('traitement', this.situation)
    //this.traitement=this.situation;

   if(this.situation){
    this._store.dispatch(GetBonsEngagements({}));
    this.traitement = this.engagements.find(
      (item) => item.id === this.situation.id
    );
    console.log('traitement', this.traitement)
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
        console.log('engagements', this.engagements)
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

}

