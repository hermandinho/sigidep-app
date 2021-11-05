import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { StructuresService } from '@services/structures.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private structuresService: StructuresService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!!this.localStorageService.getAuthToken()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      const check = await this.structuresService.check();
      if (!check) {
        this.router.navigate(['/install']);
        return false;
      } else {
        return true;
      }
    }
  }
}
