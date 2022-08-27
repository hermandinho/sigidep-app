import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { ExerciseModel } from '@models/exercise.model';
import { ModeleVirementModel } from '@models/modele-virement.model';
import { SubProgramModel } from '@models/sub-program.model';
import { ModeVirementEnum, typeFinancementEnum, typeVirement, typeVirementEnum } from '@pages/virements/tools/type-virement';
import { ApisService } from '@services/apis.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-virement-body-form',
  templateUrl: './virement-body-form.component.html',
  styleUrls: ['./virement-body-form.component.scss']
})
export class VirementBodyFormComponent extends BaseComponent implements OnInit {

  @Input() startingForm!: FormGroup;
  @Input() dataVirement!: any;
  @Input() mode!: ModeVirementEnum;

  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  @Output() getEncour: EventEmitter<number> =
    new EventEmitter<number>();

  @Output() filterEncour: EventEmitter<number> =
    new EventEmitter<number>();

  @Output() typeVirement: EventEmitter<string> =
    new EventEmitter<string>();
  public exercicesInprogressList: ExerciseModel[] = [];
  public modelVirement: ModeleVirementModel[] = [];
  public exercice = null;
  public subProgramsList: SubProgramModel[] = [];
  public subProgramsListSource: SubProgramModel[] = [];
  public subProgramsListCible: SubProgramModel[] = [];
  public typeVirements = typeVirement;
  public show: boolean = false;



  public virementForm!: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _apisService: ApisService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.show = this.mode == ModeVirementEnum.CREATION ? false : true;
    console.log(this.show);

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
        this.subProgramsListSource = [...this.subProgramsList];
        this.subProgramsListCible = [...this.subProgramsList];
      });
    this.getEncour.emit(event.value.code);
  }

  filterEncourByProgram(event: any) {
    this.filterEncour.emit(event.value.code);
  }

  setTypeVirement(event: any) {
    let type = event.value.code;
    if (type == typeVirementEnum.BF2BF || type == typeVirementEnum.BIP2BIP)
      type = typeFinancementEnum.BF01;
    this.typeVirement.emit(type);
  }

  filterProgrammeByTypeVirement(id: number) {
    switch (id) {
      case 1:

        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;

      default:
        break;
    }
  }

  filterPrograme(type: string) {
    return this.subProgramsList.filter((s) => {
      return true;
    })
  }

}
