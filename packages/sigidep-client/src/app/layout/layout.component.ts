import {ConfirmationService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../components/base.component";
import {AppService} from "../services/app.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends BaseComponent implements OnInit {
  public sideBarMinimized = false;

  constructor(
    public readonly appService: AppService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.sideBarMinimized.subscribe(
        (value: boolean) => (this.sideBarMinimized = value)
      )
    );
  }
}

