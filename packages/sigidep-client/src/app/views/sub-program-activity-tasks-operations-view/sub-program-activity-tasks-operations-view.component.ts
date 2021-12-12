import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { SubProgramActivityTaskModel } from '@models/sub-program.model';

@Component({
  selector: 'app-sub-program-activity-tasks-operations-view',
  templateUrl: './sub-program-activity-tasks-operations-view.component.html',
  styleUrls: ['./sub-program-activity-tasks-operations-view.component.scss'],
})
export class SubProgramActivityTasksOperationsViewComponent
  extends BaseComponent
  implements OnInit
{
  @Input() task?: SubProgramActivityTaskModel;

  constructor(public translate: TranslateService) {
    super();
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }

  ngOnInit(): void {}
}
