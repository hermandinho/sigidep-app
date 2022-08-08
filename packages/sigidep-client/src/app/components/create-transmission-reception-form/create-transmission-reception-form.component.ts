import { GetTransmissionsReceptions } from '@actions/transmissions-receptions.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { StepTransmission, TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-create-transmission-reception-form',
  templateUrl: './create-transmission-reception-form.component.html',
  styleUrls: ['./create-transmission-reception-form.component.scss']
})
export class CreateTransmissionReceptionFormComponent extends BaseComponent implements OnInit {

  public currentStepBs: BehaviorSubject<StepTransmission> =
    new BehaviorSubject<StepTransmission>('constitution');
  public currentStep$: Observable<StepTransmission> =
    this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'book' | 'edit';
  public busy = false;
  public isCheck = false;
  public situationForm: any;
  //bookProcess:any;
  public editedBordereau!:TransmissionsReceptionModel;
  public currentProcedure:string='';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService,
    private translate: TranslateService
  ) {
    super();
   }

  ngOnInit(): void {
    this.form = this._fb.group({
      constitutionForm: this._fb.group({
        bon_engagement: [undefined]
      }),
      bordereauForm: this._fb.group({
        id: [undefined],
        numero: [undefined],
        objet: [undefined],
        serviceSource: [undefined],
        serviceDestination: [undefined],
        lieu: [undefined],
        date: [undefined],
        valueobjet: [undefined],
      }),

      printForm: this._fb.group({
      }),
    });

    if (this.config.data?.item) {
      const {
        id,
        numero,
        objet,
        serviceSource,
        serviceDestination,
        lieu,
        date,
        bon_engagement,
        valueobjet
      } = this.config.data?.item as
        | TransmissionsReceptionModel
        | any;
      this.form.patchValue({
        constitutionForm: {
          bon_engagement
        },
        bordereauForm: {
          id,
          numero,
          objet,
          serviceSource,
          serviceDestination,
          lieu,
          date,
          valueobjet
        },
        printForm: {},
      });
    }
  }


  get constitutionFormGroup(): FormGroup {
    return this.form?.get('constitutionForm') as FormGroup;
  }
  get bordereauFormGroup(): FormGroup {
    return this.form?.get('bordereauForm') as FormGroup;
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.bordereauForm?.id;
  }

  get isBook() {
    return this.action === 'book';
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
  }

  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    for(let i=0; i<this.form.getRawValue()?.constitutionForm?.bon_engagement.length;i++){
      console.log(this.form.getRawValue()?.constitutionForm?.bon_engagement[i]?.numActeJuridique?.codeProcedure)
      if(this.form.getRawValue()?.constitutionForm?.bon_engagement[i]?.numActeJuridique?.codeProcedure==="1125"){
        this.currentProcedure=this.form.getRawValue()?.constitutionForm?.bon_engagement[i]?.numActeJuridique?.codeProcedure;
         console.log(this.currentProcedure)
      }
    }

    switch (currentStep) {
      case 'constitution':
        if (direction === 'forward') {
          this.currentStepBs.next('bordereau');
        }
        break;
      case 'bordereau':
        if (direction === 'forward') {
          this.currentStepBs.next('print');
        }
        if (direction === 'back') {
          this.currentStepBs.next('constitution');
        }
        break;
      case 'print':
        if (direction === 'back') {
          this.currentStepBs.next('bordereau');
        }
        break;
    }
  }


  submitForm() {
    console.log('theo')
    const formValues = this.form.getRawValue();
    this.busy = true;
      this.editedBordereau = {
        ...this.form.getRawValue()?.constitutionForm,
        ...this.form.getRawValue().bordereauForm,
      } as TransmissionsReceptionModel;

    console.log("",this.editedBordereau)

    if (this.isUpdateForm) {
      console.log("isBook")
      const method: Observable<any> = this._apisService.put<TransmissionsReceptionModel>(
        '/transmissions-receptions',
        this.editedBordereau
      );
      method.subscribe(
        (res) => {
          this.busy = false;
          //this.ref.close(res);
          this._store.dispatch(
            GetTransmissionsReceptions({})
          );
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.engagements.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
          this.currentStepBs.next('print');
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.engagements.notfound';
          } else {
            err = 'errors.unknown';
          }
          this.busy = false;
          this._appService.showToast({
            detail: err,
            summary: 'errors.error',
            severity: 'error',
            life: 5000,
            closable: true,
          });
        }
      );
    } else {
      console.log("isBook")
      this.ref.close();
      this._appService.saveConfirmation({
        message: 'dialogs.messages.saveBon',
        accept: () => {
          const method: Observable<any> =
            this._apisService.post<TransmissionsReceptionModel>(
              '/transmissions-receptions',
              this.editedBordereau
            );
          method.subscribe(
            (res) => {
              this.busy = false;

              this._store.dispatch(
                GetTransmissionsReceptions({})
              );

              this._appService.showToast({
                summary: 'messages.success',
                detail:
                  'messages.engagements.createSuccess' +
                  ': numéro: ' +
                  res.numero,
                severity: 'success',
                life: 3000,
                closable: true,
              });
              this._dialogService.launchPrintTransmissionReceptionDialog(res);
            },
            ({ error }) => {
              let err = '';
              if (error?.statusCode === 409) {
                err = 'errors.engagements.conflict';
              } else {
                err = 'errors.unknown';
              }
              this.busy = false;
              this._appService.showToast({
                detail: err,
                summary: 'errors.error',
                severity: 'error',
                life: 5000,
                closable: true,
              });
            }
          );
        },
      });
    }
  }

}