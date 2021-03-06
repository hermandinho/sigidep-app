import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { AppService } from '@services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs/operators';
import { getBreadcrumbSelector } from '@reducers/app.reducer';
import { AppState } from '@reducers/index';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends BaseComponent implements OnInit {
  public sideBarMinimized = false;
  breadcrumb: MenuItem[] = [];
  constructor(
    public readonly appService: AppService,
    private readonly _translate: TranslateService,
    private readonly _store: Store<AppState>
  ) {
    super();
    this._store
      .pipe(this.takeUntilDestroy, select(getBreadcrumbSelector))
      .subscribe((breadcrumb) => {
        this.breadcrumb = (breadcrumb || []).map((elt) => {
          const item = { ...elt };
          const key = item.label;
          if (item.label) {
            item.label = this._translate.instant(item.label.toLowerCase());
            item.id = key;
          }
          return item;
        });
      });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.sideBarMinimized.subscribe(
        (value: boolean) => (this.sideBarMinimized = value)
      )
    );

    /*this._translate.stream('breadcrumb')
      .pipe(
        this.takeUntilDestroy
      ).subscribe(res => {
      const keys = Object.keys(res);
      for (const key of keys) {
        this.breadcrumb = (this.breadcrumb || []).map(item => {
          if (item.id === `breadcrumb.${key}`) {
            item.label = res[key];
          }
          return item;
        })
      }
    })*/
  }
}
