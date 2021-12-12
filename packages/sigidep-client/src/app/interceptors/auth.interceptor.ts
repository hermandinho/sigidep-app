import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { catchError } from 'rxjs/operators';
import { Go } from '@actions/router.actions';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly store: Store<AppState>,
    private readonly localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getAuthToken() as string;
    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
    if (!/i18n/.test(req.url) && !req.url.startsWith(environment.API_URL)) {
      req = req.clone({
        url: environment.API_URL.concat(req.url),
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err?.error);
        if (err?.error?.statusCode === 401) {
          this.localStorageService.logout();
          this.store.dispatch(new Go({ path: ['/auth/login'] }));
        }
        return throwError(err);
      })
    );
  }
}
