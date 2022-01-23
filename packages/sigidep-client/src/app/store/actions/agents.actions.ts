import { createAction, props } from '@ngrx/store';
import { AgentModel } from '@models/agent.model';

export const GetAgents = createAction('[agents] Filter');
export const GetAgentsSuccess = createAction(
  '[agents] Filter success',
  props<{ payload: AgentModel[] }>()
);
export const GetAgentsFailure = createAction(
  '[agents] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateAgent = createAction(
  '[agents] Update',
  props<{ payload: AgentModel }>()
);
export const UpdateAgentSuccess = createAction(
  '[agents] Update success',
  props<{ payload: AgentModel }>()
);
export const UpdateAgentFailure = createAction(
  '[agents] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteAgent = createAction(
  '[agents] Delete',
  props<{ id: number }>()
);
export const DeleteAgentSuccess = createAction('[agents] Delete success');
export const DeleteAgentFailure = createAction(
  '[agents] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateAgent = createAction(
  '[agents] Create Agent',
  props<{ payload: AgentModel }>()
);
export const CreateAgentSuccess = createAction(
  '[agents] Create Agent',
  props<{ payload: AgentModel }>()
);
export const CreateAgentFailure = createAction(
  '[agents] Create Agent',
  props<{ error?: any }>()
);
