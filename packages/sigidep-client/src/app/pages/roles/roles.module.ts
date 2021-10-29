import {NgModule} from '@angular/core';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {SharedModule} from "@modules/shared.module";
import {AccordionModule} from "primeng/accordion";
import {FormsModule} from "@angular/forms";
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { CreateRoleFormComponent } from '../../components/create-role-form/create-role-form.component';

@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleFormComponent
  ],
    imports: [
      SharedModule,
      RolesRoutingModule,
      AccordionModule,
      FormsModule,
      TriStateCheckboxModule
    ]
})
export class RolesModule { }
