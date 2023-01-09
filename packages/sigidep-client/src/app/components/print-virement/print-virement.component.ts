import { Component, OnInit } from '@angular/core';
import { DetailsVirementModel } from '@models/detailsVirement';
import { VirementModele } from '@models/virement.model';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import jsPDF from "jspdf";
import "jspdf-autotable";

@Component({
  selector: 'app-print-virement',
  templateUrl: './print-virement.component.html',
  styleUrls: ['./print-virement.component.scss']
})
export class PrintVirementComponent implements OnInit {

  public data!: VirementModele;
  public detailsVirement!: DetailsVirementModel[];
  public debit: number = 0;
  public credit: number = 0;
  public entete!: string;
  public chapeau!: string;
  public format = 'A4';
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public translate: TranslateService) { }


  ngOnInit(): void {
    this.data = this.config.data?.data as VirementModele;
    this.detailsVirement = this.data.detailsVirements;
    this.chapeau = this.data.modelVirement.chapeauModel ?? '';
    this.entete = this.data.modelVirement.enteteModel ?? '';
    this.initialisation();
    this.setCreditDetit();
  }

  setCreditDetit() {
    this.detailsVirement.forEach(e => {
      this.debit += e.debit ?? 0;
      this.credit += e.credit ?? 0;
    });
  }
  initialisation() {
    var entete = document.querySelector('#entete') as HTMLParagraphElement;
    var chapeau = document.querySelector('#chapeau') as HTMLParagraphElement;
    entete.innerHTML = this.entete;
    chapeau.innerHTML = this.chapeau;
  }

  exportPdf() {
    const pages = document.querySelector('#print-content') as HTMLElement;
    const doc = new jsPDF({
      unit: 'px',
      format: [595, 842],
      orientation: 'p',
      putOnlyUsedFonts: true,
      precision: 1,
      compress: true,
    });

    doc.html(pages, {
      callback: (doc: jsPDF) => {
        doc.save('pdf-export');
      }
    });
  }

}
