import { Component, OnInit } from '@angular/core';
import { EncoursModel } from '@models/encours.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-etat-imputation',
  templateUrl: './etat-imputation.component.html',
  styleUrls: ['./etat-imputation.component.scss']
})
export class EtatImputationComponent implements OnInit {

  public imputation!: EncoursModel;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
     if (this.config.data?.item) {
       this.imputation = this.config.data?.item as EncoursModel;
       console.log(this.imputation)
    }
  }

   close() {
    this.ref.close();
  }

}
