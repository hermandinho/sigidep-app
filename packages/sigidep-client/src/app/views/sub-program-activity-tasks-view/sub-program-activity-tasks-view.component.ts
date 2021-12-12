import { Component, Input, OnInit } from '@angular/core';
import {
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  SubProgramModel,
} from '@models/sub-program.model';
import { BaseComponent } from '@components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { DialogsService } from '@services/dialogs.service';

@Component({
  selector: 'app-sub-program-activity-tasks-view',
  templateUrl: './sub-program-activity-tasks-view.component.html',
  styleUrls: ['./sub-program-activity-tasks-view.component.scss'],
})
export class SubProgramActivityTasksViewComponent
  extends BaseComponent
  implements OnInit
{
  @Input() subProgram?: SubProgramModel;
  @Input() activity?: SubProgramActivityModel;

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

  public async addOperation(item: SubProgramActivityTaskModel): Promise<void> {
    if (!this.activity || !item || !this.subProgram) {
      return;
    }
    let invalidParagraphIds: number[] = [];
    for (let op of item.operations || []) {
      invalidParagraphIds = invalidParagraphIds.concat(op.paragraph.id);
    }
    const ret =
      await this._dialogService.launchSubProgramActivityTaskOperationCreateDialog(
        this.subProgram,
        this.activity,
        item,
        invalidParagraphIds
      );
  }
}
