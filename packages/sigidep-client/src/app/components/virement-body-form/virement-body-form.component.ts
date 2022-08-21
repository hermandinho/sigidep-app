import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { ExerciseModel } from '@models/exercise.model';
import { ModeleVirementModel } from '@models/modele-virement.model';
import { SubProgramModel } from '@models/sub-program.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { typeVirement } from '@pages/virements/tools/type-virement';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-virement-body-form',
  templateUrl: './virement-body-form.component.html',
  styleUrls: ['./virement-body-form.component.scss']
})
export class VirementBodyFormComponent extends BaseComponent implements OnInit {

  @Input() startingForm!: FormGroup;
  @Input() dataVirement!: any;

  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  @Output() getEncour: EventEmitter<number> =
    new EventEmitter<number>();
  exercicesInprogressList: ExerciseModel[] = [];
  modelVirement: ModeleVirementModel[] = [];
  public exercice = null;
  subProgramsList: SubProgramModel[] = [];
  public typeVirement = typeVirement;


  public virementForm!: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _apisService: ApisService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.virementForm = this.startingForm;
    this._initListener();
  }



  async _initListener() {
    const exercicesResult = await this._apisService
      .get<ExerciseModel[]>(`/exercises`) // TODO: reutiliser la ligne suivante
      .toPromise();
    this.exercicesInprogressList = exercicesResult;

    const modeleVirementResult = await this._apisService
      .get<ModeleVirementModel[]>(`/modele-virements`) // TODO: reutiliser la ligne suivante
      .toPromise();
    this.modelVirement = modeleVirementResult;
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  getSubProgramme(event: any) {
    this._apisService
      .get<SubProgramModel[]>(`/virements/exercice/${event.value.id}`)
      .toPromise().then((data) => {
        this.subProgramsList = data;
      });
    this.getEncour.emit(event.value.code);
  }


}
