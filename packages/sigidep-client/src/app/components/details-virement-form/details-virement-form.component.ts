import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { DetailsVirementModel } from '@models/detailsVirement';
import { EncoursModel } from '@models/encours.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ModeVirementEnum } from '@pages/virements/tools/type-virement';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-details-virement-form',
  templateUrl: './details-virement-form.component.html',
  styleUrls: ['./details-virement-form.component.scss']
})
export class DetailsVirementFormComponent extends BaseComponent implements OnInit {

  @Input() startingForm!: FormGroup;
  @Input() encourList!: DetailsVirementModel[];
  @Input() typeFinancement!: string;
  @Input() mode!: ModeVirementEnum;
  @Input() detailsVirement?: DetailsVirementModel[];

  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  public detailVirementForm!: FormGroup;
  public debitEncourList: DetailsVirementModel[] = [];
  public creditEncourList: DetailsVirementModel[] = [];
  public total_debit: number = 0;
  public total_credit: number = 0;
  public ecart_debit_credit: number = 0;
  public show: boolean = true;

  constructor(
    private _apisService: ApisService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.show = this.mode == ModeVirementEnum.CREATION ? true : false;
    this.detailVirementForm = this.startingForm;

    if (!this.show) {

      this.detailsVirement?.forEach((d) => {
        let details = new DetailsVirementModel(d);
        details.montant = details.debit ?? details.credit;
        if (d.debit) {
          this.debitEncourList.push(details);
        } else {
          this.creditEncourList.push(details);
        }
      });
      this.sumMontant(this.debitEncourList, true);
      this.sumMontant(this.creditEncourList, false);
    }
  }


  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };



  addToCredit(item: DetailsVirementModel) {
    item.isCredit = true;
    this.encourList = [...this.encourList.filter((e) => e != item)];
    this.creditEncourList = [...this.creditEncourList, item];
    this.sumMontant(this.creditEncourList, false);
  }


  addToDebit(item: DetailsVirementModel) {
    item.isCredit = false;
    this.encourList = [...this.encourList.filter((e) => e != item)];
    this.debitEncourList = [...this.debitEncourList, item];
    this.sumMontant(this.debitEncourList, true);
  }

  removeFromDebit(item: DetailsVirementModel) {
    this.debitEncourList = [...this.debitEncourList.filter((e) => e != item)];
    this.encourList = [...this.encourList, item];
    this.sumMontant(this.debitEncourList, true);
  }

  removeFromCredit(item: DetailsVirementModel) {
    this.creditEncourList = [...this.creditEncourList.filter((e) => e != item)];
    this.encourList = [...this.encourList, item];
    this.sumMontant(this.creditEncourList, false);
  }

  sumMontant(list: DetailsVirementModel[], isDebit: boolean) {
    let prix = 0;
    list.forEach((e) => {
      prix += e.montant ?? 0;
    });
    if (isDebit) {
      this.total_debit = prix;
    } else {
      this.total_credit = prix;
    }
    this.ecart_debit_credit = this.total_debit - this.total_credit;
  }

  submitForm() {
    this.startingForm.controls.detailsVirementsDebit.setValue(this.debitEncourList);
    this.startingForm.controls.detailsVirementsCredit.setValue(this.creditEncourList);
    this.submit.emit();
  }

  reserver() {
    alert('action a effectuer')
  }

}
