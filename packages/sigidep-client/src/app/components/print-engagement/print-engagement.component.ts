import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';
import { getDataSelector } from '@reducers/types-procedures.reducer';
import {
  getLoadingSelector as getEncoursLoadingSelector,
  getDataSelector as getEncoursDataSelector,
} from '@reducers/encours.reducer';

import {
  getDataSelector as getEngagementDataSelector,
  getLoadingSelector as getEngagementLoadingSelector,
} from '@reducers/engagement-juridique.reducer';

import { GetEncours, GetEngagementJuridiques } from '@store/actions';

import { TranslateService } from '@ngx-translate/core';
import { Engagement } from './types';

@Component({
  selector: 'app-print-engagement',
  templateUrl: './print-engagement.component.html',
  styleUrls: ['./print-engagement.component.scss'],
})
export class PrintEngagementComponent extends BaseComponent implements OnInit {
  public engagement: Engagement;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    public translate: TranslateService
  ) {
    super();
  }
  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        exercise,
        imputation,
        subProgram,
        action,
        activity,
        task,
        operationId,
        adminUnit,
        paragraph,
        objet,
        montantAE,
        numero,
      } = this.config.data?.item as Engagement;
      this.engagement = {
        numero,
        exercise,
        imputation,
        subProgram,
        action,
        activity,
        task,
        operationId,
        adminUnit,
        paragraph,
        objet,
        montantAE,
      };
    }
  }

  close() {
    this.ref.close();
  }
}
