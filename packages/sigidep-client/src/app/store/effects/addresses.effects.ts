import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  GetRegions,
  GetRegionsFailure,
  GetRegionsSuccess,
} from '@store/actions';
import {
  DeleteRegion,
  DeleteRegionSuccess,
  DeleteRegionFailure,
} from '@actions/regions.actions'
import { RegionsModel } from '@models/addresses.model';

@Injectable()
export class AddressesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRegions),
      mergeMap((action) =>
        this.apisService.get<RegionsModel[]>('/addresses').pipe(
          switchMap((payload) => {
            return [GetRegionsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetRegionsFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteRegion),
      mergeMap((action) =>
        this.apisService.delete<any>(`/regions/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteRegionSuccess(), GetRegions()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteRegionFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
