import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PatientRegistration } from 'src/app/core/models/patient-registration.model';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-patient-consent',
  templateUrl: './patient-consent.component.html',
  styleUrls: ['./patient-consent.component.scss']
})
export class PatientConsentComponent implements OnInit {

  @Input() patientid: string;
  public consentFormGroup: FormGroup;
  public patientId: string | number;
  public patientData: PatientRegistration;
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
    this.consentFormGroup = this.formBuilder.group({
      sign: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.patientId) {
      this.getPatientInfo();
    }

    setTimeout(() => {
      this.sidebarService.stepNavigation.next({navIndex: 4, patientId: this.patientId});
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
      this.consentFormGroup.patchValue(patientInfo?.consent);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get patient info' });
      this.router.navigate(['/dashboard/']);
    }
  }

  private handleCreateUpdate() {
    return {
      next: (res: any) => {
        this.router.navigate(['practice-manager']);
        this.sessionStorageService.clear();
      },
      error: (error) => {
        console.log(error);
      }
    }
  }

  public onSubmitPatientInfo() {
    this.formsubmit = true;
    if(this.consentFormGroup.invalid) return;
    const patientInfo = this.sessionStorageService.get('patient-data');
    patientInfo.patient.consentSign = this.consentFormGroup.get('sign').value;
    patientInfo.patient.consentDate = this.consentFormGroup.get('date').value;

    if(this.patientId){
      this.patientRegistrationService.update(this.patientId,patientInfo).subscribe(this.handleCreateUpdate())
    } else{
      this.patientRegistrationService.create(patientInfo).subscribe(this.handleCreateUpdate())
    }
  }
}
