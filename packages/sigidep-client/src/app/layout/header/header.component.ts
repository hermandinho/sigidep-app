import {Component, HostListener, OnInit,} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from "../../store/reducers";
import {Go} from "../../store/actions";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dropdownOpened = false;
  public sideBarMinimized = false;

  public me: any | undefined;
  constructor(
    private readonly store: Store<AppState>,
    public readonly appService: AppService,
  ) {}

  ngOnInit(): void {}


  toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  toggleSideBar(): void {
    this.sideBarMinimized = !this.sideBarMinimized;
    this.appService.sideBarMinimized.next(this.sideBarMinimized);
  }

  logout(): void {
    // this.localStorageService.logout();
    this.store.dispatch(new Go({ path: ['/auth/login'] }));
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    /*if (!this.informationCard.nativeElement.contains(event.target)) {
      this.dropdownOpened = false;
    }*/
  }

}
