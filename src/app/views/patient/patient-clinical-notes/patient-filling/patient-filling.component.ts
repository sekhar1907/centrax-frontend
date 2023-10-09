import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateFillingDto } from 'src/app/core/models/clinical-notes/filling.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { formatDate, parseFormArrays, removeEmptyFormArrays } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-filling',
  templateUrl: './patient-filling.component.html',
  styleUrls: ['./patient-filling.component.scss']
})
export class PatientFillingComponent implements OnInit, OnDestroy {
  public fillingsFormGroup: FormGroup;
  private patientId: string;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.fillingsFormGroup = this.formBuilder.group({
      treatmentProvider: new FormControl(null, Validators.required),
      treatmentAssistant1: new FormControl(null, Validators.required),
      parq: new FormControl(null),
      medicalHxReviewed: new FormControl(null),
      treatmentAssistant2: new FormControl(null),
      next: new FormControl(null),
      topicalAnesthetic: new FormControl(null),
      firstAnesthetic: new FormControl(null),
      firstAnestheticCarpules: new FormControl(null),
      secondAnesthetic: new FormControl(null),
      secondAnestheticCarpules: new FormControl(null),
      n2o: new FormControl(null),
      n2oPercent: new FormControl(null),
      n2oMin: new FormControl(null),
      o2Fluse: new FormControl(null),
      o2Min: new FormControl(null),
      psa: new FormControl(null),
      msa: new FormControl(null),
      asa: new FormControl(null),
      ia: new FormControl(null),
      lb: new FormControl(null),
      pal: new FormControl(null),
      infiltrate: new FormControl(null),
      fillingList: new FormArray([this.initFilling(), this.initFilling(), this.initFilling(),
        this.initFilling(), this.initFilling(), this.initFilling()]),
      postOpBp: new FormControl(null),
      treatmentNotes: new FormControl(null),
    });
  }


  ngOnInit(): void {
    this.checkFilling();
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['fillingList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['fillingList']);
  }

  initFilling() {
    return new FormGroup({
      toothNumber: new FormControl(null, Validators.required),
      surfaces: new FormControl(null, Validators.required),
      restorationtype: new FormControl(null, Validators.required),
      shade: new FormControl(null),
      etch35Percent: new FormControl(null, Validators.required),
      optibondAdhesive: new FormControl(null, Validators.required),
      vitrabondBase: new FormControl(null, Validators.required),
      recordWithEpi: new FormControl(null, Validators.required)
    })
  }

  get fillingList() {
    return this.fillingsFormGroup.get('fillingList') as FormArray;
  }

  private checkFilling() {
    if(this.patientId) {
      this.clinicalNoteService.getFilling(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.fillingsFormGroup.patchValue(this.parseFormArrays(res));
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
            this.initFormSubscription();
          }
        },
        error: () => {
          this.initFormSubscription();
        }
      })
    }
  }

  private initFormSubscription() {
    this.fillingsFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateFillingDto) => {
        const cleanFormValue = this.cleanupFormArrays(formValue)
        if(this.validateRootCanal() === false) return of(null);
        return this.clinicalNoteService.updateFilling(cleanFormValue, this.patientId).pipe(
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

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validateRootCanal(): boolean {
    const { treatmentProvider, treatmentAssistant1 } = this.fillingsFormGroup.getRawValue();
    if(!treatmentProvider || !treatmentAssistant1) return false;

    return true;
  }
}
