import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { DataModel } from '@models/data.model';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-motif-rejet-form',
  templateUrl: './create-motif-rejet-form.component.html',
  styleUrls: ['./create-motif-rejet-form.component.scss']
})
export class CreateMotifRejetFormComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  public busy = false;
  data!: DataModel;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      motif: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      this.data = this.config.data?.item;
      console.log(this.data)
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    if (this.form.value.motif) {
      const data1: DataModel = {
        data: this.data.data,
        action: this.data.action,
        motif: this.form.value.motif
      }
      console.log(data1)



      const method: Observable<any> = this._apisService.put<any>(
        '/transmissions-receptions',
        data1
      );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close();
          this._store.dispatch(
            GetTransmissionsReceptionsDetails({ etats: [EtatBonEnum.RECEPTIONCONTROLECONFORMITE] })
          );
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'dialogs.messages.rejeter',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.transmission.notfound';
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
    }
  }

}
