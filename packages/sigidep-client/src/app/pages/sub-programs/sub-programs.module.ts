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

@NgModule({
  declarations: [
    SubProgramsComponent,
    CreateSubProgramFormComponent,
    SubProgramsListComponent,
    CreateSubProgramObjectiveFormComponent,
    CreateSubProgramObjectiveIndicatorFormComponent,
  ],
  imports: [
    SharedModule,
    SubProgramsRoutingModule,
    TreeTableModule,
    InputMaskModule,
  ],
})
export class SubProgramsModule {}
