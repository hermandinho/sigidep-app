import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {LocalStorageService} from "@services/local-storage.service";

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {

    if (!!this.localStorageService.getAuthToken()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
