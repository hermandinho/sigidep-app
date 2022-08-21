import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { EncoursModel } from '@models/encours.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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
  @Input() encourList!: EncoursModel[];
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  public detailVirementForm!: FormGroup;
  public debitEncourList: EncoursModel[] = [];
  public creditEncourList: EncoursModel[] = [];
  public totalDebit: string = '';

  constructor(
    private _apisService: ApisService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.detailVirementForm = this.startingForm;
  }


  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };



  addToCredit(item: EncoursModel) {
    this.encourList = [...this.encourList.filter((e) => e != item)];
    this.creditEncourList = [...this.creditEncourList, item];
  }


  addToDebit(item: EncoursModel) {
    this.encourList = [...this.encourList.filter((e) => e != item)];
    this.debitEncourList = [...this.debitEncourList, item];
  }

  removeFromDebit(item: EncoursModel) {
    this.debitEncourList = [...this.debitEncourList.filter((e) => e != item)];
    this.encourList = [...this.encourList, item];
  }

  removeFromCredit(item: EncoursModel) {
    this.creditEncourList = [...this.creditEncourList.filter((e) => e != item)];
    this.encourList = [...this.encourList, item];
  }

}
