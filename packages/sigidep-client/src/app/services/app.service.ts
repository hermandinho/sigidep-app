import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { Message } from 'primeng/api/message';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Confirmation } from 'primeng/api/confirmation';

@Injectable()
export class AppService {
  // Observable to activate/desactivate sidebar
  public sideBarMinimized = new BehaviorSubject<boolean>(false);
  public appBreadcrumb = new BehaviorSubject<MenuItem[]>([]);
  private breadcrumb: MenuItem[] = [];
  public currentProcedureChange = new BehaviorSubject<string>('');
  public currentProcedure: string = '';

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  public switchLanguages(language: string) {
    this.translateService.use(language);
    this.localStorageService.setLang(language);
  }

  public showToast(payload: Message) {
    this._messageService.add({
      ...payload,
      detail: payload.detail?.includes('.')
        ? this.translateService.instant(payload.detail)
        : payload.detail,
      summary: payload.summary?.includes('.')
        ? this.translateService.instant(payload.summary)
        : payload.summary,
      // life: 100000000000000000,
      // @ts-ignore
      // baseZIndex: 9999999,
    });
  }

  public showUnauthorizedActionToast() {
    this.showToast({
      detail: 'messages.unauthorized',
      summary: 'errors.unauthorized',
      severity: 'error',
      closable: true,
    });
  }

  public setAppBreadcrumb(items: MenuItem[]) {
    this.breadcrumb = items;
    this.appBreadcrumb.next(this.breadcrumb);
  }

  public setCurrentProcedure(procedure: string) {
    this.currentProcedure = procedure;
    this.currentProcedureChange.next(this.currentProcedure);
  }

  public getCurrentProcedure(): string {
    return this.currentProcedure;
  }

  public getAppBreadcrumb(): MenuItem[] {
    return this.breadcrumb;
  }

  public showConfirmation(input: Confirmation) {
    this._confirmationService.confirm({
      header: this.translateService.instant('dialogs.headers.confirm'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: this.translateService.instant('buttons.cancel'),
      acceptLabel: this.translateService.instant('buttons.confirm'),
      ...input,
      message: input.message && this.translateService.instant(input.message),
    });
  }

  public saveConfirmation(input: Confirmation) {
    this._confirmationService.confirm({
      header: this.translateService.instant('dialogs.headers.confirm'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: this.translateService.instant('buttons.cancel'),
      acceptLabel: this.translateService.instant('buttons.confirm'),
      ...input,
      message: input.message && this.translateService.instant(input.message),
    });
  }
}
