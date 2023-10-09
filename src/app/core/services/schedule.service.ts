import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SchedDashboardTabActive } from '../shared-components/dashboard/schedule/schedule.component';
import { DropdownItem } from '../shared-components/sched-view-dropdown/sched-view-dropdown.component';
import { IScheduleTab } from '../models/schedule/shchedule-tabs.model';
import { Appointment } from '../models/appointment.model';

export interface SelectedCellData {
  date: Date;
  resourceId: string;
  resourceName: string;
  isAllDay?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public rightTabOpen = new BehaviorSubject<SchedDashboardTabActive>(SchedDashboardTabActive.CALENDAR);
  public leftTabOpen = new BehaviorSubject<{tab: SchedDashboardTabActive, patientId?: number | string}>(null);
  public schedView = new BehaviorSubject<'day' | 'week' | 'month' | 'list'>(null);

  public patientDetailPrimaryActiveNav = new BehaviorSubject<'admin' | 'chart' | 'perio'>(null);
  public patientDetailSecondaryActiveNav = new BehaviorSubject<string>(null);

  public leftTabsActive = new BehaviorSubject<IScheduleTab[]>([]);

  public activeCellData = new BehaviorSubject<SelectedCellData>(null);
  public addedAppointment = new BehaviorSubject<Appointment>(null);
  public updatedAppointment = new BehaviorSubject<Appointment>(null);

  constructor() { }
}
