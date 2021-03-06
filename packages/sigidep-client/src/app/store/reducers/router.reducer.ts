import { Injectable } from '@angular/core';
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export type State = RouterReducerState<RouterStateUrl>;

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const getRouterFeatureState = createFeatureSelector<State>('router');
