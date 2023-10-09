import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PatientRegistration } from 'src/app/core/models/patient-registration.model';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-hipaa',
  templateUrl: './patient-hipaa.component.html',
  styleUrls: ['./patient-hipaa.component.scss']
})
export class PatientHipaaComponent {

  @Input() patientid: string;
  public hippaFormGroup: FormGroup;
  public patientId: string | number;
  public patientData: PatientRegistration
  public signControl = new FormControl();
  public signDateControl = new FormControl();
  public formsubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientRegistrationService: PatientRegistrationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public sessionStorageService: SessionStorageService,
    private sidebarService: SidebarService
  ) {
    this.patientId = this.route.snapshot.params['patient_id'] ?? this.patientid;
    this.hippaFormGroup = this.formBuilder.group({
      sign: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
    console.log(this.patientId);
  }

  ngOnInit(): void {
    console.log(this.sessionStorageService.get('patient-data'))
    if(this.patientId) {
      this.getPatientInfo();
    }
    setTimeout(() => {
      this.sidebarService.stepNavigation.next({navIndex: 2, patientId: this.patientId});
    });
  }

  private getPatientInfo() {
    if(this.sessionStorageService.get('patient-data')){
      this.initPatientInfoForm(this.sessionStorageService.get('patient-data'));
    }
  }

  private initPatientInfoForm(patientInfo?) {
    console.log(patientInfo);

    if(patientInfo) {
      this.hippaFormGroup.patchValue({
        ...patientInfo?.hippa,
        date: formatDate(patientInfo?.hippa?.date),
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get patient info' });
      this.router.navigate(['/dashboard/']);
    }
  }

  public onSubmitPatientInfo() {
    this.formsubmit = true;
    if(this.hippaFormGroup.invalid) return;
    const patientInfo = this.sessionStorageService.get('patient-data');
    patientInfo.patient.hippaSign = this.hippaFormGroup.get('sign').value;
    patientInfo.patient.hippaDate = this.hippaFormGroup.get('date').value;

    if(this.patientId){
      delete patientInfo.hippa;
      console.log(patientInfo);
      this.sessionStorageService.set('patient-data',patientInfo);
      this.sidebarService.stepNavigation.next({navIndex: 3, patientId: this.patientId});
      this.router.navigate([`patient/registration/financial-agreement/${this.patientId}`]);
    } else {
      this.sidebarService.stepNavigation.next({navIndex: 3});
      this.sessionStorageService.set('patient-data',patientInfo);
      this.router.navigate(['patient/registration/financial-agreement']);
    }
  }
}
