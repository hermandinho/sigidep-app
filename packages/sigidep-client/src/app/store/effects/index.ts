import { AuthEffects } from './auth.effects';
import { RouterEffects } from './router.effects';
import {AppEffects} from "@effects/app.effects";
import {ExercisesEffects} from "@effects/exercises.effects";
import {RolesEffects} from "@effects/roles.effects";
import {FinancialSourcesEffects} from "@effects/financial-sources.effects";
import {AdministrativeUnitsEffects} from "@effects/administrative-units.effects";
import {TechnicalSupervisorEffects} from "@effects/technical-supervisor.effects";
import {ParagraphEffects} from "@effects/paragraph.effects";

export const Effects = [
  AuthEffects,
  RouterEffects,
  AppEffects,
  ExercisesEffects,
  RolesEffects,
  FinancialSourcesEffects,
  AdministrativeUnitsEffects,
  TechnicalSupervisorEffects,
  ParagraphEffects,
];
