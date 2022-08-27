import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';

import { map } from 'rxjs/operators';
import { RubriqueModel } from '@models/rubrique.model';
import { SousRubriqueModel } from '@models/sous-rubrique.model';
import { ArticleModel } from '@models/article.model';
import {
  getDataSelector as getRubriqueDataSelector,
  getLoadingSelector as getRubriqueLoadingDataSelector,
} from '@reducers/rubriques.reducer';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/sous-rubriques.reducer';
import { GetArticles } from '@actions/articles.actions';

@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleFormComponent
  extends BaseComponent
  implements OnInit {
  public rubriques: RubriqueModel[] = [];
  loading$: Observable<boolean> = of(true);
  public sousRubriques: SousRubriqueModel[] = [];
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
      serie: [undefined, [Validators.required, Validators.pattern('[0-9]{6}')]],
      prix: [undefined, [Validators.required, Validators.min(0)]],
      designation: [undefined, Validators.required],
      conditionnement: [],
      sousRubrique: this._fb.group({
        id: [],
        code: [],
        label: [],
      }),
      rubrique: this._fb.group({
        id: [],
        code: [],
        label: [],
      }),
    });
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        id,
        code,
        serie,
        prix,
        designation,
        conditionnement,
        sousRubrique,
      } = this.config.data?.item as ArticleModel;
      this.form.patchValue({
        id,
        code,
        serie,
        prix,
        designation,
        conditionnement,
        sousRubrique,
        rubrique: sousRubrique.rubrique,
      });
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getRubriqueDataSelector))
      .subscribe((payload) => {
        this.rubriques = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.sousRubriques = [...payload];
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  submit() {
    this.busy = true;
    const editedArticle = {
      ...this.form.value,
      sousRubrique: this.sousRubriques.find(
        (item) => item.code === this.form.value?.sousRubrique?.code
      ),
      code:
        this.form.value?.rubrique?.code +
        '-' +
        this.form.value?.sousRubrique?.code +
        '-' +
        this.form.value?.serie,
    } as ArticleModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<ArticleModel>('/mercuriales/articles', editedArticle)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetArticles());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.articles.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.articles.notfound';
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
        .post<ArticleModel>('/mercuriales/articles', editedArticle)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetArticles());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.articles.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.articles.conflict';
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
  onChange = (event: any) => {
    this.sousRubriques =
      this.sousRubriques.filter((item) => item.rubrique.code === event.value) ??
      [];
  };
}
