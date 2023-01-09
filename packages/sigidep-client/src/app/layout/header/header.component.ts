import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Go } from '@store/actions';
import { AppService } from '@services/app.service';
import * as fromAuth from '@reducers/auth.reducer';
import { BaseComponent } from '@components/base.component';
import { UserModel } from '@models/user.model';
import { DialogsService } from '@services/dialogs.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public dropdownOpened = false;
  public sideBarMinimized = false;

  public user?: UserModel;
  constructor(
    private readonly store: Store<AppState>,
    public readonly appService: AppService,
    public _dialogService: DialogsService,
    private localStorageService: LocalStorageService
  ) {
    super();
    this.store
      .pipe(select(fromAuth.getAuthUserSelector), this.takeUntilDestroy)
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  toggleSideBar(): void {
    this.sideBarMinimized = !this.sideBarMinimized;
    this.appService.sideBarMinimized.next(this.sideBarMinimized);
  }

  logout(): void {
    this.localStorageService.logout();
    this.store.dispatch(new Go({ path: ['/auth/login'] }));
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    /*if (!this.informationCard.nativeElement.contains(event.target)) {
      this.dropdownOpened = false;
    }*/
  }

  changePassword() {
    this._dialogService.launchChangePasswordDialog();
  }
}
