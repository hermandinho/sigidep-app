import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesAgentsRoutingModule } from './categories-agents-routing.module';
import { CategoriesAgentsComponent } from './categories-agents.component';
import { CategorieAgentFormComponent } from '@components/categorie-agent-form/categorie-agent-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CategoriesAgentsComponent, CategorieAgentFormComponent],
  imports: [
    CommonModule,
    CategoriesAgentsRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class CategoriesAgentsModule {}
