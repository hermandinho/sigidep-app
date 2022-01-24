import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import {
  AdministrativeUnitModel,
  CategoryModel,
  FunctionModel,
  RegionsModel,
  SectorModel,
} from '@models/index';
import { GetAdministrativeUnites, GetFunctions } from '@store/actions';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-administrative-units-form',
  templateUrl: './create-administrative-unit-form.component.html',
  styleUrls: ['./create-administrative-unit-form.component.scss'],
})
export class CreateAdministrativeUnitFormComponent
  extends BaseComponent
  implements OnInit
{
  public form: FormGroup;
  public busy = false;
  functions: FunctionModel[] = [];
  regions: RegionsModel[] = [];
  sectors: SectorModel[] = [];
  categories: CategoryModel[] = [];
  secondaryFunction: FunctionModel[] = [];
  codeBaseParts = {
    regionCode: 'XX',
    categoryCode: 'XX',
  };

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    public readonly _translate: TranslateService
  ) {
    super();
    this.form = this._fb.group({
      code: [
        undefined,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      labelFr: [undefined, [Validators.required]],
      labelEn: [undefined, [Validators.required]],
      abbreviationFr: [undefined, [Validators.required]],
      abbreviationEn: [undefined, [Validators.required]],
      id: [undefined, []],
      primaryFunction: [null, []],
      secondaryFunction: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      regionId: [null, [Validators.required]],
      sectorId: [null, [Validators.required]],
    });

    this._initListeners();
  }

  get currentLang() {
    return this._translate.currentLang;
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  get codeBase(): string {
    return `${this.codeBaseParts.categoryCode ?? 'XX'}${
      this.codeBaseParts.regionCode ?? 'XX'
    }`;
  }

  get secondaryFunctions(): FunctionModel[] {
    return this.secondaryFunction ?? [];
  }

  get primaryFunctions(): FunctionModel[] {
    const selectedSector = this.form?.value?.sectorId;
    if (!selectedSector) return [];
    return this.functions.filter((f) => f.sector?.id === selectedSector);
  }

  ngOnInit(): void {
    // this._store.dispatch(GetFunctions({ _type: 'primary' }));

    forkJoin([
      this._apisService.get<FunctionModel[]>(
        '/administrative-units/functions',
        { type: 'primary' }
      ),
      this._apisService.get<RegionsModel[]>('/addresses'),
      this._apisService.get<CategoryModel[]>('/categories'),
      this._apisService.get<SectorModel[]>('/sectors'),
    ])
      .pipe(this.takeUntilDestroy)
      .subscribe((array) => {
        this.functions = (array[0] ?? []).map(
          (item) => new FunctionModel(item)
        );
        this.regions = (array[1] ?? []).map((item) => new RegionsModel(item));
        this.categories = (array[2] ?? []).map(
          (item) => new CategoryModel(item)
        );
        this.sectors = (array[3] ?? []).map((item) => new SectorModel(item));

        if (this.config.data?.item) {
          // console.log(this.config.data?.item);
          const {
            id,
            labelFr,
            labelEn,
            abbreviationFr,
            abbreviationEn,
            code,
            sector,
            category,
            region,
          } = this.config.data?.item as AdministrativeUnitModel;
          const func = this.config.data?.item?.function as FunctionModel;
          this.form.patchValue({
            id,
            labelFr,
            labelEn,
            abbreviationFr,
            abbreviationEn,
            code,
            sectorId: sector?.id,
            categoryId: category?.id,
            primaryFunction: this.functions.find(
              (f) => f.id === func?.parent?.id
            ),
            secondaryFunction: func?.id,
            regionId: region?.id,
          });
        }
      });

    this.form
      .get('primaryFunction')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      ?.subscribe((res) => {
        this.secondaryFunction = (res?.children ?? []).map(
          (item: FunctionModel) => new FunctionModel(item)
        );
        if (!res) this.form.get('secondaryFunction')?.patchValue(null);
      });
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

    // console.log(this.form.value);
    const {
      code,
      labelFr,
      labelEn,
      abbreviationFr,
      abbreviationEn,
      primaryFunction,
      secondaryFunction,
      categoryId,
      regionId,
      sectorId,
    } = this.form.value;

    this._apisService
      .post<AdministrativeUnitModel>('/administrative-units', {
        code: `${this.codeBase}${code}`,
        labelFr,
        labelEn,
        abbreviationFr,
        abbreviationEn,
        secondaryFunctionId: secondaryFunction,
        categoryId,
        regionId,
        sectorId,
      })
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetAdministrativeUnites());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.administrativeUnits.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.administrativeUnits.conflict';
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

  private _initListeners() {
    this.form
      .get('categoryId')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      ?.subscribe((val) => {
        const cat = this.categories.find((c) => c.id === val);
        if (cat) {
          this.codeBaseParts.categoryCode = cat.code;
        }
      });
    this.form
      .get('regionId')
      ?.valueChanges?.pipe(this.takeUntilDestroy)
      ?.subscribe((val) => {
        const cat = this.regions.find((c) => c.id === val);
        if (cat) {
          this.codeBaseParts.regionCode = cat.code;
        }
      });
  }
}
