import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Subscription, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import DateClicking from '@bwobbones/fullcalendar5-rightclick'
import interactionPlugin from '@fullcalendar/interaction'
import { ContextMenu } from 'primeng/contextmenu';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { MenuItemKey } from 'src/app/layouts/dashboard-layout/dashboard-sidebar-menu/dashboard-sidebar-menu.component';
import { Resource } from 'src/app/core/models/resource.model';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { IProvider } from 'src/app/core/models/provider.model';
import { PracticeService } from 'src/app/core/services/practice.service';
import { APPOINTMENT_FLAGS, APPOINTMENT_STATUS, Appointment, AppointmentFlag, AppointmentStatus, AppointmentView } from 'src/app/core/models/appointment.model';
import { setToMidnight } from 'src/app/core/utils/utils';
import { GlobalService } from 'src/app/core/services/global.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SchedCalendarRescheduleDialogComponent } from '../sched-calendar-reschedule-dialog/sched-calendar-reschedule-dialog.component';

const myInteractionPlugin = new Proxy(interactionPlugin, {
  get(target, prop, receiver) {
    if (prop === 'componentInteractions') {
      target.componentInteractions[0] = DateClicking
    }
    return Reflect.get(target, prop, receiver);
  }
});

@Component({
  selector: 'sched-calendar',
  templateUrl: './sched-calendar.component.html',
  styleUrls: ['./sched-calendar.component.scss']
})
export class SchedCalendarComponent implements OnInit, OnDestroy {
  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('contextMenu') contextMenu: ContextMenu;

  addedAppointmentSubs: Subscription;
  updatedAppointmentSubs: Subscription;
  activeEventIdClicked: number;
  activeAppointmentFlag: AppointmentFlag = APPOINTMENT_FLAGS[0] as AppointmentFlag;
  resources = [];

  scheduleViewSubs: Subscription;
  calendarDropdownControl = new FormControl();
  calendarOptions: CalendarOptions = {
    editable: true,
    droppable: true,
    plugins: [dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin,
      resourceDayGridPlugin, resourceTimelinePlugin, listPlugin, myInteractionPlugin],
    initialView: 'resourceTimeGridDay',
    headerToolbar: {
      left: 'title,fastBackwardButton,prev,next,fastForwardButton',
      center: '',
      right: '' // user can switch between the two
    },
    titleFormat: {
      month: 'long', year: 'numeric', day: 'numeric'
    },
    aspectRatio: 0.8,
    events: (fetchInfo, successCallback, failureCallback) => {
      this.appointmentService.getAppointmentsByPractice({
        startDate: fetchInfo.start.toISOString(),
        endDate: setToMidnight(fetchInfo.start).toISOString(),
        flag: this.activeAppointmentFlag
      })
      .pipe(take(1))
      .subscribe((res) => {
        const events = res.map((appointment) => this.mapAddAppointments(appointment));
        successCallback(events);
      })
    },
    resources: (fetchInfo, successCallback, failureCallback) => {
      this.practiceService.getPracticeProviders()
      .pipe(take(1))
      .subscribe((res) => {
        const resources = res.map((provider) => ({
          id: `${provider.id}`,
          title: `Dr. ${provider.firstname} ${provider.lastname}`
        }));
        this.resources = resources;
        successCallback(resources);
      })
    },
    allDaySlot: false,
    slotMinTime: '09:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:15:00',
    slotLabelInterval: '01:00',
    datesAboveResources: true,
    displayEventEnd: true,
    customButtons: {
      fastForwardButton: {
        icon: 'chevrons-right',
        click: () => {
          this.onScrollCalendar('ff');
        }
      },
      fastBackwardButton: {
        icon: 'chevrons-left',
        click: () => {
          this.onScrollCalendar('fb');
        }
      }
    },
    contentHeight: 800,
    stickyHeaderDates: true,
    eventDidMount: info => {
      const eventBox = info.el.querySelector('.event-box');
      const resource = this.resources.find(r => parseInt(r.id) === info.event.extendedProps['resourceId']);
      eventBox.setAttribute('data-resourceid', resource.id)
      eventBox.setAttribute('data-resourcename', resource.title)
      eventBox.setAttribute('data-date', info.event.startStr)
      eventBox.setAttribute('data-isallday', `${info.event.allDay}`)

      info.el.addEventListener("contextmenu",  event => {
        event.preventDefault();
        //ID of the event - will be needed for setting the state later on
        return false;
      }, false);

      info.el.addEventListener("dblclick",  event => {
        const eventBox = (event.target as HTMLElement).closest('.event-box');
        if(!eventBox) {
          this.sidebarService.dashboardSideNavPopupOpen.next(null);
          return false;
        }

        const date = eventBox.getAttribute('data-date')
        const resourceid = eventBox.getAttribute('data-resourceid')
        const resourcename = eventBox.getAttribute('data-resourcename')
        const isallday = eventBox.getAttribute('data-isallday');
        this.scheduleService.activeCellData.next({
          date: new Date(date),
          resourceId: resourceid,
          resourceName: resourcename,
          isAllDay: isallday === 'true' ? true : false,
        })
        this.openAppointmentPopup({item: { id: '2' }})

        event.preventDefault();
        //ID of the event - will be needed for setting the state later on
        return false;
      }, false);
    },
    slotLaneDidMount: (info) => {
      info.el.addEventListener("contextmenu",  event => {
        event.preventDefault();
        //ID of the event - will be needed for setting the state later on
        return false;
      }, false);
    },
    dateClick: (info) => {
      // console.log('Clicked on: ' + info.dateStr);
      // console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      // console.log('Current view: ' + info.view.type);
      // console.log('Dayel', info.dayEl)
      // console.log('info.jsEvent...', info.jsEvent)

      if (info.jsEvent.button === 2 || info.jsEvent.detail === 2) {
        this.rightClickInfo = info;
        this.scheduleService.activeCellData.next({
          date: info.date,
          resourceId: info.resource.id,
          resourceName: info.resource.title,
          isAllDay: info.allDay,
        })

        if(info.jsEvent.detail === 2) {
          this.openAppointmentPopup({item: { id: '1' }})
        }
        // this.currentPasteData = info
      }
    },
    eventDrop: ({newResource, oldResource, event, oldEvent}) => {
      this.handleDragDropAppointment(event.extendedProps['id'], event.startStr, event.endStr, newResource?.id)
      console.log(newResource, oldResource, event, oldEvent)
    },
    eventResize: ({event}) => {
      this.handleDragDropAppointment(event.extendedProps['id'], event.startStr, event.endStr, null)
    }
  };
  locationItems = [
    { value: 1, label: 'Plaza Practice' },
    { value: 2, label: 'Test Practice 1' },
    { value: 3, label: 'Test Practice 2' },
  ]

  items: MenuItem[] | undefined;
  rightClickInfo: any;
  menuItemKeys = MenuItemKey;
  rescheduleRef: DynamicDialogRef | undefined;

  constructor(
    private scheduleService: ScheduleService,
    private sidebarService: SidebarService,
    private appointmentService: AppointmentService,
    private resourceService: ResourceService,
    private practiceService: PracticeService,
    private changeDetectorRef: ChangeDetectorRef,
    private globalService: GlobalService,
    private dialogService: DialogService
  ) {
    this.items = [
      { label: 'New Appointment', command: (event) => this.openAppointmentPopup(event), id: '1',  },
      { label: 'Edit Appointment', command: (event) => this.openAppointmentPopup(event), id: '2' },
      { separator: true },
      { label: 'Reschedule', command: (event) => this.handleRescheduleAppointment() },
      { label: 'Cancel', command: (event) => this.handleCancelAppointment() },
      { separator: true },
      { label: 'Arrived', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[0] as AppointmentStatus) },
      { label: 'Ready', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[1] as AppointmentStatus), id: APPOINTMENT_STATUS[1] },
      { label: 'In Progress', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[2] as AppointmentStatus), id: APPOINTMENT_STATUS[2] },
      { label: 'Check Out', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[3] as AppointmentStatus), id: APPOINTMENT_STATUS[3] },
      { label: 'Ready to Review', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[4] as AppointmentStatus), id: APPOINTMENT_STATUS[4] },
      { label: 'Chart Reviewed', command: (event) => this.updateAppointmentStatus(APPOINTMENT_STATUS[5] as AppointmentStatus), id: APPOINTMENT_STATUS[5] },
      { separator: true },
      { label: 'Active', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[0] as AppointmentFlag), id: APPOINTMENT_FLAGS[0], styleClass: 'active-status' },
      { label: 'Canceled', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[1] as AppointmentFlag), id: APPOINTMENT_FLAGS[1] },
      { label: 'Short Call', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[2] as AppointmentFlag), id: APPOINTMENT_FLAGS[2] },
      { label: 'No Show', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[3] as AppointmentFlag), id: APPOINTMENT_FLAGS[3] },
      { label: 'Recall', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[4] as AppointmentFlag), id: APPOINTMENT_FLAGS[4] },
      { label: 'Pending Appointments', command: (event) => this.filterAppointmentFlag(APPOINTMENT_FLAGS[5] as AppointmentFlag), id: APPOINTMENT_FLAGS[5] }
    ];

    this.addedAppointmentSubs = this.scheduleService.addedAppointment.subscribe((appointment) => {
      if(appointment) {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.refetchEvents();
      } else this.activeEventIdClicked = null;
    })
    this.updatedAppointmentSubs = this.scheduleService.updatedAppointment.subscribe((appointment) => {
      if(appointment) {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.refetchEvents();
      } else this.activeEventIdClicked = null;
    })
  }

  ngOnInit(): void {
    this.scheduleViewSubs = this.scheduleService.schedView.asObservable().subscribe((item) => {
      let viewSelected: AppointmentView = 'resourceTimeGridDay';
      if(item === 'week') viewSelected = 'dayGridWeek'
      else if(item === 'month') viewSelected = 'dayGridMonth'
      else if(item === 'list') viewSelected = 'listWeek'
      this.calendarOptions.initialView = viewSelected;
      this.onChangeView(viewSelected);
    })

    this.calendarDropdownControl.setValue(this.locationItems[0].value);
  }

  ngOnDestroy(): void {
    this.scheduleViewSubs.unsubscribe();
    this.addedAppointmentSubs.unsubscribe();
    this.updatedAppointmentSubs.unsubscribe();
  }

  onScrollCalendar(action: 'ff' | 'fb') {
    let calendarApi = this.calendarComponent.getApi();
    if(action === 'ff') {
      calendarApi.next();
      calendarApi.next();
    } else {
      calendarApi.prev();
      calendarApi.prev();
    }
  }

  onChangeView(view: AppointmentView) {
    if(!this.calendarComponent) return;
    let calendarApi = this.calendarComponent.getApi();
    if(!calendarApi) return;
    calendarApi.changeView(view);
  }

  onRightClick(event) {
    event.preventDefault();
    let currentElement = event.target;
    while (currentElement !== document) {
      if ((currentElement && currentElement.classList.contains('fc-scrollgrid-section-header'))
      || (currentElement && currentElement.classList.contains('fc-timegrid-slot-label'))) {
        setTimeout(() => {
          this.contextMenu.containerViewChild.nativeElement.style.display = 'none';
        }, 0);
        break; // Exit the loop since we found what we were looking for
      }
      if(!currentElement) break;
      currentElement = currentElement.parentElement;
    }
    setTimeout(() => {
      this.contextMenu.containerViewChild.nativeElement.style.display = 'none';
    }, 0);
    const eventBox = event.target.closest('.event-box');
    const eventId = eventBox?.getAttribute('data-eventid')
    if(eventBox && eventId) this.activeEventIdClicked = parseInt(eventId);
    else this.activeEventIdClicked = null;
    this.configureContextItems();
  }

  onDoubleClickAppointment(event) {
    const eventBox = event.target.closest('.event-box');
    const eventId = eventBox?.getAttribute('data-eventid')
    if(eventBox && eventId) this.activeEventIdClicked = parseInt(eventId);
    else this.activeEventIdClicked = null;
    this.openAppointmentPopup({item: { id: '2' }})
  }

  openAppointmentPopup(command: any) {
    if(command.item?.id === '1') this.sidebarService.dashboardSideNavPopupOpen.next({id: this.menuItemKeys.APPOINTMENT});
    else this.sidebarService.dashboardSideNavPopupOpen.next({id: this.menuItemKeys.APPOINTMENT, appointmentId: this.activeEventIdClicked});

    setTimeout(() => {
      this.contextMenu.containerViewChild.nativeElement.style.display = 'none';
    }, 0);
  }

  private filterAppointmentFlag(flag: AppointmentFlag) {
    if(this.activeAppointmentFlag === flag) return;
    this.activeAppointmentFlag = flag;
    for(let i = 13; i <= 18; i++) {
      if(flag === this.items[i]?.id) {
        this.items[i].styleClass = 'active-status';
      } else {
        this.items[i].styleClass = null;
      }
    }
    this.refreshCalendar();
  }

  private refreshCalendar() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.refetchEvents();
  }

  private mapAddAppointments(appointment: Appointment) {
    return {
      title:  `${appointment.patient?.firstName}, ${appointment.patient?.lastName} (${appointment.patientId})`,
      start: new Date(appointment.startDateTime),
      end: new Date(appointment.endDateTime),
      resourceId: `${appointment.providerId}`,
      color: '#EADF85',
      textColor: '#575757',
      extendedProps: {
        id: appointment.id,
        resourceId: appointment.providerId,
        // alert: true,
        // allergy: true,
        // dollar: true
      }
    }
  }

  private configureContextItems() {
    this.items[0].disabled = this.activeEventIdClicked ? true : false;
    this.items[1].disabled = this.activeEventIdClicked ? false : true;
    this.items[3].disabled = this.activeEventIdClicked ? false : true;
    this.items[4].disabled = this.activeEventIdClicked ? false : true;
    this.items[6].disabled = this.activeEventIdClicked ? false : true;
    this.items[7].disabled = this.activeEventIdClicked ? false : true;
    this.items[8].disabled = this.activeEventIdClicked ? false : true;
    this.items[9].disabled = this.activeEventIdClicked ? false : true;
    this.items[10].disabled = this.activeEventIdClicked ? false : true;
    this.items[11].disabled = this.activeEventIdClicked ? false : true;
    this.items[12].disabled = this.activeEventIdClicked ? false : true;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.contextMenu.containerViewChild.nativeElement.style.display = 'block';
    }, 750);
  }

  private updateAppointmentStatus(status: AppointmentStatus) {
    const apptId = this.activeEventIdClicked;
    if(!apptId) return;

    this.appointmentService.updateAppointmentStatus(apptId, status).subscribe({
      next: (res) => {
        this.refreshCalendar();
      },
      error: (error) => this.globalService.handleError(error)
    })
  }

  private handleDragDropAppointment(apptId: number, newStartTime: string, newEndTime: string, providerId?: string) {
    const apptData: any = {
      startDateTime: newStartTime,
      endDateTime: newEndTime
    }
    if(providerId) apptData.providerId = parseInt(providerId);
    this.appointmentService.updateAppointment(apptId, apptData).subscribe({
      next: (res) => {
        this.refreshCalendar();
      },
      error: (error) => {
        this.globalService.handleError(error)
        this.refreshCalendar();
      }
    })
  }

  private handleCancelAppointment() {
    const apptId = this.activeEventIdClicked;
    if(!apptId) return;

    this.appointmentService.updateAppointmentFlag(apptId, APPOINTMENT_FLAGS[1] as AppointmentFlag).subscribe({
      next: (res) => {
        this.refreshCalendar();
      },
      error: (error) => {
        this.globalService.handleError(error)
        this.refreshCalendar();
      }
    })
  }

  private handleRescheduleAppointment() {
    const apptId = this.activeEventIdClicked;
    if(!apptId) return;

    this.appointmentService.get(apptId).subscribe({
      next: (res) => {
        this.rescheduleRef = this.dialogService.open(SchedCalendarRescheduleDialogComponent, {
          header: 'Reschedule Appointment',
          data: res,
          width: '30%'
        })

        this.rescheduleRef.onClose.subscribe((data) => {
          console.log(data);
          if (data) {
            this.appointmentService.updateAppointment(apptId, data).subscribe({
              next: (res) => {
                this.refreshCalendar();
              },
              error: (error) => {
                this.globalService.handleError(error)
                this.refreshCalendar();
              }
            })
          }
        });
      }
    })

  }
}
