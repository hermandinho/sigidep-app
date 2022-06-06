import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import {
  GetEngagementJuridiquesByCategory,
  GetEngagementJuridiquesByCategoryFailure,
  GetEngagementJuridiquesByCategorySuccess,
} from '@actions/engagements.actions';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { CategorieProcedure } from 'app/utils/types';

@Injectable()
export class EngagementsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementJuridiquesByCategory),
      mergeMap((action) =>
        this.apisService
          .get<
            (
              | EngagementMissionModel
              | EngagementCommandeModel
              | EngagementDecisionModel
            )[]
          >(urlBroker(action.category), {
            ...(action.procedures && {
              procedures: action.procedures.join(','),
            }),
            ...(action.etats && {
              etats: action.etats.join(','),
            }),
          })
          .pipe(
            switchMap((payload) => {
              return [GetEngagementJuridiquesByCategorySuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetEngagementJuridiquesByCategoryFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}

const urlBroker = (category?: CategorieProcedure): string => {
  switch (category) {
    case 'commande':
      return '/engagements/commandes';

    case 'decision':
      return '/engagements/decisions';

    case 'mission':
      return '/engagements/missions';

    default:
      return '/engagements';
  }
};
