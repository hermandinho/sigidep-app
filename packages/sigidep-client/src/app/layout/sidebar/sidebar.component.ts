import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '@store/reducers';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { I18NMenus } from './menu';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@services/app.service';
import { BaseComponent } from '@components/base.component';
import { UserModel } from '@models/user.model';
import { UserService } from '@services/user.service';
import * as fromAuth from '@reducers/auth.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
  public items!: MenuItem[];
  private onDestroy$ = new Subject<boolean>();
  private poolingDelay = 5000;
  public API_URL = '';
  public logo = '';

  constructor(
    private readonly store: Store<AppState>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public translateService: TranslateService,
    public appService: AppService,
    public userService: UserService,
    private _store: Store<AppState>
  ) // private readonly dispatcher: Actions,
  {
    super();
    this.store
      .pipe(select(fromAuth.getAuthUserSelector), this.takeUntilDestroy)
      .subscribe((user) => {
        if (user) {
          this.items =
            this.items ??
            I18NMenus(this.translateService).map((m) =>
              this.checkMenuPermissions(m, user)
            );
        }
      });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router),
        this.takeUntilDestroy
      )
      .subscribe((e) => {
        if (e instanceof Router) {
          this.translateService.onLangChange
            .pipe(
              this.takeUntilDestroy,
              startWith(this.translateService.currentLang)
            )
            .subscribe((lang) => {
              const url = e.routerState?.snapshot?.url?.split('/');
              const path = url[url.length - 1];
              if (path) {
                this.items = I18NMenus(this.translateService);
                const menu = this.items.find((m) => {
                  // Since we only have one level of sub menus for now, this should be fine
                  if (m.items) {
                    return m.items.find(
                      (item) =>
                        item.routerLink === path ||
                        item.routerLink?.includes?.(path)
                    );
                  }
                  return false;
                });
                if (menu) {
                  menu.expanded = true;
                }
              }
            });
        } else {
          // No need to expand menu here since it should be expanded until page is reloaded
        }
      });
  }

  private checkMenuPermissions(menu: MenuItem, user: UserModel): MenuItem {
    if (menu?.state?.permissions?.length) {
      menu.visible = this.userService.checkPermission(
        user,
        menu.state.permissions
      );
    }
    if (menu?.items?.length) {
      for (const item of menu.items) {
        this.checkMenuPermissions(item, user);
      }
    }
    return menu;
  }
}
