import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetParagraphs,
  GetParagraphsFailure,
  GetParagraphsSuccess,
} from '@store/actions';
import { ParagraphModel } from '@models/index';

export interface State {
  data: ParagraphModel[];
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

const authReducer = createReducer(
  initialState,
  on(GetParagraphs, (state) => {
    return { ...state, loading: true };
  }),
  on(GetParagraphsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetParagraphsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'paragraphs';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
