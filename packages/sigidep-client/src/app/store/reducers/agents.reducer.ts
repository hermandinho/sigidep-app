import {
  CreateAgent,
  CreateAgentFailure,
  CreateAgentSuccess,
  DeleteAgent,
  DeleteAgentFailure,
  DeleteAgentSuccess,
  GetAgents,
  GetAgentsFailure,
  GetAgentsSuccess,
  UpdateAgent,
  UpdateAgentFailure,
  UpdateAgentSuccess,
} from '@actions/agents.actions';
import { AgentModel } from '@models/agent.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: AgentModel[];
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

const agentsReducer = createReducer(
  initialState,
  on(GetAgents, (state) => {
    return { ...state, loading: true };
  }),
  on(GetAgentsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetAgentsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteAgent, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteAgentSuccess, DeleteAgentFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateAgent, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateAgent, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateAgentSuccess, UpdateAgentSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateAgentFailure, UpdateAgentFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return agentsReducer(state, action);
}

export const featureKey = 'agents';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
