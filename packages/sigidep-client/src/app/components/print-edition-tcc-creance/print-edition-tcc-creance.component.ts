import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-print-edition-tcc-creance',
  templateUrl: './print-edition-tcc-creance.component.html',
  styleUrls: ['./print-edition-tcc-creance.component.scss']
})
export class PrintEditionTccCreanceComponent extends BaseComponent implements OnInit {
  loading1$: Observable<boolean> = of(true);
  public dossiersBordereaux:any[]=[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _store: Store<AppState>,
    public translate: TranslateService,
    private readonly _appService: AppService,
  ) {
    super();
    this._initListeners()
  }

  ngOnInit(): void {
    (this.config.data?.item)
    console.log(this.config.data?.item)

    this._store.dispatch(
      GetTransmissionsReceptionsDetails({ ids: [this.config.data?.item.id] })
    );
  }

  private _initListeners() {
    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
    .subscribe((data) => {
      this.dossiersBordereaux = [...data];
      console.log('dossiersBordereaux ', this.dossiersBordereaux)

    });

    this.loading1$ = this._store.pipe(
      select(getLoadingSelectorDetail),
      map((status) => status)
    );
  }

}
