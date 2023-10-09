import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { STATES, State } from 'src/app/core/constants/states';
import { PRMedications, PatientRegistration } from 'src/app/core/models/patient-registration.model';
import { PatientRegistrationService } from 'src/app/core/services/patient-registration.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
// import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-medical-history',
  templateUrl: './patient-medical-history.component.html',
  styleUrls: ['./patient-medical-history.component.scss']
})
export class PatientMedicalHistoryComponent {

  @Input() patientid: string;
  public dentalHistoryFormGroup: FormGroup;
  public medicalHistoryFormGroup: FormGroup;
  public states: State[] = STATES;

  public signControl = new FormControl();
  public signDateControl = new FormControl();
  public patientId: string | number;

  public patientData: PatientRegistration

  public yesNoRadioItems: RadioFieldItem[] = [
    { text: 'Yes', value: true },
    { text: 'No', value: false },
  ];

  public goodFairPoorRadioItems: RadioFieldItem[] = [
    { text: 'Good', value: 'good' },
    { text: 'Fair', value: 'fair' },
    { text: 'Poor', value: 'poor' },
  ];
  public formsubmit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private patientRegistrationService: PatientRegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private sidebarService: SidebarService,
    private messageService: MessageService,
    public sessionStorageService: SessionStorageService
  ) {
    this.patientId = this.route.snapshot.params['patient_id'] ?? this.patientid;
    this.dentalHistoryFormGroup = this.formBuilder.group({
      reasonOfVisit: new FormControl(null),
      dentalProvider: new FormControl(null),
      dateOfLastVisit: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
      officePhone: new FormControl(null),

      medications: new FormArray([
        this.formBuilder.group({
          medication: new FormControl(null),
          reason: new FormControl(null),
        })
      ]),

      badBreathing: new FormControl(false),
      grindingTeeth: new FormControl(false),
      sensitivityToHeat: new FormControl(false),
      bleedingGuns: new FormControl(false),
      looseTeeth: new FormControl(false),
      sensitivityToSweets: new FormControl(false),
      clickingJaw: new FormControl(false),
      periodontalTreatment: new FormControl(false),
      sensitivityWhenBiting: new FormControl(false),
      coldSores: new FormControl(false),
      radiationalTreatment: new FormControl(false),
      soresOfGrowthsInMouth: new FormControl(false),
      foodCollection: new FormControl(false),
      sensitivityToCold: new FormControl(false),
      surgeryToMouthOrGums: new FormControl(false),

      floss: new FormControl(null),
      brush: new FormControl(null),
      seriousComplication: new FormControl(false),
      complicationExplain : new FormControl(null),
      currentDentalHealth : new FormControl(null),
    });

    this.medicalHistoryFormGroup = this.formBuilder.group({
      primaryCareProvider: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
      officePhone: new FormControl(null),

      pregnantOrNursing: new FormControl(null),
      useAlcohol: new FormControl(false),
      alcoholType: new FormControl(null),
      hospitalized: new FormControl(false),
      explanationOfIllness: new FormControl(null),
      allergic: new FormControl(false),
      allergicExplanation: new FormControl(null),

      skinCondition: new FormControl(false),
      changesOnSkinColor: new FormControl(false),

      visualChange: new FormControl(false),
      glaucoma: new FormControl(false),
      eyeSurgery: new FormControl(false),

      lossOfHearing: new FormControl(false),
      tinnitus: new FormControl(false),

      frequentNoseBleeds: new FormControl(false),
      sinusProblem: new FormControl(false),

      hepatities: new FormControl(false),
      jaundice: new FormControl(false),
      ulcers: new FormControl(false),
      heartburn: new FormControl(false),
      dryMouth: new FormControl(false),
      difficultySwallowing: new FormControl(false),

      elevatedCholesterol: new FormControl(false),
      chestPain: new FormControl(false),
      heartAttack: new FormControl(false),
      shortnessOfBreath: new FormControl(false),
      stroke: new FormControl(false),
      swellingOfAnkles: new FormControl(false),
      highBloodPressure: new FormControl(false),
      congenitalHeartDisease: new FormControl(false),
      atrificialHeartValve: new FormControl(false),
      pacemaker: new FormControl(false),
      heartSurgery: new FormControl(false),
      other: new FormControl(false),

      tuberculosis: new FormControl(false),
      difficultyBreathing: new FormControl(false),
      emphysema: new FormControl(false),
      asthma: new FormControl(false),
      presistentCough: new FormControl(false),

      kidneyDisease: new FormControl(false),
      increaseUrination: new FormControl(false),
      venerealDisease: new FormControl(false),

      arthritis: new FormControl(false),
      artificialJoints: new FormControl(false),
      backProblems: new FormControl(false),
      takenBisphosphonates: new FormControl(false),

      headaches: new FormControl(false),
      convulsions: new FormControl(false),
      numbness: new FormControl(false),
      dizziness: new FormControl(false),
      psychiatricTreatement: new FormControl(false),
      dementia: new FormControl(false),

      tendencyOfBruise: new FormControl(false),
      anemia: new FormControl(false),
      bloodTransfusion: new FormControl(false),
      abnormalBleeding: new FormControl(false),
      anticoagulant: new FormControl(false),

      radiationTherapy: new FormControl(false),
      tumors: new FormControl(false),
      cancer: new FormControl(false),
      immuneSuppressionDisorder: new FormControl(false),

      note: new FormControl(null),
      sign: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.patientId) {
      this.getPatientInfo();
    }

    setTimeout(() => {
      this.sidebarService.stepNavigation.next({navIndex: 1, patientId: this.patientId});
    });
  }

  private getPatientInfo() {
    if(this.sessionStorageService.get('patient-data')){
      this.initPatientInfoForm(this.sessionStorageService.get('patient-data'));
    }
  }

  private initPatientInfoForm(patientInfo?: PatientRegistration) {
    console.log(this.convertBooleans(patientInfo?.dentalHistory, false));
    if(patientInfo) {
      // patch the form values here
      this.medicalHistoryFormGroup.patchValue({
        ...this.convertBooleans(patientInfo?.medicalHistory, false),
        date: formatDate(patientInfo?.medicalHistory?.date),
      });
      this.dentalHistoryFormGroup.patchValue({
        ...this.convertBooleans(patientInfo?.dentalHistory, false),
        dateOfLastVisit: formatDate(patientInfo?.dentalHistory?.dateOfLastVisit),
      });

      if(patientInfo.medications?.length) {
        this._clearFormArray(this.medicationsFormArray);
        patientInfo.medications.forEach((medication: PRMedications) => {
          this.medicationsFormArray.push(this.formBuilder.group({
            medication: new FormControl(medication.medication),
            reason: new FormControl(medication.reason),
            id: new FormControl(medication.id),
          }));
        })
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get patient info' });
      this.router.navigate(['/dashboard/']);
    }
  }


  get medicationsFormArray() {
    return this.dentalHistoryFormGroup.get('medications') as FormArray;
  }

  public onAddMedication() {
    this.medicationsFormArray.push(
      this.formBuilder.group({
        medication: new FormControl(null),
        reason: new FormControl(null),
      })
    );
  }

  public onRemoveMedication(index: number, medication: PRMedications) {
    if(medication.id) {
      this.patientRegistrationService.deleteMedication(medication.id).subscribe({
        next: (res) => {
          this.medicationsFormArray.removeAt(index);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Remove medication failed' });
        }
      })
    } else {
      this.medicationsFormArray.removeAt(index);
    }
  }

  public onSubmitPatientInfo() {
    this.formsubmit = true;
    if(this.medicalHistoryFormGroup.invalid || this.dentalHistoryFormGroup.invalid) return;
    if(!this.sessionStorageService.get('patient-data')) return;
    let value:any = {
      dentalHistory: this.dentalHistoryFormGroup.value,
      medicalHistory: this.medicalHistoryFormGroup.value
    }

    // filter object, remove property if blank or do not have value
    let finalValue = {};
    Object.keys(value).forEach((key) => {
      if(value[key] && Object.keys(value[key]).length) {
        if(key === 'dentalHistory') {
          const { medications, ...dentalHistory } = value[key];
          const medicationsBlank = medications.filter(m => !m.medication); // check if medications are blank
          finalValue[key] = {...dentalHistory}
          if(!medicationsBlank.length) {
            finalValue['medications'] = medications.map((m) => ({...m}));
          }
        } else {
          if(key === 'medicalHistory') {
            finalValue[key] = {...value[key]};
          } else {
            finalValue[key] = value[key];
          }
        }
      }
    })

    if(this.sessionStorageService.get('patient-data')){
      const patientInfo = this.sessionStorageService.get('patient-data')
      finalValue['patient'] = patientInfo.patient;
      if(patientInfo?.responsibleParty){
        finalValue['responsibleParty'] = patientInfo.responsibleParty;
      }
      if(patientInfo.insurances){
        finalValue['insurances'] = patientInfo.insurances;
      }
    }
    console.log(finalValue);
    if(this.patientId) {
      const patientInfo = this.sessionStorageService.get('patient-data')
      finalValue['hippa'] = patientInfo.hippa;
      finalValue['financialAgreement'] = patientInfo.financialAgreement;
      finalValue['consent'] = patientInfo.consent;
      this.sidebarService.stepNavigation.next({navIndex: 2, patientId: this.patientId});
      this.sessionStorageService.set('patient-data',finalValue);
      this.router.navigate([`patient/registration/hipaa/${this.patientId}`]);
    } else{
      this.sidebarService.stepNavigation.next({navIndex: 2});
      this.sessionStorageService.set('patient-data',finalValue);
      this.router.navigate(['patient/registration/hipaa']);
    }

  }

  private convertBooleans(object, toInt?:  boolean) {
    const newObject = {...object};
    Object.keys(newObject).forEach((key, index) => {
      if(newObject[key] === true && toInt) {
        newObject[key] = 1;
      } else if(newObject[key] === false && toInt) {
        newObject[key] = 0;
      } else if(newObject[key] === 0 && !toInt) {
        newObject[key] = false;
      } else if(newObject[key] === 1 && !toInt) {
        newObject[key] = true;
      }
    });
    return newObject;
  }

  private _clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}
