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
  selector: 'app-patient-financial-agreement',
  templateUrl: './patient-financial-agreement.component.html',
  styleUrls: ['./patient-financial-agreement.component.scss']
})
export class PatientFinancialAgreementComponent implements OnInit {
  @Input() patientid: string;
  public financialAgreementFormGroup: FormGroup;
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
    this.financialAgreementFormGroup = this.formBuilder.group({
      sign: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.patientId) {
      this.getPatientInfo();
    }
    setTimeout(() => {
      this.sidebarService.stepNavigation.next({navIndex: 3, patientId: this.patientId});
    });
  }

  private getPatientInfo() {
    if(this.sessionStorageService.get('patient-data')){
      this.initPatientInfoForm(this.sessionStorageService.get('patient-data'));
    }
  }

  private initPatientInfoForm(patientInfo?: any) {
    console.log(patientInfo);

    if(patientInfo) {
      this.financialAgreementFormGroup.patchValue({
        ...patientInfo?.financialAgreement,
        date: formatDate(patientInfo.financialAgreement?.date),
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get patient info' });
      this.router.navigate(['/dashboard/']);
    }
  }

  public onSubmitPatientInfo() {
    this.formsubmit = true;
    console.log('working')
    if(this.financialAgreementFormGroup.invalid) return;
    const patientInfo = this.sessionStorageService.get('patient-data');
    patientInfo.patient.financialAgreementSign = this.financialAgreementFormGroup.get('sign').value;
    patientInfo.patient.financialAgreementDate = this.financialAgreementFormGroup.get('date').value;

    if(this.patientId){
      delete patientInfo.financialAgreement;
      console.log(patientInfo);
      this.sessionStorageService.set('patient-data',patientInfo);
      this.sidebarService.stepNavigation.next({navIndex: 4, patientId: this.patientId});
      this.router.navigate([`patient/registration/consent-form/${this.patientId}`]);
    } else {
      this.sessionStorageService.set('patient-data',patientInfo);
      this.sidebarService.stepNavigation.next({navIndex: 4});
      this.router.navigate(['patient/registration/consent-form']);
    }
  }
}
