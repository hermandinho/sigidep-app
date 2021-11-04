import { Observable, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-base',
  template: `<div class="base"></div>`,
})
export class BaseComponent implements OnDestroy {
  public ngDestroyed$ = new Subject();
  public subscriptions: Subscription[] = [];
  public pageTitle$ = new Subject();
  private _destroy$?: Subject<void>;

  constructor(public appService?: AppService) {
    this.pageTitle$.pipe(takeUntil(this.ngDestroyed$)).subscribe((title) => {
      document.title = `${title}`;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this._destroy$?.next();
    this._destroy$?.complete();
  }

  protected takeUntilDestroy = <T>(source: Observable<T>): Observable<T> => {
    // Destroy subject created lazily
    if (!this._destroy$) this._destroy$ = new Subject<void>();

    return source.pipe(takeUntil(this._destroy$));
  };

  public trackByIndex(index: number, item: any): number {
    return index;
  }

  public trackById(index: number, item: any): number {
    return item.id;
  }

  public getTableGlobalSearchValue(e: any): string {
    return e?.target?.value;
  }
}
