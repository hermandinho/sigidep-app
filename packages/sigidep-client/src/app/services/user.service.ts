import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';
import {UserModel} from "@models/user.model";

@Injectable()
export class UserService {
  constructor(
    public httpClient: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public checkPermission(user: UserModel, permissions: string[]): boolean {
    const keys = user?.role?.permissionKeys;
    if (!keys?.length || !permissions?.length) {
      return false;
    }
    return permissions.some(p => keys.includes(p));
  }

  public simpleCheckPermission(permissions: string[]): boolean {
    const user = this.localStorageService.getUser();
    if (!user) {
      return false;
    }
    return this.checkPermission(user, permissions);
  }
}
