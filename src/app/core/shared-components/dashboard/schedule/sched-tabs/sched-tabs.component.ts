import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IScheduleTab } from 'src/app/core/models/schedule/shchedule-tabs.model';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SchedDashboardTabActive } from '../schedule.component';
import { Observable, Subscription, map, take } from 'rxjs';
import { DropdownItem } from '../../../sched-view-dropdown/sched-view-dropdown.component';
import { OverlayOptions } from 'primeng/api';

@Component({
  selector: 'sched-tabs',
  templateUrl: './sched-tabs.component.html',
  styleUrls: ['./sched-tabs.component.scss']
})
export class SchedTabsComponent implements OnInit, OnDestroy {
  @ViewChild('schedDropdown') schedDropdown: any;
  overlayOpts: OverlayOptions = {
    styleClass: 'schedview-dropdown-overlay'
  }

  leftItems$: Observable<IScheduleTab[]>;

  rightItems: IScheduleTab[] = [
    { name: '', icon: 'patient-search.svg', type: 'right', id: SchedDashboardTabActive.PATIENT_SEARCH },
    { name: '', icon: 'schedule-day.svg', type: 'right', id: SchedDashboardTabActive.CALENDAR },
  ];

  rightActiveItem$: Observable<IScheduleTab>;
  leftActiveItem$: Observable<IScheduleTab>;

  schedDashboards = SchedDashboardTabActive;
  schedViews: DropdownItem[] = [
    { iconUrl: 'assets/images/icons/schedule-day.svg', value: 'day', label: 'Day View' },
    { iconUrl: 'assets/images/icons/schedule-week.svg', value: 'week', label: 'Week View' },
    { iconUrl: 'assets/images/icons/schedule-month.svg', value: 'month', label: 'Month View' },
    { iconUrl: 'assets/images/icons/schedule-list.svg', value: 'list', label: 'List View' }
  ]
  selectedSchedView: 'day' | 'week' | 'month' | 'list';
  schedViewSubs: Subscription
  leftItemsSubs: Subscription

  constructor(
    private scheduleService: ScheduleService
  ) {
    this.rightActiveItem$ = this.scheduleService.rightTabOpen.asObservable().pipe(
      map((res) => this.rightItems.find(i => i.id === res))
    )

    this.leftItems$ = this.scheduleService.leftTabsActive.asObservable();

    this.leftActiveItem$ = this.scheduleService.leftTabOpen.asObservable().pipe(
      map((res) => this.scheduleService.leftTabsActive.value.find((value) => {
        if(value.patientId) return value?.patientId === res?.patientId;
        return value.id === res?.tab;
      }))
    );

    this.leftItemsSubs = this.leftItems$.subscribe((res) => {
      if(res.length) {
        this.onClickLeftTab(res[res.length-1]);
      }
    })
  }

  ngOnInit(): void {
    if(!this.scheduleService.schedView.value) this.scheduleService.schedView.next(this.schedViews[0].value);
    this.schedViewSubs = this.scheduleService.schedView.asObservable().subscribe((item) => {
      this.selectedSchedView = item;
    })
  }
  onCloseTab(tabIndex: number) {
    const leftItems = [...this.scheduleService.leftTabsActive.value];
    leftItems.splice(tabIndex, 1);
    this.scheduleService.leftTabsActive.next(leftItems);
  }

  onClickRightTab(tab: IScheduleTab) {
    this.scheduleService.rightTabOpen.next(tab.id);
    this.scheduleService.leftTabOpen.next(null);
    if(tab.id === 0) {
      this.rightActiveItem$.pipe(take(1)).subscribe((item) => {
        if(item.id === 0 && tab.id === 0) {
          this.schedDropdown.show();
        }
      })
    }
  }

  onClickLeftTab(tab: IScheduleTab) {
    if(tab.id === 4) {
      this.scheduleService.leftTabOpen.next({tab: this.schedDashboards.NEW_PATIENT, patientId: null});
      this.scheduleService.rightTabOpen.next(null);
      return;
    }
    this.scheduleService.leftTabOpen.next({tab: tab.id, patientId: tab.patientId});
    this.scheduleService.rightTabOpen.next(null);
  }

  onSchedViewChange(view) {
    this.scheduleService.schedView.next(view.value);
  }

  ngOnDestroy(): void {
    this.schedViewSubs?.unsubscribe();
    this.leftItemsSubs?.unsubscribe();
  }
}
