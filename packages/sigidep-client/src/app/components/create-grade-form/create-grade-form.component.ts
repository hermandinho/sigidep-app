import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';

import { GradeModel } from '@models/grade.model';
import { GetGrades } from '@actions/grades.actions';
@Component({
  selector: 'app-create-grade-form',
  templateUrl: './create-grade-form.component.html',
  styleUrls: ['./create-grade-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGradeFormComponent extends BaseComponent implements OnInit {
  loading$: Observable<boolean> = of(true);
  public form: FormGroup;

  public busy = false;
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
      id: [],
      code: [undefined, Validators.required],
      description: [undefined],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, description } = this.config.data?.item as GradeModel;
      this.form.patchValue({
        id,
        code,
        description,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedGrade = {
      ...this.form.value,
    } as GradeModel;

    if (this.isUpdateForm) {
      this._apisService.put<GradeModel>('/grades', editedGrade).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetGrades());
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.grades.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.grades.notfound';
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
      this._apisService.post<GradeModel>('/grades', editedGrade).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetGrades());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.grades.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.grades.conflict';
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
