import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateConsultDto } from 'src/app/core/models/clinical-notes/consult.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { formatDate, parseFormArrays, removeEmptyFormArrays } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-consult',
  templateUrl: './patient-consult.component.html',
  styleUrls: ['./patient-consult.component.scss']
})
export class PatientConsultComponent implements OnInit, OnDestroy {
  public consultFormGroup: FormGroup;
  public signControl = new FormControl();
  public signDateControl = new FormControl();
  private patientId: string;
  private unsubscribe = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];

    this.consultFormGroup = this.formBuilder.group({
      txProvider: new FormControl(null, Validators.required),
      txAssistant: new FormControl(null, Validators.required),
      refferingDentist: new FormControl(null, Validators.required),
      noSymptoms: new FormControl(null),
      sensitivityToCold: new FormControl(null),
      sensitivityToHeat: new FormControl(null),
      swelling: new FormControl(null),
      sensitivityToPressure: new FormControl(null),
      rctFinished: new FormControl(null),
      locationUr: new FormControl(null),
      locationUl: new FormControl(null),
      locationLr: new FormControl(null),
      locationLL: new FormControl(null),
      chiefNotes: new FormControl(null),
      bp: new FormControl(null),
      pulse: new FormControl(null),
      temp: new FormControl(null),
      allergies: new FormControl(null),
      details: new FormControl(null),
      dentalCare: new FormControl(null),
      dentalPhobia: new FormControl(null),
      recentDentalWork: new FormControl(null),
      plannedDentalWork: new FormControl(null),
      pastPainIntensity: new FormControl(null),
      painSharp: new FormControl(null),
      painDull: new FormControl(null),
      painAchy: new FormControl(null),
      painThrobbing: new FormControl(null),
      painStabbing: new FormControl(null),
      painElectric: new FormControl(null),
      painPressure: new FormControl(null),
      presentPainIntensity: new FormControl(null),
      painIntermittent: new FormControl(null),
      painConstant: new FormControl(null),
      painSpontaneous: new FormControl(null),
      painProvoked: new FormControl(null),
      painDiurnal: new FormControl(null),
      painNocturnal: new FormControl(null),
      painDuration: new FormControl(null),
      painDurationOtcHelp: new FormControl(null),
      painDurationRxHelp: new FormControl(null),
      painDurationAbxHelp: new FormControl(null),
      painDurationIceWaterHelp: new FormControl(null),
      hxOfSwelling: new FormControl(null),
      hxOfBruxing: new FormControl(null),
      rxAnalgesicsHelp: new FormControl(null),
      abxHelp: new FormControl(null),
      iceWaterHelp: new FormControl(null),
      subjectiveNotes: new FormControl(null),
      extraOralExam: new FormControl(null),
      extraOralSwellingL: new FormControl(null),
      extraOralSwellingR: new FormControl(null),
      extraOralSwellingTxt: new FormControl(null),
      extraOralTMJExamL: new FormControl(null),
      extraOralTMJExamR: new FormControl(null),
      extraOralTMJExamTxt: new FormControl(null),
      extraOralMsOfMasticationsL: new FormControl(null),
      extraOralMsOfMasticationsR: new FormControl(null),
      extraOralMsOfMasticationsTxt: new FormControl(null),
      intraOralExam: new FormControl(null),
      intraOralSinus: new FormControl(null),
      intraOralMissingTeeth: new FormControl(null),
      intraOralCaries: new FormControl(null),
      intraOralSwelling: new FormControl(null),
      intraOralSwellingLocation: new FormControl(null),
      intraOralCracks: new FormControl(null),
      objectiveToothTesting: new FormArray([this.initObjectiveToothTestingForm(), this.initObjectiveToothTestingForm(), this.initObjectiveToothTestingForm(), this.initObjectiveToothTestingForm()]),
      objectiveNotes: new FormControl(null),
      diagnosisList: new FormArray([this.initDiagnosisForm(), this.initDiagnosisForm(), this.initDiagnosisForm(), this.initDiagnosisForm()]),
      treatmentPlanList: new FormArray([this.initTreatmentPlanForm(), this.initTreatmentPlanForm(), this.initTreatmentPlanForm(), this.initTreatmentPlanForm()]),
      diagnosisOtherNote: new FormControl(null),
      pulpNormal: new FormControl(null),
      pulpNormalTxt: new FormControl(null),
      pulpStones: new FormControl(null),
      pulpStonesTxt: new FormControl(null),
      pulpPartialCalcification: new FormControl(null),
      pulpPartialCalcificationTxt: new FormControl(null),
      pulpCompleteCalcification: new FormControl(null),
      pulpCompleteCalcificationTxt: new FormControl(null),
      pulpInternalResorption: new FormControl(null),
      pulpInternalResorptionTxt: new FormControl(null),
      pulpExternalResorption: new FormControl(null),
      pulpExternalResorptionTxt: new FormControl(null),
      pulpInvasiveResorption: new FormControl(null),
      pulpInvasiveResorptionTxt: new FormControl(null),
      pulpOpenApex: new FormControl(null),
      pulpOpenApexTxt: new FormControl(null),
      pulpExcessiveRootCurvature: new FormControl(null),
      pulpExcessiveRootCurvatureTxt: new FormControl(null),
      previousGp: new FormControl(null),
      previousGpTxt: new FormControl(null),
      previousCarriers: new FormControl(null),
      previousCarriersTxt: new FormControl(null),
      previousPaste: new FormControl(null),
      previousPasteTxt: new FormControl(null),
      previousAg: new FormControl(null),
      previousAgTxt: new FormControl(null),
      previousPerforation: new FormControl(null),
      previousPerforationTxt: new FormControl(null),
      previousUnderfield: new FormControl(null),
      previousUnderfieldTxt: new FormControl(null),
      previousOverfilled: new FormControl(null),
      previousOverfilledTxt: new FormControl(null),
      previousSeparatedInstrument: new FormControl(null),
      previousSeparatedInstrumentTxt: new FormControl(null),
      previousUncleanedCanals: new FormControl(null),
      previousUncleanedCanalsTxt: new FormControl(null),
      otherGp: new FormControl(null),
      otherGpTxt: new FormControl(null),
      otherCarriers: new FormControl(null),
      otherCarriersTxt: new FormControl(null),
      otherPaste: new FormControl(null),
      otherPasteTxt: new FormControl(null),
      otherAg: new FormControl(null),
      otherAgTxt: new FormControl(null),
      otherPerforation: new FormControl(null),
      otherPerforationTxt: new FormControl(null),
      horizontalBoneLoss: new FormControl(null),
      horizontalBonelossTxt: new FormControl(null),
      verticalBoneloss: new FormControl(null),
      verticalBonelossTxt: new FormControl(null),
      pariapicalNormal: new FormControl(null),
      pariapicalNormalTxt: new FormControl(null),
      pariapicalWidenedPdl: new FormControl(null),
      pariapicalWidenedPdlTxt: new FormControl(null),
      pariapicalApicalRl: new FormControl(null),
      pariapicalApicalRlTxt: new FormControl(null),
      pariapicalLateralRl: new FormControl(null),
      pariapicalLateralRlTxt: new FormControl(null),
      pariapicalCondensing: new FormControl(null),
      pariapicalCondensingTxt: new FormControl(null),
      caries: new FormControl(null),
      cariesTxt: new FormControl(null),
      radiographicNotes: new FormControl(null),
      parqOtherNotes: new FormControl(null),
    });

    this.consultFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateConsultDto) => {
        if(this.validateConsult() === false) return of(null);
        return this.clinicalNoteService.updateConsult(this.cleanupFormArrays(formValue), this.patientId).pipe(
          catchError((error) => {
            console.log(error);
            // Handle the error as needed
            // Return a new observable to continue the stream
            return of(null); // or throw an error, return an error observable, etc.
          })
        );
      }),
      takeUntil(this.unsubscribe)
    ).subscribe(() => {
      // if(this.consultId) this.router.navigate([`/patient/clinical-notes/consult/${this.patientId}/${this.consultId}`]);
    })
  }

  ngOnInit(): void {
    this.checkConsult();
  }

  private checkConsult() {
    if(this.patientId) {
      this.clinicalNoteService.getConsult(this.patientId).subscribe({
        next: (res: any) => {
          if(res) {
            this.consultFormGroup.patchValue(this.parseFormArrays(res));
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['objectiveToothTesting', 'diagnosisList', 'treatmentPlanList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['objectiveToothTesting', 'diagnosisList', 'treatmentPlanList']);
  }

  initObjectiveToothTestingForm() {
    return new FormGroup({
      number: new FormControl(null, Validators.required),
      cold: new FormControl(null),
      heat: new FormControl(null),
      ept: new FormControl(null),
      perc: new FormControl(null),
      palp: new FormControl(null),
      mob: new FormControl(null),
      prob: new FormControl(null),
      bite: new FormControl(null),
      restoration: new FormControl(null),
      other: new FormControl(null),
    })
  }

  initDiagnosisForm() {
    return new FormGroup({
      number: new FormControl(null, Validators.required),
      description: new FormControl(null),
      description2: new FormControl(null),
      description3: new FormControl(null),
    })
  }

  initTreatmentPlanForm() {
    return new FormGroup({
      number: new FormControl(null, Validators.required),
      description: new FormControl(null),
      description2: new FormControl(null),
      description3: new FormControl(null),
    })
  }

  get objectiveToothTestingFormArray() {
    return this.consultFormGroup.get('objectiveToothTesting') as FormArray;
  }

  get treatmentPlanFormFormArray() {
    return this.consultFormGroup.get('treatmentPlanList') as FormArray;
  }

  get diagnosisFormArray() {
    return this.consultFormGroup.get('diagnosisList') as FormArray;
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validateConsult(): boolean {
    const { txAssistant, txProvider, refferingDentist } = this.consultFormGroup.getRawValue();
    if(!txAssistant || !txProvider || !refferingDentist) return false;

    return true;
  }
}
