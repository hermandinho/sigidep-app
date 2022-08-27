import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateModelevirement,
  CreateModeleVirementFailure,
  CreateModeleVirementSuccess,
  DeleteModelVirement,
  DeleteModelVirementFailure,
  DeleteModelVirementSuccess,
  GetModeleVirement,
  GetModeleVirementsFailure,
  GetModeleVirementsSuccess,
  UpdateModeleVirement,
  UpdateModeleVirementFailure,
  UpdateModeleVirementSuccess,
} from '@store/actions';
import { ModeleVirementModel } from '@models/index';

@Injectable()
export class ModeleVirementEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetModeleVirement),
      mergeMap((action) =>
        this.apisService.get<ModeleVirementModel[]>('/modele-virements').pipe(
          switchMap((payload) => {
            return [GetModeleVirementsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetModeleVirementsFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteModelVirement),
      mergeMap((action) =>
        this.apisService.delete<any>(`/modele-virements/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteModelVirementSuccess(), GetModeleVirement()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteModelVirementFailure(err))
          )
        )
      )
    )
  );


  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateModeleVirement),
      mergeMap((action) =>
        this.apisService.post<ModeleVirementModel>('/modele-virements', action.payload).pipe(
          switchMap((payload) => {
            return [UpdateModeleVirementSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(UpdateModeleVirementFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateModelevirement),
      mergeMap((action) =>
        this.apisService.post<ModeleVirementModel>('/modele-virements', action.payload).pipe(
          switchMap((payload) => {
            return [CreateModeleVirementSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateModeleVirementFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
