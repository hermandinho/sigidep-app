import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { SetAppBreadcrumb } from '@store/actions';

import { getDataSelector } from '@reducers/encours.reducer';
import { EncoursModel } from '@models/encours.model';
import { ApisService } from '@services/apis.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-display-encours-item',
  templateUrl: './display-encours-item.component.html',
  styleUrls: ['./display-encours-item.component.scss'],
})
export class DisplayEncoursItemComponent
  extends BaseComponent
  implements OnInit
{
  public encours?: EncoursModel;
  public currentId?: number;
  public loading = false;
  nodes: TreeNode[] = [];
  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private _apisService: ApisService,
    private _route: ActivatedRoute
  ) {
    super();
    moment.locale(translate.currentLang);
    // TODO subscribe to language changes
    this._initListeners();
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }

  ngOnInit(): void {
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.encours',
            routerLink: ['/', 'encours'],
          },
          {
            label: 'breadcrumb.details',
          },
        ],
      })
    );

    this._route.params.pipe(this.takeUntilDestroy).subscribe((params) => {
      if (!params.id) {
        //Nothing to do
      } else {
        this.currentId = params.id;
        this._store.dispatch(
          SetAppBreadcrumb({
            breadcrumb: [
              {
                label: 'breadcrumb.encours',
                routerLink: ['/', 'encours'],
              },
              {
                label: '#' + params.id,
              },
            ],
          })
        );
        this._fetchItem(+params.id);
      }
    });
  }

  private _initListeners() {
    this.subscriptions.push(
      this._store
        .pipe(this.takeUntilDestroy, select(getDataSelector))
        .subscribe((payload) => {
          this.encours = payload.find((enc) => enc.id === this.currentId);
        })
    );
  }

  private _fetchItem(id: number) {
    this.loading = true;
    this._apisService.get<EncoursModel>(`/encours/${id}`).subscribe(
      (res) => {
        this.loading = false;
        this.encours = res;
        this.nodes = [
          {
            data: { ...res.sousProgramme, type: 'SP' },
            children: res.sousProgramme?.actions?.map((item) => {
              return {
                data: { ...item, type: 'AC' },
                children: item.activities?.map((item1) => {
                  return {
                    data: { ...item1, type: 'ACT' },
                    children: item1.tasks?.map((item2) => {
                      return {
                        data: { ...item2, type: 'TS' },
                        children: item2.operations?.map((item3) => {
                          return {
                            data: { ...item3, type: 'OP' },
                            chidren: item3.physicalUnits.map((item4) => {
                              return {
                                data: {
                                  ...item4,
                                  id: '#' + item.id,
                                  type: 'UP',
                                },
                                children: undefined,
                              };
                            }),
                          };
                        }),
                      };
                    }),
                  };
                }),
              } as TreeNode;
            }),
          },
        ];

        console.log('DATA....: ', this.nodes);
      },
      (error) => {
        this.loading = false;
        //this.notFound = true;
      }
    );
  }
}
