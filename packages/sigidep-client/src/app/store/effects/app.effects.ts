import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  GetStructure,
  GetStructureFailure,
  GetStructureSuccess,
} from '@store/actions';
import { ApisService } from '@services/apis.service';
import { StructureModel } from '@models/structure.model';

@Injectable()
export class AppEffects {
  fetchStructure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetStructure),
      mergeMap((action) =>
        this.apisService.get<StructureModel>('/structure').pipe(
          switchMap((payload: StructureModel) => {
            return [GetStructureSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetStructureFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
