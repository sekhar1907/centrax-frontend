import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer.service';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { InsurancePlanService } from 'src/app/core/services/insurance-plan.service';
import { STATES, State } from 'src/app/core/constants/states';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { PATIENT_REGISTRATION_STEPS } from '../patient-registration.component';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent {
  @Input() patientid: string | undefined;
  public patientInfoFormGroup!: FormGroup;
  public responsiblePartyFormGroup!: FormGroup;
  public healthInsuranceFormGroup!: FormGroup;
  public secondaryHealthInsuranceFormGroup!: FormGroup;

  public primaryPersonDataFormGroup!: FormGroup;
  public secondaryPersonDataFormGroup!: FormGroup;

  public signControl = new FormControl();
  public signDateControl = new FormControl();

  public states: State[] = STATES;

  public patientId: string | number;
  public patientInfo: any = {};

  public subscriberRadioItems: RadioFieldItem[] = [
    { text: 'Patient', value: 'patient' },
    { text: 'Responsible Party', value: 'responsibleParty' },
    { text: 'Other (if other please be prepared to fill out additional information)', value: 'other' },
  ];

  public selectedPrimaryInsurance: any;
  public selectedSecondaryInsurance: any;
  public filteredPrimaryInsurance = [];
  public filteredSecondaryInsurance = [];
  public isPrimaryInsuranceLoading = false;
  public isSecondaryInsuranceLoading = false;

  private subscriptions: Subscription[] = [];

  // new insurance plan fields
  public subscriberSelected: any;
  public personalInfoSelected: any;
  public enteredSubscriberId: any;

  public screenSize$: Observable<string>;
  public patientRegistrationSteps = PATIENT_REGISTRATION_STEPS;
  public formsubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientRegistrationService: PatientRegistrationService,
    private sidebarService: SidebarService,
    private insurancePlanService: InsurancePlanService,
    public breakpointObserverService: BreakpointObserverService,
    public sessionStorageService: SessionStorageService
  ) {
    console.log(this.route.snapshot.params['patient_id']);
    this.patientId = this.route.snapshot.params['patient_id'] ?? this.patientid;
    this.screenSize$ = this.breakpointObserverService.size$;
  }

  ngOnInit(): void {
    this.patientInfoFormGroup = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      prefferedName: new FormControl(null),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      primaryPhone: new FormControl(null, Validators.required),
      alternativePhone: new FormControl(null),
      dob: new FormControl(null, Validators.required),
      genderIdentity: new FormControl(null, Validators.required),
      prefferedPronouns: new FormControl(null),
      emergencyContact: new FormControl(null),
      emergencyPrimaryPhone: new FormControl(null),
      emergencyContactPatientRelation: new FormControl(null),
      sign: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });

    this.responsiblePartyFormGroup = this.formBuilder.group({
      notApplicable: new FormControl(true),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
      prefferedName: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      zip: new FormControl(null),
      state: new FormControl(null),
      primaryPhone: new FormControl(null),
      alternativePhone: new FormControl(null),
      dob: new FormControl(null),
    });

    this.healthInsuranceFormGroup = this.formBuilder.group({
      insurance: new FormControl(null),
      insuranceId: new FormControl(null),
      subcriberId: new FormControl(null),
      group: new FormControl(null),
      subscriberPersonType:  new FormControl(null),
    });

    this.primaryPersonDataFormGroup = this.formBuilder.group({
      firstName:  new FormControl(null),
      middleName:  new FormControl(null),
      lastName:  new FormControl(null),
      dob:  new FormControl(null),
      address:  new FormControl(null),
      city:  new FormControl(null),
      state:  new FormControl(null),
      zip:  new FormControl(null),
      employer:  new FormControl(null),
      patientRelation:  new FormControl(null)
    });

    this.secondaryHealthInsuranceFormGroup = this.formBuilder.group({
      notApplicable: new FormControl(true),
      insurance: new FormControl(null),
      insuranceId: new FormControl(null),
      subcriberId: new FormControl(null),
      group: new FormControl(null),
      subscriberPersonType:  new FormControl(null),
    });

    this.secondaryPersonDataFormGroup = this.formBuilder.group({
      firstName:  new FormControl(null),
      middleName:  new FormControl(null),
      lastName:  new FormControl(null),
      dob:  new FormControl(null),
      address:  new FormControl(null),
      city:  new FormControl(null),
      state:  new FormControl(null),
      zip:  new FormControl(null),
      employer:  new FormControl(null),
      patientRelation:  new FormControl(null)
    });
    if(this.patientId) {
      this.getPatientInfo();
    }

    setTimeout(() => {
      this.sidebarService.stepNavigation.next({navIndex: 0, patientId: this.patientId});
    });

    if(this.sessionStorageService.get('patient-data')){
      const data = this.sessionStorageService.get('patient-data');
      this.initPatientInfoForm(data);
    }
  }

  public updateCheckboxValue(){
    console.log(this.responsiblePartyFormGroup.get('notApplicable').value);
    console.log(this.responsiblePartyFormGroup.value);
  }
  private handleInsuranceSearch(isPrimary: boolean, data) {
    const noResult = [{insuranceId: -1, planName: '+ Add New Insurance Plan'}, {insuranceId: 0, planName: 'No results found.'}];
    const withResult = [{insuranceId: -1, planName: '+ Add New Insurance Plan'}, ...data];
    if(isPrimary) {
      this.filteredPrimaryInsurance = data.length ? withResult : noResult;
    } else {
      this.filteredSecondaryInsurance = data.length ? withResult : noResult;
    }
  }

  searchInsurance(event, isPrimary?: boolean) {
    if(isPrimary) {
      this.isPrimaryInsuranceLoading = true;
      this.insurancePlanService.searchInsurancePlan(event.query).subscribe((data) => {
        this.isPrimaryInsuranceLoading = false
        this.handleInsuranceSearch(true, data);
      });
    } else {
      this.isSecondaryInsuranceLoading = true;
      this.insurancePlanService.searchInsurancePlan(event.query).subscribe((data) => {
        this.isSecondaryInsuranceLoading = false
        this.handleInsuranceSearch(false, data);
      });
    }
  }

  private getPatientInfo() {
    this.patientRegistrationService.get(this.patientId).subscribe({ next: (res) => {
      this.patientInfo = res;
      this.sessionStorageService.set('patient-data',res);
      this.initPatientInfoForm(res);
    },
    error: (error) => {
      console.log(error)
      // this.snackbarService.openSnackBar('Failed to fetch patient info', 'Dismiss', 'error');
      this.router.navigate(['/dashboard/']);
    }});
  }

  private initPatientInfoForm(patientInfo?: any) {
      if(patientInfo) {
        console.log(patientInfo);
      this.patientInfoFormGroup.patchValue({
        ...patientInfo?.patient,
        date: formatDate(patientInfo.patient?.date),
        dob: formatDate(patientInfo.patient?.dob),
      });

      this.responsiblePartyFormGroup.patchValue({
        ...patientInfo?.responsibleParty,
        dob: formatDate(patientInfo.responsibleParty?.dob),
      });

      console.log(patientInfo?.insurances?.primaryInsurance?.group);
      this.healthInsuranceFormGroup.patchValue({
        subscriberPersonType: patientInfo?.insurances?.primaryInsurance?.subscriberPersonType,
        subcriberId: patientInfo?.insurances?.primaryInsurance?.subcriberId,
        group: patientInfo?.insurances?.primaryInsurance?.group,
        insuranceId: patientInfo?.insurances?.primaryInsurance?.insuranceId,
        insurance: {
          planName: patientInfo?.insurances?.primaryInsurance.planName,
          insuranceId: patientInfo?.insurances?.primaryInsurance.insuranceId,
          group: patientInfo?.insurances?.primaryInsurance?.group,
        }
      });
      console.log(this.healthInsuranceFormGroup.value);

      if(patientInfo?.insurances?.primaryInsurance) this.onInsurancePlanSelect(true);
      if(patientInfo?.insurances?.primaryInsurance?.subscriberPersonType == 'other') {
        this.primaryPersonDataFormGroup.patchValue({
          ...patientInfo?.insurances?.primaryInsurance?.subscriberPersonData,
          dob: formatDate(patientInfo?.insurances?.primaryInsurance?.subscriberPersonData?.dob),
        });
      }

      this.secondaryHealthInsuranceFormGroup.patchValue({
        subscriberPersonType: patientInfo?.insurances?.secondaryInsurance?.subscriberPersonType,
        subcriberId: patientInfo?.insurances?.secondaryInsurance?.subcriberId,
        group: patientInfo?.insurances?.secondaryInsurance?.group,
        insuranceId: patientInfo?.insurances?.secondaryInsurance?.insuranceId,
        insurance: {
          planName: patientInfo?.insurances?.secondaryInsurance?.planName,
          insuranceId: patientInfo?.insurances?.secondaryInsurance?.insuranceId,
          group: patientInfo?.insurances?.secondaryInsurance?.group
        }
      });

      if(patientInfo?.insurances?.primaryInsurance) this.onInsurancePlanSelect();

      if(patientInfo?.insurances?.primaryInsurance?.subscriberPersonType == 'other') {
        this.secondaryPersonDataFormGroup.patchValue({
          ...patientInfo?.insurances?.secondaryInsurance?.subscriberPersonTypeData,
          dob: formatDate(patientInfo?.insurances?.secondaryInsurance?.subscriberPersonTypeData?.dob),
        });
      }
    }
  }

  public onSubmitPatientInfo() {
    if(this.patientInfoFormGroup.invalid) return;
    this.formsubmit = true;
    const { preferredName, preferredPronouns, ...patientFormValue } = this.patientInfoFormGroup.value;
    const patientValue = {
      ...patientFormValue
    }

    let value: any = {
      patient: patientValue
    }
    if(!this.responsiblePartyFormGroup.get('notApplicable').value || this.checkFormGroup(this.responsiblePartyFormGroup.value)) {
      if(!this.responsiblePartyFormGroup.get('notApplicable').value) {
        const { notApplicable, ...resPartyData } = this.responsiblePartyFormGroup.value;
        value.responsibleParty = {...resPartyData};
      }
    }
    //  else {
    //   const { notApplicable, ...responsibleFormValue } = this.responsiblePartyFormGroup.value;
    //   value.responsibleParty = responsibleFormValue;
    // }
    if(this.healthInsuranceFormGroup.untouched || !this.healthInsuranceFormGroup.get('insuranceId').value) {

    } else {
      value.insurances = {};
      if(this.healthInsuranceFormGroup.get('subscriberPersonType').value === 'patient') {
        value.insurances = {
          primaryInsurance: {
            subscriberPersonType: 'patient',
            insuranceId: this.healthInsuranceFormGroup.get('insuranceId').value,
            subcriberId: this.healthInsuranceFormGroup.get('subcriberId').value,
            group: this.healthInsuranceFormGroup.get('group').value,
          }
        }
      } else if(this.healthInsuranceFormGroup.get('subscriberPersonType').value === 'responsibleParty') {
        value.insurances = {
          primaryInsurance: {
            subscriberPersonType: 'responsibleParty',
            insuranceId: this.healthInsuranceFormGroup.get('insuranceId').value,
            subcriberId: this.healthInsuranceFormGroup.get('subcriberId').value,
            group: this.healthInsuranceFormGroup.get('group').value,
          }
        }
      } else if(this.healthInsuranceFormGroup.get('subscriberPersonType').value === 'other') {
        const { insuranceId, subcriberId } = this.healthInsuranceFormGroup.value;
        const { employer, ...primaryPersonData } = this.primaryPersonDataFormGroup.value;
        value.insurances = {
          primaryInsurance: {
            subscriberPersonType: 'other',
            insuranceId,
            subcriberId,
            group: this.healthInsuranceFormGroup.get('group').value,
            subscriberPersonData: {...primaryPersonData,
              employer: this.primaryPersonDataFormGroup.get('employer').value
            },
          }
        }
      }
    }

    console.log(this.secondaryPersonDataFormGroup.value, this.secondaryHealthInsuranceFormGroup)
    if(this.secondaryHealthInsuranceFormGroup.untouched || this.secondaryHealthInsuranceFormGroup.get('notApplicable').value || !this.secondaryHealthInsuranceFormGroup.get('insuranceId').value) {

    } else {
      if(!value.insurances?.primaryInsurance) {
        value.insurances = {};
      }
      if(this.secondaryHealthInsuranceFormGroup.get('subscriberPersonType').value === 'patient') {
        value.insurances.secondaryInsurance = {
            subscriberPersonType: 'patient',
            insuranceId: this.secondaryHealthInsuranceFormGroup.get('insuranceId').value,
            group: this.secondaryHealthInsuranceFormGroup.get('group').value,
            subcriberId: this.secondaryHealthInsuranceFormGroup.get('subcriberId').value,
        }
      } else if(this.secondaryHealthInsuranceFormGroup.get('subscriberPersonType').value === 'responsibleParty') {
        value.insurances.secondaryInsurance = {
            subscriberPersonType: 'responsibleParty',
            insuranceId: this.secondaryHealthInsuranceFormGroup.get('insuranceId').value,
            group: this.secondaryHealthInsuranceFormGroup.get('group').value,
            subcriberId: this.secondaryHealthInsuranceFormGroup.get('subcriberId').value,
        }
      } else if(this.secondaryHealthInsuranceFormGroup.get('subscriberPersonType').value === 'other') {
        const { insuranceId, subcriberId, group, patientRelation } = this.secondaryHealthInsuranceFormGroup.value;
        const { employer, ...secondaryPersonData } = this.secondaryPersonDataFormGroup.value;
        value.insurances.secondaryInsurance = {
          subscriberPersonType: 'other',
          insuranceId,
          group,
          subcriberId,
          patientRelation,
          subscriberPersonData: {
            ...secondaryPersonData,
            employer: this.secondaryPersonDataFormGroup.get('employer').value
          },
        }
      }
    }
    console.log(value)
    if(this.patientId) {
      // this.patientRegistrationService.update(this.patientId, value).subscribe(this.handleCreateUpdate())
      const hippa : any = {
        sign : this.patientInfo.patient.hippaSign,
        date : this.patientInfo.patient.hippaDate,
      }
      value.hippa = hippa;

      const financialAgreement : any = {
        sign : this.patientInfo.patient.financialAgreementSign,
        date : this.patientInfo.patient.financialAgreementDate,
      }
      value.financialAgreement = financialAgreement;

      const consent = {
        sign : this.patientInfo.patient.consentSign,
        date : this.patientInfo.patient.consentDate,
      }
      value.consent = consent;

      value.dentalHistory = this.patientInfo.dentalHistory;
      value.medicalHistory = this.patientInfo.medicalHistory;
      value.medications = this.patientInfo.medications;
      this.sessionStorageService.set('patient-data',value);
      this.sidebarService.stepNavigation.next({navIndex: 1, patientId: this.patientId});
      this.router.navigate([`patient/registration/medical-history/${this.patientId}`]);
    } else {
      this.sessionStorageService.set('patient-data',value);
      const data = this.sessionStorageService.get('patient-data');
      this.sidebarService.stepNavigation.next({navIndex: 1});
      this.router.navigate(['patient/registration/medical-history']);
      // console.log(value);
    }
  }

  private checkFormGroup(formGroupValue) {
    // return Object.values(formGroup.value).every(x => x === null || x === '');
    return Object.values(formGroupValue).every(v => v && typeof v === 'object'
        ? this.checkFormGroup(v)
        : v === '' || v === null
    );
  }

  private handleCreateUpdate() {
    return {
      next: (res: any) => {
        this.sidebarService.stepNavigation.next({navIndex: 1});
      },
      error: (error) => {
        console.log(error);
        // this.snackbarService.openSnackBar('Failed to save patient info.', 'Dismiss', 'error');
      }
    }
  }

  public onInsurancePlanSelect(isPrimary?: boolean) {
    if(isPrimary) {
      const insurance = this.healthInsuranceFormGroup.get('insurance');
      console.log(insurance.value);

      // reset the autocomplete field if add new plan
      if(insurance.value.insuranceId === -1) {
        // this.openAddInsuranceCoverage();
        insurance.reset();
        return;
      }

      this.selectedPrimaryInsurance = insurance.value;
      this.healthInsuranceFormGroup.patchValue({
        insuranceId: insurance.value?.id,
        group: insurance.value?.group,
      })
      this.primaryPersonDataFormGroup.patchValue({
        employer: insurance.value?.employer
      })
    } else {
      const insurance = this.secondaryHealthInsuranceFormGroup.get('insurance');
      // reset the autocomplete field if add new plan
      if(insurance.value.insuranceId === -1) {
        // this.openAddInsuranceCoverage();
        insurance.reset();
        return;
      }

      this.selectedSecondaryInsurance = insurance;
      this.secondaryHealthInsuranceFormGroup.patchValue({
        insuranceId: insurance.value?.id,
        group: insurance.value?.group,
      })
      this.secondaryPersonDataFormGroup.patchValue({
        employer: insurance.value?.employer
      })
    }
  }

  public clearSelection(isPrimary: boolean) {
    if(isPrimary) {
      this.selectedPrimaryInsurance = "";
      this.filteredPrimaryInsurance = [];
      this.healthInsuranceFormGroup.patchValue({
        insuranceId: null,
        insurance: null
      })
    } else {
      this.selectedSecondaryInsurance = "";
      this.selectedSecondaryInsurance = [];
      this.secondaryHealthInsuranceFormGroup.patchValue({
        insuranceId: null,
        insurance: null
      })
    }
  }

  displayWith(value: any) {
    return value ? `${value?.planName}` : '';
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }

  // add new insurance plan in autocomplete dropdown
  // public openAddInsuranceCoverage() {
  //   let searchSubscriberDialogRef = this.dialog.open(SearchSubscriberComponent, { disableClose: true });
  //   searchSubscriberDialogRef.afterClosed().subscribe((searchSubsRes: any) => {

  //     if (searchSubsRes.success) {
  //       this.subscriberSelected = searchSubsRes.data;
  //       let personalInfoDialogRef = this.dialog.open(PersonalInfoFormComponent, { data : this.subscriberSelected, disableClose: true  });

  //       personalInfoDialogRef.afterClosed().subscribe((personalInfoSubsRes: any) => {

  //         if(personalInfoSubsRes.success) {
  //           this.personalInfoSelected = personalInfoSubsRes.data ?? this.subscriberSelected;

  //           let enterSubsIdDialogRef = this.dialog.open(CoverageSubsIdComponent, { disableClose: true });
  //           enterSubsIdDialogRef.afterClosed().subscribe((subsIdRes: any) => {

  //             if(subsIdRes.success) {
  //               this.enteredSubscriberId = subsIdRes.data;

  //               let searchInsPlanDialogRef = this.dialog.open(SearchInsurancePlanComponent, { data: {
  //                   coverageSubscriberId: this.enteredSubscriberId,
  //                   selectedPerson: this.personalInfoSelected
  //                 }, disableClose: true
  //               });
  //               searchInsPlanDialogRef.afterClosed().subscribe((insPlanRes: any) => {
  //                 if(insPlanRes.success) {
  //                   if(!insPlanRes?.data) {
  //                     let insPlanDialogRef = this.dialog.open(InsurancePlanFormComponent, { data: {
  //                       insCoverageData: {
  //                         coverageSubscriberId: this.enteredSubscriberId,
  //                         selectedPerson: this.personalInfoSelected
  //                       }
  //                     }, disableClose: true });
  //                     insPlanDialogRef.afterClosed().subscribe((insplanFormRes: any) => {
  //                       if(insplanFormRes?.success) {
  //                         this.snackbarService.openSnackBar('New Insurance Plan created.', 'Dismiss', 'success');
  //                       } else {
  //                         this.snackbarService.openSnackBar('Failed to create new Insurance Plan.', 'Dismiss', 'error');
  //                       }
  //                     });
  //                   }
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });

  //     }
  //   });
  // }
}
