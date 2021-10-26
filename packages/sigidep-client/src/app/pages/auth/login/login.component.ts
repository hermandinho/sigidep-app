import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthService} from "@services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "@services/local-storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "@reducers/index";
import {Login, LoginFailure, LoginSuccess} from "@actions/auth.actions";
import {Actions, ofType} from "@ngrx/effects";
import {Go} from "@store/actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  busy = false;

  constructor(
    private messageService: MessageService,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _translateService: TranslateService,
    private _localStorageService: LocalStorageService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
  ) {
    this.dispatcher
      .pipe(
        ofType(
          LoginFailure,
          LoginSuccess
        )
      )
      .subscribe((action) => {
        this.busy = false;
        if (action.type === LoginFailure.type) {
          const error = action.error;
          let message = '';
          if (error?.statusCode === 404) {
            message = 'errors.auth.invalidCredentials'
          } else if (error?.statusCode === 403) {
            message = 'errors.auth.accountInactive';
          } else {
            message = 'errors.auth.error';
          }

          this.messageService.add({
            severity: 'error',
            summary: this._translateService.instant('errors.error'),
            detail: this._translateService.instant(message),
            closable: true,
          });
        } else if (action.type === LoginSuccess.type) {
          const q = new URLSearchParams(window.location.search);
          let to = '/home';
          if (q.has('redirect')) {
            to = q.get('redirect') as string;
          }
          this._store.dispatch(new Go({ path: [to] }));
        }
      })
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: [undefined, [Validators.required, Validators.minLength(5)]],
      password: [undefined, [Validators.minLength(5), Validators.required]],
    });
  }

  async submit() {
    this.busy = true;
    this.messageService.clear();

    this._store.dispatch(Login({ payload: this.form.value }));

    // TODO add Welcome XX toast after login success

  }
}
