import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '@environments/environment';
import * as fromRouter from './router.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';
import * as fromExercises from './exercise.reducer';
import * as fromRoles from './roles.reducer';
import * as fromFinancialSources from './financial-sources.reducer';
import * as fromAdministrativeUnits from './administrative-units.reducer';

export interface AppState {
  router: RouterReducerState<fromRouter.RouterStateUrl>;
  auth: fromAuth.State;
  exercises: fromExercises.State;
  roles: fromRoles.State;
  financialSources: fromFinancialSources.State;
  administrativeUnits: fromAdministrativeUnits.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  exercises: fromExercises.reducer,
  roles: fromRoles.reducer,
  financialSources: fromFinancialSources.reducer,
  administrativeUnits: fromAdministrativeUnits.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
