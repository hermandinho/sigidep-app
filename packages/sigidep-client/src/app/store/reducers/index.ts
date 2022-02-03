import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';
import * as fromRouter from './router.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';
import * as fromExercises from './exercise.reducer';
import * as fromRoles from './roles.reducer';
import * as fromFinancialSources from './financial-sources.reducer';
import * as fromAdministrativeUnits from './administrative-units.reducer';
import * as fromTechnicalSupervisors from './technical-supervisors.reducer';
import * as fromParagraphs from './paragraphs.reducer';
import * as fromApp from './app.reducer';
import * as fromSubPrograms from './sub-programs.reducer';
import * as fromAddresses from './addresses.reducer';
import * as fromRefPhysicalUnits from './reference-physical-units.reducer';
import * as fromContribuables from './contribuables.reducer';
import * as fromContribuablesBudgetaires from './contribuables-budgetaires.reducer';

import * as fromBanksAgences from './banks-agences.reducers';
import * as fromRegimes from './regimes.reducer';
import * as fromAgents from './agents.reducer';
import * as fromGrades from './grades.reducer';
import * as fromCategoriesAgents from './categories-agents.reducer';
import * as fromArticles from './articles.reducer';
import * as fromRubriques from './rubriques.reducer';
import * as fromSousRubriques from './sous-rubriques.reducer';
import * as fromCarnetsMandats from './carnets-mandats.reducer';
import * as fromGestionnaires from './gestionnaires.reducer';

import * as fromBaremes from './baremes.reducer';
import * as fromPiecesJointes from './pieces-jointes.reducer';
import * as fromTypesProcedures from './types-procedures.reducer';
import * as fromEncours from './encours.reducer';

export interface AppState {
  router: RouterReducerState<fromRouter.RouterStateUrl>;
  auth: fromAuth.State;
  exercises: fromExercises.State;
  roles: fromRoles.State;
  financialSources: fromFinancialSources.State;
  administrativeUnits: fromAdministrativeUnits.State;
  technicalSupervisors: fromTechnicalSupervisors.State;
  paragraphs: fromParagraphs.State;
  app: fromApp.State;
  subPrograms: fromSubPrograms.State;
  addresses: fromAddresses.State;
  refPhysicalUnits: fromRefPhysicalUnits.State;
  contribuables: fromContribuables.State;
  banksAgences: fromBanksAgences.State;
  regimes: fromRegimes.State;
  contribuablesBudgetaires: fromContribuablesBudgetaires.State;
  grades: fromGrades.State;
  categoriesAgents: fromCategoriesAgents.State;
  agents: fromAgents.State;
  articles: fromArticles.State;
  rubriques: fromRubriques.State;
  sousRubriques: fromSousRubriques.State;
  carnetsMandats: fromCarnetsMandats.State;
  gestionnaires: fromGestionnaires.State;
  baremes: fromBaremes.State;
  typesProcedures: fromTypesProcedures.State;
  piecesJointes: fromPiecesJointes.State;
  encours: fromEncours.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  exercises: fromExercises.reducer,
  roles: fromRoles.reducer,
  financialSources: fromFinancialSources.reducer,
  administrativeUnits: fromAdministrativeUnits.reducer,
  technicalSupervisors: fromTechnicalSupervisors.reducer,
  paragraphs: fromParagraphs.reducer,
  app: fromApp.reducer,
  subPrograms: fromSubPrograms.reducer,
  addresses: fromAddresses.reducer,
  refPhysicalUnits: fromRefPhysicalUnits.reducer,
  contribuables: fromContribuables.reducer,
  banksAgences: fromBanksAgences.reducer,
  regimes: fromRegimes.reducer,
  contribuablesBudgetaires: fromContribuablesBudgetaires.reducer,
  grades: fromGrades.reducer,
  categoriesAgents: fromCategoriesAgents.reducer,
  agents: fromAgents.reducer,
  articles: fromArticles.reducer,
  rubriques: fromRubriques.reducer,
  sousRubriques: fromSousRubriques.reducer,
  carnetsMandats: fromCarnetsMandats.reducer,
  gestionnaires: fromGestionnaires.reducer,
  baremes: fromBaremes.reducer,
  piecesJointes: fromPiecesJointes.reducer,
  typesProcedures: fromTypesProcedures.reducer,
  encours: fromEncours.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
