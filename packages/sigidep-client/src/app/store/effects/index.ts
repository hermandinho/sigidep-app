import { AuthEffects } from './auth.effects';
import { RouterEffects } from './router.effects';
import { AppEffects } from '@effects/app.effects';
import { ExercisesEffects } from '@effects/exercises.effects';
import { RolesEffects } from '@effects/roles.effects';
import { FinancialSourcesEffects } from '@effects/financial-sources.effects';
import { AdministrativeUnitsEffects } from '@effects/administrative-units.effects';
import { TechnicalSupervisorEffects } from '@effects/technical-supervisor.effects';
import { ParagraphEffects } from '@effects/paragraph.effects';
import { SubProgramsEffects } from '@effects/sub-programs.effects';
import { AddressesEffects } from '@effects/addresses.effects';
import { ReferencePhysicalUnitsEffects } from '@effects/reference-physical-units.effects';
import { ContribuablesEffects } from '@effects/contribuables.effects';
import { BanksAgencesEffects } from '@effects/banks-agences.effects';
import { RegimesEffects } from '@effects/regimes.effects';
import { AgentsEffects } from './agents.effects';
import { GradesEffects } from './grades.effects';
import { CategoriesAgntsEffects } from './categories-agents.effects';

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
  SubProgramsEffects,
  AddressesEffects,
  ReferencePhysicalUnitsEffects,
  ContribuablesEffects,
  BanksAgencesEffects,
  RegimesEffects,
  AgentsEffects,
  GradesEffects,
  CategoriesAgntsEffects,
];
