import { NgModule } from '@angular/core';
import { ArticlesRoutingModule } from './articles-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { CreateArticleFormComponent } from '@components/create-article-form/create-article-form.component';

import { SharedModule } from '@modules/shared.module';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';

const declarations = [ArticlesComponent, CreateArticleFormComponent];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    CheckboxModule,
    InputMaskModule,
    SharedModule,
    ToastModule,
  ],
})
export class ArticlesModule {}
