import {
  CreateEngagementCommande,
  CreateEngagementCommandeFailure,
  CreateEngagementCommandesuccess,
  DeleteEngagementCommande,
  DeleteEngagementCommandeFailure,
  DeleteEngagementCommandeSuccess,
  GetEngagementCommandes,
  GetEngagementCommandesFailure,
  GetEngagementCommandesSuccess,
  UpdateEngagementCommande,
  UpdateEngagementCommandeFailure,
  UpdateEngagementCommandeSuccess,
} from '@actions/engagement-commande.actions';
import { EngagementCommandeModel } from '@models/engagement-commande.model';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: EngagementCommandeModel[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: [],
  loading: false,
  error: {
    error: '',
    message: '',
    details: '',
    statusCode: 0,
  },
};

const engagementCommandesReducer = createReducer(
  initialState,
  on(GetEngagementCommandes, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementCommandesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementCommandesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateEngagementCommande, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagementCommande, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(
    DeleteEngagementCommandeSuccess,
    DeleteEngagementCommandeFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(UpdateEngagementCommande, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementCommandesuccess,
    UpdateEngagementCommandeSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateEngagementCommandeFailure,
    UpdateEngagementCommandeFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementCommandesReducer(state, action);
}

export const featureKey = 'commandes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
