import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "./local-storage.service";
import {Message} from "primeng/api/message";
import {MenuItem, MessageService} from "primeng/api";

@Injectable()
export class AppService {
  // Observable to activate/desactivate sidebar
  public sideBarMinimized = new BehaviorSubject<boolean>(false);
  public appBreadcrumb = new BehaviorSubject<MenuItem[]>([]);

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private _messageService: MessageService,
  ) {}

  public switchLanguages(language: string) {
    this.translateService.use(language);
    this.localStorageService.setLang(language);
  }

  public showToast(payload: Message) {
    this._messageService.add(payload);
  }

  public setAppBreadcrumb(items: MenuItem[]) {
    this.appBreadcrumb.next(items);
  }
}
