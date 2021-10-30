import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "@components/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppService} from "@services/app.service";
import {ApisService} from "@services/apis.service";
import {Store} from "@ngrx/store";
import {AppState} from "@reducers/index";
import {FinancialSourceModel} from "@models/index";
import {GetFinancialSources} from "@store/actions";

@Component({
  selector: 'app-create-financial-source-form',
  templateUrl: './create-financial-source-form.component.html',
  styleUrls: ['./create-financial-source-form.component.scss']
})
export class CreateFinancialSourceFormComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
  ) {
    super();
    this.form = this._fb.group({
      code: [undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      abbreviationFr: [undefined, [Validators.required]],
      abbreviationEn: [undefined, [Validators.required]],
      id: [undefined, []],
      acceptsDeliverables: [false, []],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, labelFr, labelEn, abbreviationFr, abbreviationEn, acceptsDeliverables, code } = this.config.data?.item as FinancialSourceModel;
      this.form.patchValue({
        id,
        labelFr,
        labelEn,
        abbreviationFr,
        abbreviationEn,
        acceptsDeliverables,
        code,
      });
    }
  }

  close() {
    this.ref.close();
  }


  submit() {
    this.busy = true;

    if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    }
    this._apisService.post<FinancialSourceModel>('/financial-sources', {
      ...this.form.value,
    }).subscribe(res => {
      this.busy = false;
      this.ref.close(res);
      this._store.dispatch(GetFinancialSources())

      this._appService.showToast({
        summary: 'messages.success',
        detail: 'messages.financialSources.createSuccess',
        severity: 'success',
        life: 3000,
        closable: true,
      });
    }, ({error}) => {
      let err = '';
      if (error?.statusCode === 409) {
        err = 'errors.financialSources.conflict';
      } else {
        err = 'errors.unknown'
      }
      this.busy = false;
      this._appService.showToast({
        detail: err,
        summary: 'errors.error',
        severity: 'error',
        life: 5000,
        closable: true,
      });
    })
  }

}
