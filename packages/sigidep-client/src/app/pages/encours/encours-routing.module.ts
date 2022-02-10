import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayEncoursItemComponent } from '@components/display-encours-item/display-encours-item.component';
import { DisplayEncoursStatisticsComponent } from '@components/display-encours-statistics/display-encours-statistics.component';
import { EncoursComponent } from './encours.component';

const routes: Routes = [
  { path: '', component: EncoursComponent },
  {
    path: 'details/:id',
    pathMatch: 'prefix',
    component: DisplayEncoursItemComponent,
  },
  {
    path: 'statistics',
    pathMatch: 'prefix',
    component: DisplayEncoursStatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncoursRoutingModule {}
