import { Injectable } from '@angular/core';
import {UserModel} from "@models/user.model";
const BASE_KEY = 'SIGIDEP_';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(key: string, value: any) {
    localStorage.setItem(BASE_KEY + key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(BASE_KEY + key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(BASE_KEY + key);
  }

  public setLang(lang: string) {
    this.setItem('_lang', lang);
  }

  public getLang() {
    return this.getItem( '_lang');
  }

  public setAuthToken(token: string): void {
    this.setItem('_authToken', token);
  }

  public getAuthToken(): any {
    return this.getItem('_authToken');
  }


  public setUser(user: UserModel): void {
    this.setItem('_authUser', JSON.stringify(user));
  }

  public getUser(): UserModel | undefined {
    const user = this.getItem('_authUser');
    if (!!user) {
      return JSON.parse(user);
    }
    return;
  }

  public logout(): void {
    localStorage.removeItem('_authToken');
    localStorage.removeItem('_authUser');
  }
}
