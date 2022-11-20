import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-print-info-user',
  templateUrl: './print-info-user.component.html',
  styleUrls: ['./print-info-user.component.scss']
})
export class PrintInfoUserComponent implements OnInit {
  data: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.data = this.config.data?.item;
  }

}
