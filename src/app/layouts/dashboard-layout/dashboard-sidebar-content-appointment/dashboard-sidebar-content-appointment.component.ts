import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription, take } from 'rxjs';
import { APPOINTMENT_FLAGS, APPOINTMENT_STATUS, Appointment, CONFIRM_TYPES } from 'src/app/core/models/appointment.model';
import { PatientInfo } from 'src/app/core/models/patient.model';
import { IUser } from 'src/app/core/models/user.model';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { getMinutesDifference } from 'src/app/core/utils/utils';
import { userSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'dashboard-sidebar-content-appointment',
  templateUrl: './dashboard-sidebar-content-appointment.component.html',
  styleUrls: ['./dashboard-sidebar-content-appointment.component.scss']
})
export class DashboardSidebarContentAppointmentComponent implements OnInit, OnDestroy {

  @Input() appointmentId: number;
  appointmentForm: FormGroup;
  formsubmit: boolean = false;

  durationItems = [
    { value: 30, label: '30 min' },
    { value: 60, label: '60 min' },
    { value: 120, label: '120 min' },
    { value: 180, label: '180 min' },
    { value: 240, label: '240 min' },
  ]

  confirmItems = CONFIRM_TYPES;
  filteredPatients: PatientInfo[] = [];
  dateSelected: Date;
  selectedProvider: string;
  durationControl = new FormControl();
  subs: Subscription[] = [];
  currentUserData: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private sidebarService: SidebarService,
    private patientService: PatientService,
    private scheduleService: ScheduleService,
    private appointmentService: AppointmentService,
    private globalService: GlobalService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const usersubs = this.store.select(userSelector).pipe(
      take(1)
    ).subscribe(user => {
      // console.log(user);
      this.currentUserData = user;
    });
    this.subs.push(usersubs);

    const cellDataSubs = this.scheduleService.activeCellData.subscribe((data: any) => {
      if(!data) return;
      this.dateSelected = data?.date;
      this.selectedProvider = data?.resourceName;

      this.appointmentForm = this.formBuilder.group({
        patient: [null, Validators.required],
        patientId: [null],
        startDateTime: [data?.date, Validators.required],
        endDateTime: [null, Validators.required],
        providerId: [data?.resourceId, Validators.required],
        notes: ['', Validators.required],
        confirmType: [this.confirmItems[0].value],
        priority: [1],
        flag: [APPOINTMENT_FLAGS[0]],
        status: [APPOINTMENT_STATUS[0]],
        posted: [1],
        description: ['This is the appointment description'],
        phone1: [null],
        phone2: [null],
        email: ['testemail@gmail.com'],
        appointmentTypeId: [1],
      })

      const dateSubs = this.durationControl.valueChanges.subscribe((duration) => {
        const endDate = moment(data?.date);
        endDate.add(duration, 'minutes');
        this.appointmentForm.patchValue({ endDateTime: endDate.toDate() })
      })
      this.subs.push(dateSubs);
    })
    this.subs.push(cellDataSubs);

    if(this.appointmentId) this.getAppointmentDetail();
    else this.durationControl.setValue(this.durationItems[0].value);
    this.subs.push(cellDataSubs);
  }

  getAppointmentDetail() {
    this.appointmentService.getAppointment(this.appointmentId).subscribe({
      next: (res) => {
        const duration = this.durationItems.find((d) => d.value === getMinutesDifference(new Date(res.startDateTime), new Date(res.endDateTime)));
        this.durationControl.setValue(duration?.value)
        this.appointmentForm.patchValue({
          ...res,
          patient: {
            ...res.patient,
            fullName: `${res.patient.firstName} ${res.patient.lastName}`
          }
        });
        this.onPatientSelect();
      },
      error: (error) => {
        this.sidebarService.dashboardSideNavPopupOpen.next(null);
        this.globalService.handleError(error);
      }
    })
  }

  get form() {
    return this.appointmentForm.controls;
  }

  get formValue() {
    return this.appointmentForm.value;
  }

  onCloseForm() {
    this.sidebarService.dashboardSideNavPopupOpen.next(null);
    if(this.appointmentId) this.scheduleService.updatedAppointment.next(null);
    else this.scheduleService.addedAppointment.next(null);
  }

  searchPatient(event) {
    this.patientService.search({
      name: event.query
    }).subscribe({
      next: (data) => {
        this.filteredPatients = data.map((p) => ({ ...p, fullName: `${p.firstName} ${p.lastName}` }));
      }
    })
  }

  onPatientSelect() {
    const { patient } = this.appointmentForm.value;
    this.appointmentForm.patchValue({
      patientId: patient.id,
      phone1: patient.primaryPhone,
      phone2: patient.alternativePhone
    })
  }

  onSaveAppointment() {
    console.log(this.appointmentForm);
    if(this.appointmentForm.invalid) return;
    const { patient, ...formValue } = this.appointmentForm.value;
    formValue.providerId = parseInt(formValue.providerId);
    formValue.practiceId = this.currentUserData.practiceId;

    const request = this.appointmentId ? this.appointmentService.update(this.appointmentId, formValue) :
    this.appointmentService.create(formValue);
    request.subscribe({
      next: (res: Appointment) => {
        this.sidebarService.dashboardSideNavPopupOpen.next(null);
        if(this.appointmentId) this.scheduleService.updatedAppointment.next(res);
        else this.scheduleService.addedAppointment.next(this.appointmentForm.value);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
