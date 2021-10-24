import { Injectable } from '@angular/core';
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

  public getAuthToken(): any {
    return this.getItem('_authToken');
  }

  public logout(): void {
    localStorage.removeItem('_authToken');
    localStorage.removeItem('_authUser');
  }
}
