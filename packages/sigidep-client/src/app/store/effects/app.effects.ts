import {Injectable} from '@angular/core';

import {Actions} from '@ngrx/effects';
import {AuthService} from "@services/auth.service";
import {MessageService} from "primeng/api";
import {AppService} from "@services/app.service";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private _messageService: MessageService,
    private _appService: AppService,
  ) {}
}
