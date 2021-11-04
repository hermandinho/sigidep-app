import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { StructuresService } from '@services/structures.service';

@Injectable()
export class AppInstallCheckGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private http: HttpClient,
    private structuresService: StructuresService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const check = await this.structuresService.check();
    if (check) {
      this.router.navigate(['/home']);
      return false;
    } else {
      // this.router.navigate(['/install']);
      return true;
    }
  }
}
