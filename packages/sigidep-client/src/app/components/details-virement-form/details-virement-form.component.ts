import { GetVirement } from '@actions/virement.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { DetailsVirementModel } from '@models/detailsVirement';
import { SubProgramModel } from '@models/sub-program.model';
import { VirementModele } from '@models/virement.model';
import { Store } from '@ngrx/store';
import { ModeVirementEnum, typeVirementEnum } from '@pages/virements/tools/virement-tools';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { ParseAmount } from 'app/configs/parseAmountConfig';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details-virement-form',
  templateUrl: './details-virement-form.component.html',
  styleUrls: ['./details-virement-form.component.scss']
})
export class DetailsVirementFormComponent extends BaseComponent implements OnInit {

  @Input() startingForm!: FormGroup;
  @Input() encourList!: DetailsVirementModel[];
  @Input() mode!: ModeVirementEnum;
  @Input() detailsVirement?: DetailsVirementModel[];
  @Input() virement?: VirementModele;

  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateData: EventEmitter<any> = new EventEmitter<any>();

  public detailVirementForm!: FormGroup;
  public debitEncourList: DetailsVirementModel[] = [];
  public creditEncourList: DetailsVirementModel[] = [];
  public total_debit: string = '0';
  public total_credit: string = '0';
  public ecart_debit_credit: number = 0;
  public create: boolean = true;
  public validate: boolean = false;
  public reserved: boolean = false;
  public cancel: boolean = false;
  public update: boolean = false;
  public detailsVirementList: DetailsVirementModel[] = [];
  public scSource!: SubProgramModel;
  public scCible!: SubProgramModel;
  public typeFinancement?: string;

  public debit: number = 0;
  public credit: number = 0;

  constructor(
    private _apisService: ApisService,
    public ref: DynamicDialogRef,
    private _appService: AppService,
    private _store: Store<AppState>,
    private _dialogService: DialogsService,
    private parseAmount: ParseAmount
  ) {
    super();
  }

  ngOnInit(): void {
    this.setMode();
    if (this.mode === ModeVirementEnum.CREATION) {
      this.scSource = this.startingForm.value.spSourceVirement;
      this.scCible = this.startingForm.value.spCibleVirement;
      this.typeFinancement = this.startingForm.value.typeVirement;
    }
    this._initialListener();
    this.detailVirementForm = this.startingForm;
  }


  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  _initialListener() {

    if (!this.create && !this.update) {
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
    } else if (this.mode === ModeVirementEnum.CREATION) {
      this.filterByTypeFiancement(this.scSource.labelFr, this.scCible.labelFr)
    } else {
      this.getDetailsVirementByVirement();
      var scSourceText = this.startingForm.value.spSourceVirement as string;
      var scCibleText = this.startingForm.value.spCibleVirement as string;
      scSourceText = scSourceText.split('/')[1];
      scCibleText = scCibleText.split('/')[1];
      this.typeFinancement = this.virement?.typeVirement;
      this.filterByTypeFiancement(scSourceText, scCibleText)
    }
  }

  filterByTypeFiancement(labelSource: string, labelCible: string) {
    let encourTmp = this.encourList;

    this.encourList = [];
    encourTmp.forEach((e) => {
      let isCredit = e.encour.subProgram.includes(labelCible) ? true : false;
      let isDebit = e.encour.subProgram.includes(labelSource) ? true : false;
      e.isCredit = isCredit;
      e.isDebit = isDebit;
      switch (this.typeFinancement) {
        case typeVirementEnum.BF2BF:
          if (e.encour.sourceFinancement.includes('BF')) {
            this.encourList.push(e);
          }
          break;
        case typeVirementEnum.BIP2BIP:
          if (e.encour.sourceFinancement.includes('BIP')) {
            this.encourList.push(e);
          }
          break;
        case typeVirementEnum.BF2BIP:
          if ((e.encour.sourceFinancement.includes('BF') && isDebit)
            || (e.encour.sourceFinancement.includes('BIP') && isCredit)) {
            this.encourList.push(e);
          }
          break;
        case typeVirementEnum.BIP2BF:
          if ((e.encour.sourceFinancement.includes('BIP') && isDebit)
            || (e.encour.sourceFinancement.includes('BF') && isCredit)) {
            this.encourList.push(e);
          }
          break;
      }
    });
  }

  async getDetailsVirementByVirement() {
    await this._apisService
      .get<DetailsVirementModel[]>('/virements/details/' + this.virement?.id)
      .subscribe(
        (res) => {
          this.detailsVirementList = [...res];
          this.detailsVirementList?.forEach((d) => {
            this.encourList = [...this.encourList.filter((e) => e.libelleInput != d.libelleInput)]
            let statusDebit = d.credit != null ? false : true;
            // let isCredit = d.libelleInput;
            let detail = new DetailsVirementModel({
              codeInput: d.codeInput,
              libelleInput: d.libelleInput,
              encour: d.encour,
              montant: d.credit ?? d.debit,
            });
            if (!statusDebit) {
              this.addToCredit(detail);
            } else {
              this.addToDebit(detail);
            }
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.dejaRegion';
          } else {
            err = 'errors.unknown';
          }
          this._appService.showToast({
            detail: err,
            summary: 'errors.error',
            severity: 'error',
            life: 5000,
            closable: true,
          });
        }
      );
  }

  addToCredit(item: DetailsVirementModel) {
    this.encourList = [...this.encourList.filter((e) => e != item)];
    this.creditEncourList = [...this.creditEncourList, item];
    this.sumMontant(this.creditEncourList, false);
  }


  addToDebit(item: DetailsVirementModel) {
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
      this.debit = prix;
    } else {
      this.credit = prix;
    }
    this.ecart_debit_credit = this.debit - this.credit;
    this.total_credit = this.format(this.credit);
    this.total_debit = this.format(this.debit);
  }

  submitForm() {
    this.startingForm.controls.detailsVirementsDebit.setValue(this.debitEncourList);
    this.startingForm.controls.detailsVirementsCredit.setValue(this.creditEncourList);
    this.submit.emit();
  }

  async reserver() {

    const modal = await this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Etes vous sur de vouloir reserver le Virement N°', subtitle: 'Cette Opperation mouvementera des credits', isConfirmation: true }, 25);
    modal.onClose.subscribe((resp: boolean) => {
      if (resp) {
        this._apisService
          .post<VirementModele>('/virements/reserver/' + this.virement?.id, null)
          .subscribe(
            (res) => {
              this.ref.close(res);
              this._store.dispatch(GetVirement());
              this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Reservation du virement N°', subtitle: 'Effactué avec success' }, 18);
              this._appService.showToast({
                summary: 'message.success',
                detail: 'messages.virement.reserverSuccess',
                severity: 'success',
                life: 3000,
                closable: true,
              });
            },
            ({ error }) => {
              this.ref.close();
              let err = '';
              if (error?.statusCode === 409) {
                err = 'errors.dejaRegion';
              } else {
                err = 'errors.unknown';
              }
              this._appService.showToast({
                detail: err,
                summary: 'errors.error',
                severity: 'error',
                life: 5000,
                closable: true,
              });
            }
          );
      }
    });
  }

  async cancelled() {
    const modal = await this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Etes vous sur de vouloir annuler le Virement N°', subtitle: 'Cette Opperation mouvementera des credits', isConfirmation: true }, 25);
    modal.onClose.subscribe((resp: boolean) => {
      if (resp) {
        this._apisService
          .post<VirementModele>('/virements/annuler/' + this.virement?.id, null)
          .subscribe(
            (res) => {
              this.ref.close(res);
              this._store.dispatch(GetVirement());
              this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Annulation du virement N°', subtitle: 'Effactué avec success' }, 18);
              this._appService.showToast({
                summary: 'message.success',
                detail: 'messages.virement.annulerSuccess',
                severity: 'success',
                life: 3000,
                closable: true,
              });
            },
            ({ error }) => {
              this.ref.close();
              let err = '';
              if (error?.statusCode === 409) {
                err = 'errors.dejaRegion';
              } else {
                err = 'errors.unknown';
              }
              this._appService.showToast({
                detail: err,
                summary: 'errors.error',
                severity: 'error',
                life: 5000,
                closable: true,
              });
            }
          );
      }
    });

  }

  setMode() {
    switch (this.mode) {
      case ModeVirementEnum.CREATION:
        this.create = true;
        this.validate = false;
        this.reserved = false;
        this.cancel = false;
        this.update = false;
        break;
      case ModeVirementEnum.VALIDATION:
        this.create = false;
        this.validate = true;
        this.reserved = false;
        this.cancel = false;
        this.update = false;
        break;
      case ModeVirementEnum.RESERVATION:
        this.create = false;
        this.validate = false;
        this.reserved = true;
        this.cancel = false;
        this.update = false;
        break;
      case ModeVirementEnum.CANCELLED:
        this.create = false;
        this.validate = false;
        this.reserved = false;
        this.cancel = true;
        this.update = false;
        break;
      case ModeVirementEnum.UPDATED:
        this.create = false;
        this.validate = false;
        this.reserved = false;
        this.cancel = false;
        this.update = true;
        break;
    }
  }

  submitForUpdate() {
    this.startingForm.controls.detailsVirementsDebit.setValue(this.debitEncourList);
    this.startingForm.controls.detailsVirementsCredit.setValue(this.creditEncourList);
    this.updateData.emit();
  }

  format(value: number) {
    return this.parseAmount.parseToXAF(value);
  }
}
