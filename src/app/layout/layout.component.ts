import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MsalService } from '../auth/msal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  title = 'My CRM';
  mobileQuery: MediaQueryList;
  profile: any;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private msalService: MsalService,
    private location: Location
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    if (sessionStorage.getItem('profile')) {
      this.profile = JSON.parse(sessionStorage.getItem('profile'));
    }
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  login(): void {
    this.msalService.login();
  }

  logout(): void {
    this.msalService.logout();
    sessionStorage.clear();
}

  isActive(viewLocation: any): boolean {
    return viewLocation === this.location.path();
  }

  isOnline(): boolean {
      // console.log('Online Status: ', this.msalService.isOnline());
      return this.msalService.isOnline();
  }

}
