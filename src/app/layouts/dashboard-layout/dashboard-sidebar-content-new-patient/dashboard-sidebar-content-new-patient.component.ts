import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';

@Component({
  selector: 'dashboard-sidebar-content-new-patient',
  templateUrl: './dashboard-sidebar-content-new-patient.component.html',
  styleUrls: ['./dashboard-sidebar-content-new-patient.component.scss']
})
export class DashboardSidebarContentNewPatientComponent {

  patients$: Observable<Patient[]>;

  constructor(
    private patientRegistrationService: PatientRegistrationService
  ) {
    this.getPatients();
  }

  getPatients() {
    this.patients$ = this.patientRegistrationService.getPracticePatients().pipe(
      map((patients) => {
        console.log(patients);
      return patients.map(p => new Patient(p))
      })
    );
  }
}
