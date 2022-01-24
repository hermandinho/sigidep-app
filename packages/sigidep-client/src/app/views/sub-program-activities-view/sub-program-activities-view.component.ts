import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import {
  SubProgramActionModel,
  SubProgramActivityModel,
  SubProgramModel,
} from '@models/sub-program.model';
import { TranslateService } from '@ngx-translate/core';
import { DialogsService } from '@services/dialogs.service';

@Component({
  selector: 'app-sub-program-activities-view',
  templateUrl: './sub-program-activities-view.component.html',
  styleUrls: ['./sub-program-activities-view.component.scss'],
})
export class SubProgramActivitiesViewComponent
  extends BaseComponent
  implements OnInit
{
  @Input() subProgram?: SubProgramModel;
  @Input() action?: SubProgramActionModel;

  constructor(
    public translate: TranslateService,
    private readonly _dialogService: DialogsService
  ) {
    super();
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  ngOnInit(): void {}

  public async addTask(item: SubProgramActivityModel): Promise<void> {
    if (!this.subProgram || !item || !this.action) {
      return;
    }
    const ret =
      await this._dialogService.launchSubProgramActivityTaskCreateDialog(
        this.subProgram,
        item,
        this.action
      );
  }
}
