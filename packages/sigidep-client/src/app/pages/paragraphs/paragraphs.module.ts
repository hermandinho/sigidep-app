import {NgModule} from '@angular/core';

import {ParagraphsRoutingModule} from './paragraphs-routing.module';
import {ParagraphsComponent} from './paragraphs.component';
import {CreateParagraphFormComponent} from '@components/create-paragraph-form/create-paragraph-form.component';
import {SharedModule} from "@modules/shared.module";
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
  declarations: [
    ParagraphsComponent,
    CreateParagraphFormComponent
  ],
  imports: [
    SharedModule,
    ParagraphsRoutingModule,
    InputMaskModule
  ]
})
export class ParagraphsModule { }
