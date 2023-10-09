import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PatientInfo } from 'src/app/core/models/patient.model';
import { IScheduleTab } from 'src/app/core/models/schedule/shchedule-tabs.model';
import { PatientService } from 'src/app/core/services/patient.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SchedDashboardTabActive } from '../schedule.component';

@Component({
  selector: 'sched-patient-search',
  templateUrl: './sched-patient-search.component.html',
  styleUrls: ['./sched-patient-search.component.scss']
})
export class SchedPatientSearchComponent implements OnDestroy {
  patientSearchFormGroup: FormGroup;
  patientSearchResult = new BehaviorSubject<PatientInfo[]>([]);
  patients$: Observable<PatientInfo[]>;
  private unsubscribe = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private scheduleService: ScheduleService
  ) {
    this.patientSearchFormGroup = this.formBuilder.group({
      patientId: [''],
      name: [''],
      dob: [''],
    });

    this.patients$ = this.patientSearchResult.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  onSearchPatient() {
    this.patientService.search(this.patientSearchFormGroup.value).subscribe((result: PatientInfo[]) => {
      this.patientSearchResult.next(result);
    })
  }

  onSelectPatient(patient: PatientInfo) {
    const leftItems: IScheduleTab[] = [...this.scheduleService.leftTabsActive.value];
    if(!leftItems.find(item => (item.patientId === patient.patientId) && patient.patientId)) {
      this.scheduleService.leftTabsActive.next([...leftItems, {
        icon: 'patient.svg', name: `${patient.lastName}, ${patient.firstName} (${patient.patientId})`, type: 'left', id: SchedDashboardTabActive.PATIENT_DETAIL, patientId: patient.patientId
      }])
    }
  }
}
