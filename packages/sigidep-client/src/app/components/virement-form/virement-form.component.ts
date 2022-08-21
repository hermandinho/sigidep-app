import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { EncoursModel } from '@models/encours.model';
import { ExerciseModel } from '@models/exercise.model';
import { SubProgramModel } from '@models/sub-program.model';
import { StepVirement } from '@models/virement.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-virement-form',
  templateUrl: './virement-form.component.html',
  styleUrls: ['./virement-form.component.scss']
})
export class VirementFormComponent extends BaseComponent implements OnInit {
  public currentStepBs: BehaviorSubject<StepVirement> = new BehaviorSubject<StepVirement>('virement');
  public currentStep$: Observable<StepVirement> = this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'save' | 'edit' | 'book' | 'valid' | 'cancel';
  public situationAction!: string;
  public busy = false;
  public currentVirement!: string;
  public engagements!: any;
  public situations: any;
  public isCheck = false;
  public situationForm: any;
  public encourData: EncoursModel[] = [];
  //bookProcess:any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService,
    private translate: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      virement: this._fb.group({
        exercice: [undefined, [Validators.required]],
        sub_program_destinataire: [undefined, [Validators.required]],
        sub_program_cource: [undefined, [Validators.required]],
        typeVirement: [undefined, [Validators.required]],
        modele_virement: [undefined, [Validators.required]],
        dateVirement: [undefined, [Validators.required]],
        objet: [undefined, [Validators.required]]
      }),
      detailsVirement: this._fb.group({
        code_input: [undefined, [Validators.required]]
      })
    });
    this.getEncour(1);
  }


  get virementBodyForm(): FormGroup {
    return this.form?.get('virement') as FormGroup;
  }

  get detailsVirementForm(): FormGroup {
    return this.form?.get('detailsVirement') as FormGroup;
  }



  async getEncour(code: number) {
    const encourResult = await this._apisService
      .get<EncoursModel[]>(`/virements/encour/${code}`) // TODO: reutiliser la ligne suivante
      .toPromise();
    this.encourData = encourResult;
    console.log(this.encourData);
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
  }


  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    switch (currentStep) {
      case 'virement':
        if (direction === 'forward') {
          this.currentStepBs.next('details-virement');
        }
        break;
      case 'details-virement':
        if (direction === 'forward') {
          this.currentStepBs.next('validate');
        }
        if (direction === 'back') {
          this.currentStepBs.next('virement');
        }
        break;
      case 'validate':
        if (direction === 'back') {
          this.currentStepBs.next('details-virement');
        }
        break;
    }
  }

}
