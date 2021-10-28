import {NgModule} from '@angular/core';

import {ExercisesRoutingModule} from './exercises-routing.module';
import {ExercisesComponent} from './exercises.component';
import {SharedModule} from "@modules/shared.module";
import { CreateExerciseFormComponent } from '@components/create-exercise-form/create-exercise-form.component';


@NgModule({
  declarations: [
    ExercisesComponent,
    CreateExerciseFormComponent
  ],
  imports: [
    SharedModule,
    ExercisesRoutingModule
  ]
})
export class ExercisesModule { }
