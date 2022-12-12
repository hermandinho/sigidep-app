import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GetBonsEngagements } from '../../store/actions/bons-engagements.actions';
import { getDataSelector } from '@reducers/bons-engagements.reducer';
import { BaseComponent } from '../base.component';
import { StructuresService } from '../../services/structures.service';

@Component({
  selector: 'app-print-file-rejet-controle-regularite',
  templateUrl: './print-file-rejet-controle-regularite.component.html',
  styleUrls: ['./print-file-rejet-controle-regularite.component.scss']
})
export class PrintFileRejetControleRegulariteComponent extends BaseComponent implements OnInit {
  data: any;
  structure: any;
  constructor(private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private structuresService: StructuresService
    ) { super(); this._initListeners() }

  ngOnInit(): void {
    this.getStructure()
    //this.data = this.config.data.item
    console.log(this.config.data)
    if (this.config.data.item.bon) {
      this._store.dispatch(
        GetBonsEngagements({
          numeros: [this.config.data.item.bon.numero],
        })
      );
    } else {
      this._store.dispatch(
        GetBonsEngagements({
          numeros: [this.config.data.item.numero],
        })
      );
    }

  }

  getStructure(){
    this.structuresService.getStructureDefault().then(result =>{
      this.structure = result;
      console.log(result)
    })
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log(data);
      });
  }

}
