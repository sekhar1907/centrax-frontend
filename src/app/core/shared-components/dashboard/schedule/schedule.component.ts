import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleService } from 'src/app/core/services/schedule.service';

export enum SchedDashboardTabActive {
  CALENDAR,
  PATIENT_SEARCH,
  NEW_PATIENT,
  PATIENT_DETAIL,
  ADD_PATIENT,
  REPORTS,
  APPOINTMENT
}

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  leftTabActive$: Observable<{tab: SchedDashboardTabActive, patientId?: number | string, appointmentId?: number | string,}>;
  rightTabActive$: Observable<SchedDashboardTabActive>;
  schedDashboardTabActive = SchedDashboardTabActive;

  constructor(
    private scheduleService: ScheduleService
  ) {
    this.leftTabActive$ = this.scheduleService.leftTabOpen.asObservable();
    this.rightTabActive$ = this.scheduleService.rightTabOpen.asObservable();
  }
}
