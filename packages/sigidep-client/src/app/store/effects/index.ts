import { AuthEffects } from './auth.effects';
import { RouterEffects } from './router.effects';
import {AppEffects} from "@effects/app.effects";
import {ExercisesEffects} from "@effects/exercises.effects";

export const Effects = [
  AuthEffects,
  RouterEffects,
  AppEffects,
  ExercisesEffects,
];
