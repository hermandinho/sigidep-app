import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as RouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false }) public navigate$ = this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
            this.ngZone.run(() => {
                this.router.navigate(path, { queryParams, ...extras });
            });
        }),
    );

    @Effect({ dispatch: false }) public navigateBack$ = this.actions$.pipe(
        ofType(RouterActions.BACK),
        tap(() => {
            this.ngZone.run(() => {
                this.location.back();
            });
        }),
    );

    @Effect({ dispatch: false }) public navigateForward$ = this.actions$.pipe(
        ofType(RouterActions.FORWARD),
        tap(() => {
            this.ngZone.run(() => {
                this.location.forward();
            });
        }),
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location,
        private ngZone: NgZone,
    ) {}
}
