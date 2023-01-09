import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title= 'SIGIDEP'
  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('fr');
    const browserLang = translateService.getBrowserLang()?.match(/en|fr/)
      ? translateService.getBrowserLang()
      : 'fr';
    translateService.use(localStorageService.getLang() ?? browserLang);
  }
}
