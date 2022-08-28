import { Component, OnInit } from '@angular/core';
import { VirementMessage } from '@models/virement-message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-show-virement-message',
  templateUrl: './show-virement-message.component.html',
  styleUrls: ['./show-virement-message.component.scss']
})
export class ShowVirementMessageComponent implements OnInit {
  public message!: VirementMessage;
  ok: string = 'OK';
  cancel: string = 'Anuler'

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.message = this.config.data?.data;
  }

  closeOk() {
    this.ref.close(true);
  }

  closeCancel() {
    this.ref.close(false);
  }

}
