import {NgModule} from '@angular/core';

import {ExercisesRoutingModule} from './exercises-routing.module';
import {ExercisesComponent} from './exercises.component';
import {SharedModule} from "@modules/shared.module";
import { CreateExerciseFormComponent } from '@components/create-exercise-form/create-exercise-form.component';
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
  declarations: [
    ExercisesComponent,
    CreateExerciseFormComponent
  ],
    imports: [
        SharedModule,
        ExercisesRoutingModule,
        CheckboxModule
    ]
})
export class ExercisesModule { }
