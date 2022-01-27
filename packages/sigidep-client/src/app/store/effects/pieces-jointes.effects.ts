import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
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

@Injectable()
export class PiecesJointesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPiecesJointes),
      mergeMap((action) =>
        this.apisService.get<PieceJointeModel[]>('/pieces-jointes').pipe(
          switchMap((payload) => {
            return [GetPiecesJointesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetPiecesJointesFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePieceJointe),
      mergeMap((action) =>
        this.apisService
          .post<PieceJointeModel>('/pieces-jointes', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreatePieceJointeSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreatePieceJointeFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdatePieceJointe),
      mergeMap((action) =>
        this.apisService
          .post<PieceJointeModel>('/pieces-jointes', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdatePieceJointeSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdatePieceJointeFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeletePieceJointe),
      mergeMap((action) =>
        this.apisService.delete<any>(`/pieces-jointes/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeletePieceJointeSuccess(), GetPiecesJointes()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeletePieceJointeFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
