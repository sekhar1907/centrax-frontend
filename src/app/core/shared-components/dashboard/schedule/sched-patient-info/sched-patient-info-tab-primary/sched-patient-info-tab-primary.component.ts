import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'sched-patient-info-tab-primary',
  templateUrl: './sched-patient-info-tab-primary.component.html',
  styleUrls: ['./sched-patient-info-tab-primary.component.scss']
})
export class SchedPatientInfoTabPrimaryComponent {
  nodes = [
    {
        key: '0',
        label: 'Treatment plans',
        children: [
            { key: '0-0', label: 'TP 1', data: 'https://angular.io', type: 'url' },
            { key: '0-3', label: 'TP 2', data: 'https://angular.io/start', type: 'url' }
        ]
    },
    {
        key: '1',
        label: 'Reports',
        children: [
            { key: '1-0', label: 'Report 1', data: 'https://angular.io/guide/component-interaction', type: 'url' },
            { key: '1-0', label: 'Report 2', data: 'https://angular.io/guide/component-interaction', type: 'url' },
        ]
    }
  ];

  activeTab$: Observable<'admin' | 'chart' | 'perio'>;

  constructor(
    private scheduleService: ScheduleService
  ) {
    this.activeTab$ = this.scheduleService.patientDetailPrimaryActiveNav.asObservable();
    this.scheduleService.patientDetailPrimaryActiveNav.next('admin');
  }

  onSelectTab(item: 'admin' | 'chart' | 'perio') {
    this.scheduleService.patientDetailPrimaryActiveNav.next(item);
  }
}
