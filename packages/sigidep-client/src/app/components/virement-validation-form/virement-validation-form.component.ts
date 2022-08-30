import { GetVirement } from '@actions/virement.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VirementModele } from '@models/virement.model';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-virement-validation-form',
  templateUrl: './virement-validation-form.component.html',
  styleUrls: ['./virement-validation-form.component.scss']
})
export class VirementValidationFormComponent implements OnInit {
  @Input() virement!: any | VirementModele;
  @Input() startingForm!: FormGroup;
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();

  validationForm!: FormGroup;
  public disabled: boolean = true;
  constructor(
    private _apisService: ApisService,
    public ref: DynamicDialogRef,
    private _appService: AppService,
    private _store: Store<AppState>,
    private _dialogService: DialogsService
  ) { }

  ngOnInit(): void {
    this.validationForm = this.startingForm;
  }


  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  async submit() {
    const modal = await this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Etes vous sur de vouloir valider le Virement N°', subtitle: 'Cette Opperation est irrémédiable et mouvementera des lignes de credits', isConfirmation: true }, 30);
    modal.onClose.subscribe((resp: boolean) => {
      if (resp) {
        this._apisService
          .post<VirementModele>('/virements/valider/', this.validationForm.value)
          .subscribe(
            (res) => {
              this.ref.close(res);
              this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Validation du virement N°', subtitle: 'Effactué avec success' }, 18);
              this._appService.showToast({
                summary: 'message.success',
                detail: 'messages.virement.validationSuccess',
                severity: 'success',
                life: 3000,
                closable: true,
              });
              this._store.dispatch(GetVirement());
            },
            ({ error }) => {
              this.ref.close();
              let err = '';
              if (error?.statusCode === 409) {
                err = 'errors.error';
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
}
