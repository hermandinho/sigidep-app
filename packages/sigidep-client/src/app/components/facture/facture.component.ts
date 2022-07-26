import { GetCarnetMandats } from '@actions/carnets-mandats.actions';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import { TypeMarcheBonEngagementEnum } from '@models/bon-engagement.model';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/carnets-mandats.reducer';
import {
  getDataSelector as getArticlesDataSelector,
  getLoadingSelector as getArticlesLoadingSelector,
} from '@reducers/articles.reducer';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as converter from 'number-to-words';
import { articlesColumns } from './consts';
import { ArticleModel } from '@models/article.model';
import { GetArticles } from '@actions/articles.actions';
import { ArticleCrudModel } from '@models/article-crud.model';
import { ApisService } from '@services/apis.service';
import { FactureArticleModel } from '@models/facture-article.model';
import { AppService } from '@services/app.service';

export class Type {
  name!: string;
}

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactureComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() readOnly!: boolean;
  @Input() procedure!: string;
  @Input() engagementForm!: FormGroup;
  @Input() dataEngagement!: any;
  @Input() isCheck!: boolean;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public factureForm!: FormGroup;
  public articlesItems!: ArticleCrudModel[];
  loading$: Observable<boolean> = of(true);
  data!: CarnetMandatModel[];
  typeMissions: Type[] = [];
  typeMarches: Type[] = [];
  carnet: any;
  public tableColumns = articlesColumns;
  public articles: ArticleModel[] = [];
  factureId!: number;
  tauxTVA!: number;
  tauxIR!: number;

  // procedure: string = '';
  public typesMarche: any[] = [];
  constructor(
    private _store: Store<AppState>,
    private translate: TranslateService,
    private _fb: FormBuilder,
    private _apiService: ApisService,
    private _appService: AppService
  ) {
    super();
    this.typesMarche = Object.keys(TypeMarcheBonEngagementEnum).map((key) => ({
      label: this.translate.instant((TypeMarcheBonEngagementEnum as any)[key]),
      value: key,
    }));
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetArticles());
    this.factureForm = this.startingForm;
    this.factureId = this.factureForm.value.id;
    this.getArticles();
    if (!this.procedure) {
      this.procedure = this._appService.currentProcedure;
    }
    this.subformInitialized.emit(this.factureForm);
    if (this.readOnly) this.factureForm.disable();
    this._store.dispatch(GetCarnetMandats());

    this.tauxIR = this.engagementForm.getRawValue()?.tauxIR;
    this.tauxTVA = this.engagementForm.getRawValue()?.tauxTVA;

    (this.factureForm.get('articles') as FormArray).valueChanges.subscribe(
      (newVal) => {
        let totalHT = 0;
        let totalTTC = 0;
        let montantTVA = 0;
        let montantIR = 0;
        let nap = 0;

        newVal?.forEach((e: any) => {
          if (e.prixTotalHT) {
            totalHT = totalHT + (e.prixTotalHT || 0);
            montantTVA = montantTVA + (totalHT * this.tauxTVA) / 100;
            montantIR = montantIR + (totalHT * this.tauxIR) / 100;
            totalTTC = totalTTC + (totalHT + montantTVA);
            nap = nap + (totalTTC - montantTVA - montantIR);
          }
        });

        this.factureForm.patchValue({
          tauxTVA: this.tauxTVA,
          tauxIR: this.tauxIR,
          montantHT: totalHT,
          montantTVA: montantTVA,
          montantIR: montantIR,
          netAPercevoir: nap,
          montantTTC: totalTTC,
          montantTotalHT: totalHT,
        });
      }
    );
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getArticlesDataSelector))
      .subscribe((data) => {
        this.articles = [...data];
      });
    this.loading$ = this._store.pipe(
      select(getArticlesLoadingSelector),
      map((status) => status)
    );
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log(data);
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  onnumeroBonChange = (event: any) => {
    const act = this.data.find((item) => item.code === event.value);
    this.carnet = act;
    if (act)
      this.factureForm.patchValue({
        numero: act.code,
        matriculeGestionnaire: act.gestionnaire.matricule,
        nomGestionnaire: act.gestionnaire.nom,
        dateAffectation: act.dateAffectation,
      });
  };

  onBlur = () => {
    const currentValue = this.factureForm.value?.montantCPChiffres || 0;
    this.factureForm.patchValue({
      montantCPLettres: converter.toWords(currentValue),
    });
  };

  remove(index: number, articleForm: FormGroup) {
    const controls = this.factureForm.get('articles') as FormArray;
    /* if (this.factureId) {
      this._apiService
        .delete<void>(
          `/bons-engagements/factures/${this.factureId}/articles/${articleForm.value.id}`,
          {}
        )
        .subscribe(
          (res) => {
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.taxes.articleRemovedSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            this._appService.showToast({
              detail: error,
              summary: 'errors.error',
              severity: 'error',
              life: 5000,
              closable: true,
            });
          }
        );
    } */
    controls.removeAt(index);
  }
  close() {
    //close
  }

  handleAddArticle(): void {
    (<FormArray>this.factureForm.get('articles')).push(
      this.addArticleFormGroup()
    );
  }

  addArticleFormGroup(articleF?: FactureArticleModel): FormGroup {
    const total = (articleF?.quantite || 0) * (articleF?.article.prix || 0);
    return this._fb.group({
      id: [articleF?.id],
      serie: [articleF?.article.serie],
      prix: [articleF?.article.prix],
      prixTotalHT: [total],
      designation: [articleF?.article.designation],
      conditionnement: [articleF?.article.conditionnement],
      quantite: [articleF?.quantite],
      etat: [],
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
  }

  onSerieChange = (event: any, articleForm: FormGroup, index: number) => {
    const article = this.articles.find((item) => item.serie === event.value);
    if (
      ((this.factureForm.get('articles') as FormArray).value as any[]).filter(
        (it) => it.serie === event.value
      )?.length == 1
    ) {
      articleForm.patchValue({
        designation: article?.designation,
        id: article?.id,
        prix: article?.prix,
      });
    } else {
      this.remove(index, articleForm);
    }
  };

  onQteChange = (event: any, articleForm: FormGroup) => {
    const qte = event.target.value;
    const pu = articleForm.get('prix')?.value;
    articleForm.get('prixTotalHT')?.setValue(qte * pu);
  };

  onPrixChange = (event: any, articleForm: FormGroup) => {
    const pu = event.target.value;
    const qte = articleForm.get('quantite')?.value;
    articleForm.get('prixTotalHT')?.setValue(qte * pu);
  };

  submit = () => {
    this.factureForm.patchValue({
      articles: this.factureForm.value.articles,
    });
    this.submitForm.emit();
  };

  public getArticlesControls() {
    return (this.factureForm.get('articles') as FormArray)?.controls;
  }

  getArticles() {
    this._apiService
      .get<FactureArticleModel[]>(
        `/bons-engagements/factures/${this.factureId}/articles`
      )
      .subscribe(
        (res) => {
          res?.forEach((item: FactureArticleModel) => {
            (<FormArray>this.factureForm.get('articles')).push(
              this.addArticleFormGroup(item)
            );
          });
        },
        ({ error }) => {}
      );
  }
}
