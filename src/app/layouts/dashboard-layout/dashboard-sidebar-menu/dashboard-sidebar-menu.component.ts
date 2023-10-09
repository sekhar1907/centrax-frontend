import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SidebarService, SidenavPopupOpen } from 'src/app/core/services/sidebar.service';

export enum MenuItemKey {
  USER = 'user',
  NOTIFICATIONS = 'notifications',
  TODO = 'todo',
  MESSAGES = 'messages',
  PAYMENT = 'payment',
  NEW_PATIENT = 'new-patient',
  PRACTICE = 'practice',
  SETTINGS = 'settings',
  FAQ = 'faq',
  APPOINTMENT = 'appointment'
}

@Component({
  selector: 'dashboard-sidebar-menu',
  templateUrl: './dashboard-sidebar-menu.component.html',
  styleUrls: ['./dashboard-sidebar-menu.component.scss']
})
export class DashboardSidebarMenuComponent {
  menuItemKeys = MenuItemKey;
  sidebarPopupOpen$: Observable<SidenavPopupOpen>;

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarPopupOpen$ = this.sidebarService.dashboardSideNavPopupOpen.asObservable();
  }

  onClickMenuItem(menuItem) {
    this.sidebarService.dashboardSideNavPopupOpen.next({id: menuItem});
  }
}
