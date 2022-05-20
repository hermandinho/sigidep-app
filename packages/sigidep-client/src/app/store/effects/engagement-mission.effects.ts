import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import { EngagementMissionModel } from '@models/engagement-mission.model';
import {
  CreateEngagementMission,
  CreateEngagementMissionFailure,
  CreateEngagementMissionsuccess,
  DeleteEngagementMission,
  DeleteEngagementMissionFailure,
  DeleteEngagementMissionSuccess,
  GetEngagementMissions,
  GetEngagementMissionsFailure,
  GetEngagementMissionsSuccess,
  UpdateEngagementMission,
  UpdateEngagementMissionFailure,
  UpdateEngagementMissionSuccess,
} from '@actions/engagement-mission.actions';

@Injectable()
export class EngagementsMissionsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementMissions),
      mergeMap((action) =>
        this.apisService
          .get<EngagementMissionModel[]>('/engagements/missions', {
            ...(action.procedures && {
              procedures: action.procedures.join(','),
            }),
            ...(action.etats && {
              etats: action.etats.join(','),
            }),
          })
          .pipe(
            switchMap((payload) => {
              return [GetEngagementMissionsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetEngagementMissionsFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEngagementMission),
      mergeMap((action) =>
        this.apisService
          .post<EngagementMissionModel>('/engagements/missions', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateEngagementMissionsuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateEngagementMissionFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateEngagementMission),
      mergeMap((action) =>
        this.apisService
          .post<EngagementMissionModel>('/engagements/missions', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateEngagementMissionSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateEngagementMissionFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEngagementMission),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/engagements/missions/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteEngagementMissionSuccess(),
                GetEngagementMissions({}),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteEngagementMissionFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
