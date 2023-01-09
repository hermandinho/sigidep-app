import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StructuresService } from '../../services/structures.service';
import { StructureModel } from '../../models/structure.model';
import { AppService } from '../../services/app.service';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-structure',
  templateUrl: './create-structure.component.html',
  styleUrls: ['./create-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStructureComponent extends BaseComponent implements OnInit {
  public form!: FormGroup;
  public busy = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private readonly structuresService: StructuresService,
    private _appService: AppService,
    private _apisService: ApisService,
    private router: Router
  ) {
    super();

  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      code: [
        this.config.data?.item ? this.config.data?.item.code : undefined,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      labelFr: [this.config.data?.item ? this.config.data?.item.labelFr : undefined, [Validators.required]],
      labelEn: [this.config.data?.item ? this.config.data?.item.labelEn : undefined, [Validators.required]],
      descriptionEn: [this.config.data?.item ? this.config.data?.item.descriptionEn : undefined, [Validators.required]],
      descriptionFr: [this.config.data?.item ? this.config.data?.item.descriptionFr : undefined, [Validators.required]],
      missionsEn: [this.config.data?.item ? this.config.data?.item.missionsEn : undefined],
      missionsFr: [this.config.data?.item ? this.config.data?.item.missionsFr : undefined],
      address: [this.config.data?.item ? this.config.data?.item.address : undefined, [Validators.required]],
      estPrincipal: [this.config.data?.item ? this.config.data?.item.estPrincipal : false],
      id: [this.config.data?.item ? this.config.data?.item.id : null],
      file: [null],
      csv: [null],
    });
  }

  close() {
    this.ref.close();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const csv = event.target.files[0];
      console.log(csv)
      this.form.patchValue({ csv: csv });
    }
  }

  submit() {
    this.busy = true;
    const editedStructure = {
      ...this.form.value,
    } as StructureModel;

    const formData = new FormData();
    formData.append('csv', this.form.get('csv')!.value);

    console.log(editedStructure)
    if (this.isUpdateForm) {
      this._apisService
        .put<StructureModel>('/structure', editedStructure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this.structuresService.get().subscribe(res => console.log(res))
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.structure.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.structure.notfound';
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
      this._apisService
        .post<StructureModel>('/structure', editedStructure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.structuresService.get().subscribe(res => console.log(res))
            this.router.navigate(['/structure'])
            this.ref.close(res);
            /* this._apisService
            .post<any>('/structure/upload', formData)
            .subscribe(res=>console.log(res)) */
            this.structuresService.get()
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.structure.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.structure.conflict';
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
