import { SetAppBreadcrumb } from '@actions/app.actions';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { getDataSelector, getLoadingSelector } from '@reducers/detail-transmissions-receptions.reducer';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-print-bordereaux',
  templateUrl: './print-bordereaux.component.html',
  styleUrls: ['./print-bordereaux.component.scss']
})
export class PrintBordereauxComponent extends BaseComponent implements OnInit {
  data: any;
  bons: any[] = [];
  loading$: Observable<boolean> = of(true);
  ids!:number;





  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,

  ) {
    super();
    this._initListeners();
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      this.data = this.config.data?.item;
      //console.log(this.imputation);
      this._store.dispatch(
        GetTransmissionsReceptionsDetails({ ids: [this.data.id]})
      );
      this._store.dispatch(
        SetAppBreadcrumb({
          breadcrumb: [
            {
              label: 'breadcrumb.transmissionsReceptions',
            },
          ],
        })
      );

    }

  }

  handleFilter = (event: any) => {
 /*    this.primes = this.primesData;
    if (event?.value[0]?.toLowerCase())
      this.primes = this.primesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      ); */
  };

  private _initListeners() {

  this._store
    .pipe(this.takeUntilDestroy, select(getDataSelector))
    .subscribe((data) => {
      this.bons = [...data];
      console.log('dossiersBordereaux ', this.bons)

    });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

  }

  close() {
    this.ref.close();
  }


}
