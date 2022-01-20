import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
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

@Injectable()
export class AgentsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAgents),
      mergeMap((action) =>
        this.apisService.get<AgentModel[]>('/agents').pipe(
          switchMap((payload) => {
            return [GetAgentsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetAgentsFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAgent),
      mergeMap((action) =>
        this.apisService.post<AgentModel>('/agents', action.payload).pipe(
          switchMap((payload) => {
            return [CreateAgentSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateAgentFailure(err)))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateAgent),
      mergeMap((action) =>
        this.apisService.post<AgentModel>('/agents', action.payload).pipe(
          switchMap((payload) => {
            return [UpdateAgentSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(UpdateAgentFailure(err)))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAgent),
      mergeMap((action) =>
        this.apisService.delete<any>(`/agents/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteAgentSuccess(), GetAgents()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteAgentFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
