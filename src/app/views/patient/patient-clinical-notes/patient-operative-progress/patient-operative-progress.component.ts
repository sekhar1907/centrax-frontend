import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateOperativeDto } from 'src/app/core/models/clinical-notes/operative-progress.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { formatDate, parseFormArrays, removeEmptyFormArrays } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-operative-progress',
  templateUrl: './patient-operative-progress.component.html',
  styleUrls: ['./patient-operative-progress.component.scss']
})
export class PatientOperativeProgressComponent implements OnInit, OnDestroy {
  public operativeProgressFormGroup: FormGroup;
  private patientId: string;
  private unsubscribe = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.operativeProgressFormGroup = this.formBuilder.group({
      treatmentProvider: new FormControl(null, Validators.required),
      treatmentAssistant: new FormControl(null, Validators.required),
      referringDentist: new FormControl(null),
      medicalHxReviewed: new FormControl(null),
      parq: new FormControl(null),
      preBp: new FormControl(null),
      postBp: new FormControl(null),
      nitrousOxideRatio: new FormControl(null),
      nitrousOxideMin: new FormControl(null),
      o2Fluse: new FormControl(null),
      o2Min: new FormControl(null),
      topicalAnesthetic: new FormControl(null),
      firstAnesthetic: new FormControl(null),
      firstAnestheticCarpules: new FormControl(null),
      secondAnesthetic: new FormControl(null),
      secondAnestheticCarpules: new FormControl(null),
      psa: new FormControl(null),
      msa: new FormControl(null),
      asa: new FormControl(null),
      ia: new FormControl(null),
      lb: new FormControl(null),
      infiltrate: new FormControl(null),
      mental: new FormControl(null),
      treatmentNotes: new FormControl(null),
      next: new FormControl(null),
      nitrousSedationList: new FormArray([this.onInitNewNitrousSedation(), this.onInitNewNitrousSedation()]),
      nitrousSedationFlush: new FormControl(null),
      nitrousSedationMinutes: new FormControl(null),
      nitrousSedationNotes: new FormControl(null),
      buildUpList: new FormArray([this.onInitNewBuildup(), this.onInitNewBuildup()]),
      buildUpUltraEtch: new FormControl(null),
      buildUpOptibondAd: new FormControl(null),
      buildUpTreatmentNotes: new FormControl(null),
      bridgePrepList: new FormArray([this.onInitNewBridgePrep(), this.onInitNewBridgePrep()]),
      bridgePrepRetractionCordType: new FormControl(null),
      bridgePrepOpposingModel: new FormControl(null),
      bridgePrepFinalImpressionMaterial: new FormControl(null),
      bridgePrepBiteRegistration: new FormControl(null),
      bridgePrepLab: new FormControl(null),
      bridgePrepTreatmentNotes: new FormControl(null),
      bridgeSeatList: new FormArray([this.onInitNewBridgeSeat()]),
      bridgeSeatTreatmentNotes: new FormControl(null),
      extractionList: new FormArray([this.onInitNewExtraction(), this.onInitNewExtraction(), this.onInitNewExtraction()]),
      extractionPostOpInstructionGiven: new FormControl(null),
      extractionTreatmentNotes: new FormControl(null),
      implantBridgePrepList: new FormArray([this.onInitNewImpBridgePrep(), this.onInitNewImpBridgePrep()]),
      implantBridgePrepRetractionCordType: new FormControl(null),
      implantBridgePrepOpposingModel: new FormControl(null),
      implantBridgePrepOpposingMaterial: new FormControl(null),
      implantBridgePrepBiteRegistration: new FormControl(null),
      implantBridgePrepLab: new FormControl(null),
      implantBridgePrepFinalImpMaterial: new FormControl(null),
      implantBridgePrepTreatmentNotes: new FormControl(null),
      implantBridgeSeatList: new FormArray([this.onInitNewImpCrownBridgeSeat(), this.onInitNewImpCrownBridgeSeat()]),
      implantBridgeSeatLab: new FormControl(null),
      implantBridgeSeatTreatmentNotes: new FormControl(null),
      fillingsList: new FormArray([this.onInitNewFillings(), this.onInitNewFillings()]),
      fillingsTreatmentNotes: new FormControl(null)
    });

    this.operativeProgressFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateOperativeDto) => {
        if (this.validateOperative() === false) return of(null);
        return this.clinicalNoteService.updateOperativeProgress(this.cleanupFormArrays(formValue), this.patientId).pipe(
          catchError((error) => {
            console.log(error);
            // Handle the error as needed
            // Return a new observable to continue the stream
            return of(null); // or throw an error, return an error observable, etc.
          })
        );
      }),
      takeUntil(this.unsubscribe)
    ).subscribe({
      next: () => { },
      error: (error) => { }
    })
  }

  ngOnInit(): void {
    this.checkOperative();
  }

  private checkOperative() {
    if (this.patientId) {
      this.clinicalNoteService.getOperativeProgress(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.operativeProgressFormGroup.patchValue(this.parseFormArrays(res));
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }

  onInitNewNitrousSedation() {
    return new FormGroup({
      time: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required)
    })
  }

  get nitrousSedation() {
    return this.operativeProgressFormGroup.get('nitrousSedationList') as FormArray;
  }

  onInitNewBuildup() {
    return new FormGroup({
      toothNumber: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      materialUsed: new FormControl(null, Validators.required),
      postSize: new FormControl(null, Validators.required),
      postSizeMm: new FormControl(null, Validators.required)
    })
  }

  get buildup() {
    return this.operativeProgressFormGroup.get('buildUpList') as FormArray;
  }

  onInitNewBridgePrep() {
    return new FormGroup({
      tooth: new FormControl(null, Validators.required),
      restorationType: new FormControl(null, Validators.required),
      temporaryType: new FormControl(null, Validators.required),
      temporaryCement: new FormControl(null, Validators.required),
      shade: new FormControl(null, Validators.required),
      diagnosis: new FormControl(null, Validators.required)
    })
  }

  get bridgePrep() {
    return this.operativeProgressFormGroup.get('bridgePrepList') as FormArray;
  }

  onInitNewImpBridgePrep() {
    return new FormGroup({
      tooth: new FormControl(null, Validators.required),
      restorationType: new FormControl(null, Validators.required),
      temporaryType: new FormControl(null, Validators.required),
      temporaryCement: new FormControl(null, Validators.required),
      shade: new FormControl(null, Validators.required)
    })
  }

  get impBridgePrep() {
    return this.operativeProgressFormGroup.get('implantBridgePrepList') as FormArray;
  }

  onInitNewBridgeSeat() {
    return new FormGroup({
      tooth: new FormControl(null, Validators.required),
      restorationType: new FormControl(null, Validators.required),
      cementedWith: new FormControl(null, Validators.required)
    })
  }

  get bridgeSeat() {
    return this.operativeProgressFormGroup.get('bridgeSeatList') as FormArray;
  }

  onInitNewExtraction() {
    return new FormGroup({
      toothNumber: new FormControl(null, Validators.required),
      buildUpType: new FormControl(null, Validators.required),
      materialUsed: new FormControl(null, Validators.required),
      diagnosis: new FormControl(null, Validators.required)
    })
  }

  get extraction() {
    return this.operativeProgressFormGroup.get('extractionList') as FormArray;
  }

  onInitNewImpCrownBridgeSeat() {
    return new FormGroup({
      tooth: new FormControl(null, Validators.required),
      restorationType: new FormControl(null, Validators.required),
      cementedWith: new FormControl(null, Validators.required),
      implantBrand: new FormControl(null, Validators.required),
      implantSize: new FormControl(null, Validators.required),
      torque: new FormControl(null, Validators.required)
    })
  }

  get impBridgeSeat() {
    return this.operativeProgressFormGroup.get('implantBridgeSeatList') as FormArray;
  }

  onInitNewFillings() {
    return new FormGroup({
      toothNumber: new FormControl(null, Validators.required),
      surfaces: new FormControl(null, Validators.required),
      restorationType: new FormControl(null, Validators.required),
      shade: new FormControl(null, Validators.required),
      etchPercentage35: new FormControl(null, Validators.required),
      vitrabondBase: new FormControl(null, Validators.required),
      optibondAdhesive: new FormControl(null, Validators.required),
      recordWithEpi: new FormControl(null, Validators.required),
    })
  }

  get fillings() {
    return this.operativeProgressFormGroup.get('fillingsList') as FormArray;
  }

  private validateOperative(): boolean {
    const { treatmentAssistant, treatmentProvider } = this.operativeProgressFormGroup.getRawValue();
    if (!treatmentAssistant || !treatmentProvider) return false;

    return true;
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['nitrousSedationList', 'buildUpList', 'bridgePrepList', 'bridgeSeatList', 'extractionList', 'implantBridgePrepList', 'implantBridgeSeatList', 'fillingsList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['nitrousSedationList', 'buildUpList', 'bridgePrepList', 'bridgeSeatList', 'extractionList', 'implantBridgePrepList', 'implantBridgeSeatList', 'fillingsList']);
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }
}
