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
import { ContribuablesBudgetairesEffects } from './contribuables-budgetaires.effects';
import { AgentsEffects } from './agents.effects';
import { GradesEffects } from './grades.effects';
import { CategoriesAgntsEffects } from './categories-agents.effects';
import { ArticlesEffects } from './articles.effects';
import { SousRubriquesEffects } from './sous-rubriques.effects';
import { RubriquesEffects } from './rubriques.effects';
import { CarnetsMandatsEffects } from './carnets-mandats.effects';
import { GestionnairesEffects } from './gestionnaires.effects';
import { TypesProceduresEffects } from './types-procedures.effects';
import { BaremesEffects } from './baremes.effects';
import { PiecesJointesEffects } from './pieces-jointes.effects';
import { EncoursEffects } from './encours.effects';
import { AccreditationEffects } from './accreditations.effects';
import { EngagementsCommandesEffects } from '@effects/engagement-commande.effects';
import { EngagementsDecisionsEffects } from '@effects/engagement-decision.effects';
import { EngagementsJuridiquesEffects } from '@effects/engagement-juridique.effects';
import { EngagementsMissionsEffects } from '@effects/engagement-mission.effects';
import { TaxesEffects } from '@effects/exec-taxes.effects';
import { ProceduresEffects } from '@effects/exec-procedure.effects';
import { ConsultationsEffects } from './consultations.effects';
import { BonsEngagementsEffects } from './bon-engagement.effects';
import { EngagementsEffects } from './engagements.effects';

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
  ContribuablesBudgetairesEffects,
  AgentsEffects,
  GradesEffects,
  CategoriesAgntsEffects,
  ArticlesEffects,
  SousRubriquesEffects,
  RubriquesEffects,
  CarnetsMandatsEffects,
  ContribuablesBudgetairesEffects,
  GestionnairesEffects,
  TypesProceduresEffects,
  BaremesEffects,
  PiecesJointesEffects,
  EncoursEffects,
  AccreditationEffects,
  EngagementsCommandesEffects,
  EngagementsMissionsEffects,
  EngagementsDecisionsEffects,
  ProceduresEffects,
  TaxesEffects,
  EngagementsJuridiquesEffects,
  ConsultationsEffects,
  BonsEngagementsEffects,
  EngagementsEffects,
];
