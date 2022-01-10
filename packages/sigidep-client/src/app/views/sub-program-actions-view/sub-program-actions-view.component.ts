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
  selector: 'app-sub-program-actions-view',
  templateUrl: './sub-program-actions-view.component.html',
  styleUrls: ['./sub-program-actions-view.component.scss'],
})
export class SubProgramActionsViewComponent
  extends BaseComponent
  implements OnInit
{
  @Input() subProgram?: SubProgramModel;

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

  public async addActivity(item: SubProgramActionModel): Promise<void> {
    if (!this.subProgram || !item) {
      return;
    }
    const ret = await this._dialogService.launchSubProgramActivityCreateDialog(
      this.subProgram,
      item
    );
  }
}
