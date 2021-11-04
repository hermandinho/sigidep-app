import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import * as fromAuth from '@reducers/auth.reducer';
import { map } from 'rxjs/operators';
import { UserModel } from '@models/user.model';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly store: Store<AppState>,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(fromAuth.getAuthUserSelector),
      map((user: UserModel | undefined) => {
        if (
          !!user &&
          this.userService.checkPermission(user, route?.data?.permissions)
        ) {
          return true;
        }
        return this.router.parseUrl('dashboard');
      })
    );
  }
}
