import {
  CreatePieceJointe,
  CreatePieceJointeFailure,
  CreatePieceJointeSuccess,
  DeletePieceJointe,
  DeletePieceJointeFailure,
  DeletePieceJointeSuccess,
  GetPiecesJointes,
  GetPiecesJointesFailure,
  GetPiecesJointesSuccess,
  UpdatePieceJointe,
  UpdatePieceJointeFailure,
  UpdatePieceJointeSuccess,
} from '@actions/piece-jointe.actions';
import { PieceJointeModel } from '@models/piece-jointe.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: PieceJointeModel[];
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

const piecesJointesReducer = createReducer(
  initialState,
  on(GetPiecesJointes, (state) => {
    return { ...state, loading: true };
  }),
  on(GetPiecesJointesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetPiecesJointesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreatePieceJointe, (state) => {
    return { ...state, loading: true };
  }),
  on(DeletePieceJointe, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeletePieceJointeSuccess, DeletePieceJointeFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdatePieceJointe, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreatePieceJointeSuccess,
    UpdatePieceJointeSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(CreatePieceJointeFailure, UpdatePieceJointeFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return piecesJointesReducer(state, action);
}

export const featureKey = 'piecesJointes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
