import { NgModule } from '@angular/core';

import { SubProgramsRoutingModule } from './sub-programs-routing.module';
import { SubProgramsComponent } from './sub-programs.component';
import { SharedModule } from '@modules/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { CreateSubProgramFormComponent } from '@components/create-sub-program-form/create-sub-program-form.component';
import { SubProgramsListComponent } from './sub-programs-list/sub-programs-list.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CreateSubProgramObjectiveFormComponent } from '../../components/create-sub-program-objective-form/create-sub-program-objective-form.component';
import { CreateSubProgramObjectiveIndicatorFormComponent } from '../../components/create-sub-program-objective-indicator-form/create-sub-program-objective-indicator-form.component';
import { ToastModule } from 'primeng/toast';
import { CreateSubProgramActivityFormComponent } from '../../components/create-sub-program-activity-form/create-sub-program-activity-form.component';
import { SubProgramActivitiesViewComponent } from '../../views/sub-program-activities-view/sub-program-activities-view.component';
import { CreateSubProgramActivityTaskFormComponent } from '../../components/create-sub-program-activity-task-form/create-sub-program-activity-task-form.component';
import { SubProgramActivityTasksViewComponent } from '../../views/sub-program-activity-tasks-view/sub-program-activity-tasks-view.component';
import { CreateSubProgramActivityTaskOperationFormComponent } from '../../components/create-sub-program-activity-task-operation-form/create-sub-program-activity-task-operation-form.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { SubProgramActivityTasksOperationsViewComponent } from '../../views/sub-program-activity-tasks-operations-view/sub-program-activity-tasks-operations-view.component';

@NgModule({
  declarations: [
    SubProgramsComponent,
    CreateSubProgramFormComponent,
    SubProgramsListComponent,
    CreateSubProgramObjectiveFormComponent,
    CreateSubProgramObjectiveIndicatorFormComponent,
    CreateSubProgramActivityFormComponent,
    SubProgramActivitiesViewComponent,
    CreateSubProgramActivityTaskFormComponent,
    SubProgramActivityTasksViewComponent,
    CreateSubProgramActivityTaskOperationFormComponent,
    SubProgramActivityTasksOperationsViewComponent,
  ],
  imports: [
    SharedModule,
    SubProgramsRoutingModule,
    TreeTableModule,
    InputMaskModule,
    ToastModule,
    FieldsetModule,
    InputNumberModule,
    FormsModule,
  ],
})
export class SubProgramsModule {}
