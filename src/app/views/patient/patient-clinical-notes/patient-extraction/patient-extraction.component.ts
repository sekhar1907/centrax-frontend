import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, of, catchError, takeUntil, Subject } from 'rxjs';
import { CreateExtractionDto } from 'src/app/core/models/clinical-notes/extraction.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { formatDate, parseFormArrays, removeEmptyFormArrays } from 'src/app/core/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-extraction',
  templateUrl: './patient-extraction.component.html',
  styleUrls: ['./patient-extraction.component.scss']
})
export class PatientExtractionComponent implements OnInit {
  public extractionFormGroup: FormGroup;
  private patientId: string;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.extractionFormGroup = this.formBuilder.group({
      treatmentProvider: new FormControl(null, Validators.required),
      treatmentAssistant: new FormControl(null, Validators.required),
      next: new FormControl(null),
      parq: new FormControl(null),
      medicalHxReviewed: new FormControl(null),
      preOpBp: new FormControl(null),
      topicalAnesthetic: new FormControl(null),
      firstAnesthetic: new FormControl(null),
      firstAnestheticCarpules: new FormControl(null),
      n2o: new FormControl(null),
      n2oPercent: new FormControl(null),
      n2oMin: new FormControl(null),
      secondAnesthetic: new FormControl(null),
      secondAnestheticCarpules: new FormControl(null),
      o2: new FormControl(null),
      o2Min: new FormControl(null),
      psa: new FormControl(null),
      msa: new FormControl(null),
      asa: new FormControl(null),
      ia: new FormControl(null),
      lb: new FormControl(null),
      pal: new FormControl(null),
      infiltrate: new FormControl(null),
      extractionList: new FormArray([this.initExtraction(), this.initExtraction(), this.initExtraction(), this.initExtraction()]),
      postOpInstructionGiven: new FormControl(null),
      postOpBp: new FormControl(null),
      treatmentNotes: new FormControl(null),
    });
  }


  ngOnInit(): void {
    this.checkExtraction();
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['extractionList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['extractionList']);
  }

  initExtraction() {
    return new FormGroup({
      tooth: new FormControl(null, Validators.required),
      extractionType: new FormControl(null, Validators.required),
      instrumentation: new FormControl(null),
      diagnosis: new FormControl(null)
    })
  }

  get extraction() {
    return this.extractionFormGroup.get('extractionList') as FormArray;
  }

  private checkExtraction() {
    if(this.patientId) {
      this.clinicalNoteService.getExtraction(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.extractionFormGroup.patchValue(this.parseFormArrays(res));
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
    this.extractionFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateExtractionDto) => {
        const cleanFormValue = this.cleanupFormArrays(formValue)
        if(this.validateExtraction() === false) return of(null);
        if(!cleanFormValue?.extractionList?.length) {
          Swal.fire({
            title: 'At least one tooth extraction is required',
            icon: 'warning'
          });
          return of(null);
        }
        return this.clinicalNoteService.updateExtraction(cleanFormValue, this.patientId).pipe(
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

  private validateExtraction(): boolean {
    const { treatmentProvider, treatmentAssistant } = this.extractionFormGroup.getRawValue();
    if(!treatmentProvider || !treatmentAssistant) return false;

    return true;
  }

}
