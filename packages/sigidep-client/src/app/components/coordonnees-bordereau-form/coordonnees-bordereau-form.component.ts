import { GetEngagementJuridiquesByCategory } from '@actions/engagements.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { EtatEngagementEnum } from '@models/engagement-juridique.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/engagements.reducer';
import { map } from 'rxjs/operators';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coordonnees-bordereau-form',
  templateUrl: './coordonnees-bordereau-form.component.html',
  styleUrls: ['./coordonnees-bordereau-form.component.scss']
})
export class CoordonneesBordereauFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Input() isCheck!:boolean;
  @Input() procedure!:string;
  @Input() transmission!:string;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public bordereauForm!: FormGroup;
  public form!: FormGroup;
  public disabled: boolean = true;
  loading$: Observable<boolean> = of(true);
  public engagements:any;

  constructor(
    private _store: Store<AppState>,
    private _appService: AppService,
    public translate: TranslateService,

  ) {
    super();

  }

  ngOnInit(): void {
    console.log('procedure ',this.procedure)
    this.bordereauForm = this.startingForm;
    this.subformInitialized.emit(this.bordereauForm);
    if (this.readOnly) this.bordereauForm.disable();
    this.onDisable()
    this.bordereauForm.patchValue({
      valueobjet:this.translate.instant(this.transmission),
      objet:this.transmission
    });
    if(this.procedure==="1125"){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'decision',
          etats: [EtatEngagementEnum.RESERVED],
          procedures:[this.procedure]
        }));
        this._initListeners()
    }

  }
  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  submit = () => {
    console.log("submit")
    this.submitForm.emit();
  };

  onDisable() {
    this.bordereauForm.controls['objet'].disable();
    this.bordereauForm.controls['serviceDestination'].disable();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.engagements = [...data];
        console.log("this.engagements ",this.engagements)
        this.bordereauForm.patchValue({
          serviceDestination: this.engagements[0]?.codeUnitAdminBenef,
        });
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );


  }
}
