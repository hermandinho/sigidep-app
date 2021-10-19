import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from "./layout.component";
import {AvatarModule} from "primeng/avatar";
import {SharedModule} from "../modules/shared.module";

const declarations = [
  HeaderComponent,
  LayoutComponent,
  SidebarComponent,
];
@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
