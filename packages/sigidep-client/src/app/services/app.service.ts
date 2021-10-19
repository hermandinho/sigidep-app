import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class AppService {
  // Observable to activate/desactivate sidebar
  public sideBarMinimized = new BehaviorSubject<boolean>(false);

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
  ) {}

  public switchLanguages(language: string) {
    this.translateService.use(language);
    this.localStorageService.setLang(language);
  }
}
