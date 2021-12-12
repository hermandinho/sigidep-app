import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@modules/shared.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
