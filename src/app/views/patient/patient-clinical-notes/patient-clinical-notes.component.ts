import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/core/models/patient.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

const clinicalNotesRoutes = [
  { route: '/patient/clinical-notes/consult', title: 'Consult' },
  { route: '/patient/clinical-notes/operative-progress', title: 'Operative Progress' },
  { route: '/patient/clinical-notes/recall', title: 'Recall' },
  { route: '/patient/clinical-notes/perio-maintenance', title: 'Perio Maintenance' },
  { route: '/patient/clinical-notes/extraction', title: 'Extraction' },
  { route: '/patient/clinical-notes/fillings', title: 'Fillings' },
  { route: '/patient/clinical-notes/root-canal', title: 'Root Canal' },
  { route: '/patient/clinical-notes/sealant', title: 'Sealant' },
  { route: '/patient/clinical-notes/spt-hygiene', title: 'SPT Hygiene' },
  { route: '/patient/clinical-notes/srp', title: 'SRP' },
];

@Component({
  selector: 'app-patient-clinical-notes',
  templateUrl: './patient-clinical-notes.component.html',
  styleUrls: ['./patient-clinical-notes.component.css']
})
export class PatientClinicalNotesComponent implements OnInit {
  public headerTitle = '';
  private patientId: string;
  public patient: Patient;
  public entryDate$: Observable<string | Date>;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private patientRegistrationService: PatientRegistrationService,
    private route: ActivatedRoute,
    private clinicalNoteService: ClinicalNoteService
    ) {
      this.entryDate$ = this.clinicalNoteService.entryDate.asObservable();
    if (this.sidebarService.sideNavOpen.value) {
      this.sidebarService.sideNavOpen.next(false);
    }
  }

  ngOnInit(): void {
    this.patientId = this.route.firstChild.snapshot.params['patientId'];
    this.getPatient();
    const route = clinicalNotesRoutes?.find(prs => this.router.url.includes(prs.route));
    this.headerTitle = route ? route.title : '';
  }

  private getPatient() {
    this.patientRegistrationService.get(this.patientId).subscribe({
      next: (patient) => this.patient = new Patient(patient)
    })
  }
}
