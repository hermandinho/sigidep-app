import { Component, OnInit } from '@angular/core';
import {AppService} from "@services/app.service";
import {AppState} from "@reducers/index";
import {select, Store} from "@ngrx/store";
import {BaseComponent} from "@components/base.component";
import * as fromAuth from "@reducers/auth.reducer";
import {filter, take} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(
    private _appService: AppService,
    private _store: Store<AppState>,
    private _translate: TranslateService,
  ) {
    super();
    this._store.pipe(
      this.takeUntilDestroy,
      select(fromAuth.getAuthUserSelector),
      filter(u => !!u),
      take(1),
    ).subscribe(user => {
      setTimeout(() => {
        this._appService.showToast({
          detail: this._translate.instant('labels.welcomeMessage', { name: user?.fullName}),
          summary: this._translate.instant('labels.welcome'),
          life: 5000,
          severity: 'success',
          closable: true,
        })
      }, 1000);
    });
  }

  ngOnInit(): void {
    this._appService.setAppBreadcrumb([
      {
        label: 'breadcrumb.dashboard'
      }
    ])
  }

}
