import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateVirement,
  CreateVirementFailure,
  CreateVirementSuccess,
  DeleteVirement,
  DeleteVirementFailure,
  DeleteVirementSuccess,
  GetVirement,
  GetVirementsFailure,
  GetVirementsSuccess,
  UpdateVirement,
  UpdateVirementFailure,
  UpdateVirementSuccess,
} from '@store/actions';
import { VirementModele } from '@models/index';

@Injectable()
export class VirementEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetVirement),
      mergeMap((action) =>
        this.apisService.get<VirementModele[]>('/virements').pipe(
          switchMap((payload) => {
            return [GetVirementsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetVirementsFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteVirement),
      mergeMap((action) =>
        this.apisService.delete<any>(`/virements/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteVirementSuccess(), GetVirement()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteVirementFailure(err))
          )
        )
      )
    )
  );


  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateVirement),
      mergeMap((action) =>
        this.apisService.post<VirementModele>('/virements', action.payload).pipe(
          switchMap((payload) => {
            return [UpdateVirementSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(UpdateVirementFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateVirement),
      mergeMap((action) =>
        this.apisService.post<VirementModele>('/virements', action.payload).pipe(
          switchMap((payload) => {
            return [CreateVirementSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateVirementFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
