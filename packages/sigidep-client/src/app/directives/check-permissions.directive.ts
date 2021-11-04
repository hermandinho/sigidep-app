import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '@services/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { takeUntil } from 'rxjs/operators';
import * as fromAuth from '@reducers/auth.reducer';

@Directive({
  selector: '[appCheckPermissions]',
})
export class CheckPermissionsDirective implements OnInit, OnDestroy {
  @Input() appCheckPermissions!: string[];

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private readonly store: Store<AppState>,
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromAuth.getAuthUserSelector), takeUntil(this.onDestroy$))
      .subscribe((user) => {
        if (
          !!user &&
          this.userService.checkPermission(user, this.appCheckPermissions)
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
