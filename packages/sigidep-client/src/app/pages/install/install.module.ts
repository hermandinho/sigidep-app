import { NgModule } from '@angular/core';
import { InstallComponent } from '@pages/install/install.component';
import { SharedModule } from '@modules/shared.module';
import { StructuresService } from '@services/structures.service';
import { ToastModule } from 'primeng/toast';
import { InstallRoutingModule } from '@pages/install/install-routing.module';

@NgModule({
  declarations: [InstallComponent],
  imports: [SharedModule, ToastModule, InstallRoutingModule],
  providers: [StructuresService],
})
export class InstallModule {}
