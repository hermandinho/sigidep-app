import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '@modules/shared.module';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    ToastModule,
    // CardModule,
  ],
})
export class HomeModule {}
