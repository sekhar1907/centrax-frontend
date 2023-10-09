import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { SidebarService, SidenavPopupOpen } from 'src/app/core/services/sidebar.service';
import { userSelector } from 'src/app/state/app.reducer';
import { MenuItemKey } from './dashboard-sidebar-menu/dashboard-sidebar-menu.component';
import { ScheduleService } from 'src/app/core/services/schedule.service';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  userData$: Observable<IUser>;
  sidebarPopupOpen$: Observable<SidenavPopupOpen>;
  menuItemKeys = MenuItemKey;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.nav-sidebar-link');
    const popupElement = target.closest('.popup-menu');
    const contextElement = target.closest('.sched-content-menu');
    const datePickerGroup = target.closest('.p-datepicker-group');
    if (!dropdownElement && !popupElement && !contextElement && !datePickerGroup) {
      // kamran
      this.sidebarService.dashboardSideNavPopupOpen.next(null);
      const activeAppt = this.sidebarService.dashboardSideNavPopupOpen.value;
      if(activeAppt?.appointmentId) this.scheduleService.updatedAppointment.next(null);
      else this.scheduleService.addedAppointment.next(null);
    }
  }

  constructor(
    private store: Store,
    private sidebarService: SidebarService,
    private scheduleService: ScheduleService
  ) {
    this.userData$ = this.store.select(userSelector);
    this.sidebarPopupOpen$ = this.sidebarService.dashboardSideNavPopupOpen.asObservable();
    // this.sidebarPopupOpen$.subscribe((res) => console.log(res));
  }
}
