import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '@environments/environment';
import * as fromRouter from './router.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';


export interface AppState {
  router: RouterReducerState<fromRouter.RouterStateUrl>;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
