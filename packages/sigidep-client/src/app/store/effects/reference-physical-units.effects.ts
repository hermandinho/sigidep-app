import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  DeleteReferencePhysicalUnit,
  DeleteReferencePhysicalUnitFailure,
  DeleteReferencePhysicalUnitSuccess,
  GetReferencePhysicalUnits,
  GetReferencePhysicalUnitsFailure,
  GetReferencePhysicalUnitsSuccess,
} from '@store/actions';
import { ParagraphModel, ReferencePhysicalUnitModel } from '@models/index';

@Injectable()
export class ReferencePhysicalUnitsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetReferencePhysicalUnits),
      mergeMap((action) =>
        this.apisService
          .get<ReferencePhysicalUnitModel[]>('/reference-physical-units')
          .pipe(
            switchMap((payload) => {
              return [GetReferencePhysicalUnitsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetReferencePhysicalUnitsFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteReferencePhysicalUnit),
      mergeMap((action) =>
        this.apisService.delete<any>(`/paragraphs/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [
              DeleteReferencePhysicalUnitSuccess(),
              GetReferencePhysicalUnits(),
            ];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteReferencePhysicalUnitFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
