import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { userSelector } from 'src/app/state/app.reducer';
import { SidebarService, SidenavPopupOpen } from 'src/app/core/services/sidebar.service';
import { getCurrentUser } from 'src/app/state/app.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  firstMenuItems: MenuItem[] = [];
  secondMenuItems: MenuItem[] = [];
  thirdMenuItems: MenuItem[] = [];
  userData$: Observable<IUser>;
  sidebarPopupOpen$: Observable<SidenavPopupOpen>;

  constructor(
    private store: Store,
    private sidebarService: SidebarService,
    private auth: AuthService,
    private router: Router
  ) {
    this.userData$ = this.store.select(userSelector);
    this.sidebarPopupOpen$ = this.sidebarService.dashboardSideNavPopupOpen.asObservable();
  }

  ngOnInit(): void {
  }

  onOpenPopup() {
    this.sidebarService.dashboardSideNavPopupOpen.next({id: 'user'});
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
