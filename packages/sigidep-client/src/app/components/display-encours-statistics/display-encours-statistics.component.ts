import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { EncoursModel } from '@models/encours.model';

@Component({
  selector: 'app-display-encours-statistics',
  templateUrl: './display-encours-statistics.component.html',
  styleUrls: ['./display-encours-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayEncoursStatisticsComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined],
      exercise: [undefined],
      sousProgramme: [undefined],
      nombreActions: [undefined],
      nombreActivites: [undefined],
      nombreTasks: [undefined],
      nombreOperations: [undefined],
      nombreImputations: [undefined],
      nombreUnitesPhysiques: [undefined],

      actions: [false],
      activites: [false],
      tasks: [false],
      operations: [false],
      imputations: [false],
      unitesPhysiques: [false],
    });
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        id,
        exercise,
        sousProgramme,
        nombreActions,
        nombreActivites,
        nombreTasks,
        nombreOperations,
        nombreImputations,
        nombreUnitesPhysiques,
      } = this.config.data?.item as EncoursModel;
      this.form.patchValue({
        id,
        exercise,
        sousProgramme,
        nombreActions,
        nombreActivites,
        nombreTasks,
        nombreOperations,
        nombreImputations,
        nombreUnitesPhysiques,

        actions: nombreActions > 0,
        activites: nombreActivites > 0,
        tasks: nombreTasks > 0,
        operations: nombreOperations > 0,
        imputations: nombreImputations > 0,
        unitesPhysiques: nombreUnitesPhysiques > 0,
      });

      this.form.disable();
    }
  }

  close() {
    this.ref.close();
  }
}
