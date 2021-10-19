import {Subject, Subscription} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

import {MessageService} from 'primeng/api';
import {takeUntil} from "rxjs/operators";
import {AppService} from "../services/app.service";

@Component({
  selector: 'app-base',
  template: `<div class="base"></div>`,
})
export class BaseComponent implements OnDestroy {
  public ngDestroyed$ = new Subject();
  public subscriptions: Subscription[] = [];
  public pageTitle$ = new Subject();

  constructor(
    public appService?: AppService,
    public messageService?: MessageService,
  ) {
    this.pageTitle$
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(title => {
      document.title = `${title}`;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  public trackByIndex(index: number, item: any): number {
    return index;
  }

  public trackById(index: number, item: any): number {
    return item.id;
  }
}
