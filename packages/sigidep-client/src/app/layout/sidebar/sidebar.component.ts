import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Store} from '@ngrx/store';
import {Subject} from "rxjs";
import {AppState} from "../../store/reducers";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, startWith, takeUntil} from "rxjs/operators";
import {MENU} from './menu';
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = MENU; // MENU;
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
    // private readonly dispatcher: Actions,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(this.router),
        takeUntil(this.onDestroy$),
      ).subscribe(e => {
      if (e instanceof Router) {
        const url = e.routerState?.snapshot?.url?.split('/');
        const path = url[url.length - 1];
        if (path) {
          const menu = this.items.find(m => {
            // Since we only have one level of sub menus for now, this should be fine
            if (m.items) {
              return m.items.find(item => item.routerLink === path || item.routerLink?.includes?.(path));
            }
            return false;
          });
          if (menu) {
            menu.expanded = true;
          }
        }
      } else {
        // No need to expand menu here since it should be expanded until page is reloaded
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
