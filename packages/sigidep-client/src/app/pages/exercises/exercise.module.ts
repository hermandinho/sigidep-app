import {NgModule} from '@angular/core';

import {ExerciseRoutingModule} from './exercise-routing.module';
import {ExerciseComponent} from './exercise.component';
import {SharedModule} from "@modules/shared.module";


@NgModule({
  declarations: [
    ExerciseComponent
  ],
  imports: [
    SharedModule,
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
