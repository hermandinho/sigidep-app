import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { RegionsModel } from '@models/addresses.model';
import { EncoursModel } from '@models/encours.model';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-regions-form',
  templateUrl: './create-regions-form.component.html',
  styleUrls: ['./create-regions-form.component.scss'],
})
export class CreateRegionsFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public loading = false;
  public busy = false;
  constructor(
    private _fb: FormBuilder,
    public ref: DynamicDialogRef,
    private _apisService: ApisService,
    private _appService: AppService,
    public config: DynamicDialogConfig,
    private readonly _dialogService: DialogsService
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined],
      labelFr: ['', [Validators.required, Validators.minLength(2)]],
      labelEn: ['', [Validators.required, Validators.minLength(2)]],
      code: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(2)],
      ],
    });
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, labelEn, code, labelFr } = this.config.data
        ?.item as RegionsModel;
      this.form.patchValue({
        id: id,
        labelEn,
        code,
        labelFr,
      });
    }
  }

  submit() {
    this.loading = true;
    const editedRegion = {
      ...this.form.value,
    } as EncoursModel;
    this._apisService.post<RegionsModel>('/regions', editedRegion).subscribe(
      (res) => {
        this.loading = false;
        this.ref.close(res);
        this._appService.showToast({
          summary: 'message.success',
          detail: 'messages.regions.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        this.loading = false;
        this.ref.close();
        let err = '';
        console.log(error);
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

  close() {
    this.ref.close();
  }
}
