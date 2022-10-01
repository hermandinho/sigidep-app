import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-print-file-rejet-controle-regularite',
  templateUrl: './print-file-rejet-controle-regularite.component.html',
  styleUrls: ['./print-file-rejet-controle-regularite.component.scss']
})
export class PrintFileRejetControleRegulariteComponent implements OnInit {
  data: any;
  constructor( private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.data = this.config.data.item
    console.log(this.config.data.item)
  }

}
