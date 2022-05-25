import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeblocageContributionRoutingModule } from './deblocage-contribution-routing.module';
import { DeblocageContributionComponent } from './deblocage-contribution.component';


@NgModule({
  declarations: [
    DeblocageContributionComponent
  ],
  imports: [
    CommonModule,
    DeblocageContributionRoutingModule
  ]
})
export class DeblocageContributionModule { }
