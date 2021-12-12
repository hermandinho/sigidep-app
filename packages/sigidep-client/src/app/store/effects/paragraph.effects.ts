import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  DeleteParagraph,
  DeleteParagraphFailure,
  DeleteParagraphSuccess,
  GetParagraphs,
  GetParagraphsFailure,
  GetParagraphsSuccess,
} from '@store/actions';
import { ParagraphModel } from '@models/index';

@Injectable()
export class ParagraphEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetParagraphs),
      mergeMap((action) =>
        this.apisService.get<ParagraphModel[]>('/paragraphs').pipe(
          switchMap((payload) => {
            return [GetParagraphsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetParagraphsFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteParagraph),
      mergeMap((action) =>
        this.apisService.delete<any>(`/paragraphs/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteParagraphSuccess(), GetParagraphs()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteParagraphFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
