import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateRecallDto } from 'src/app/core/models/clinical-notes/recall.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-recall',
  templateUrl: './patient-recall.component.html',
  styleUrls: ['./patient-recall.component.scss']
})
export class PatientRecallComponent implements OnInit {
  public recallFormGroup: FormGroup;

  public HMLRadioItems: RadioFieldItem[] = [
    { text: 'H', value: 'H' },
    { text: 'M', value: 'M' },
    { text: 'L', value: 'L' },
  ];

  public PerioCaseTypeRadioItems: RadioFieldItem[] = [
    { text: 'I', value: '1' },
    { text: 'II', value: '2' },
    { text: 'III', value: '3' },
    { text: 'IV', value: '4' },
  ];

  private patientId: string;
  private unsubscribe = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.recallFormGroup = this.formBuilder.group({
      hygieneProvider: new FormControl(null, Validators.required),
      examProvider: new FormControl(null, Validators.required),
      medication: new FormControl(null, Validators.required),
      medicalHx: new FormControl(null),
      IntraOrExtraoral: new FormControl(null),
      parq: new FormControl(null),
      healthHxCheck: new FormControl(null),
      bp: new FormControl(null),
      pulse: new FormControl(null),
      examType: new FormControl(null),
      cleaningType: new FormControl(null),
      periapicalXray: new FormControl(null),
      bitewingXray: new FormControl(null),
      otherXray: new FormControl(null),
      fluroide: new FormControl(null),
      periodontalProbe: new FormControl(null),
      otherTreatment: new FormControl(null),
      oralHygieneInstruction: new FormControl(null),
      treatmentNotes: new FormControl(null),
      oralCancerScreen: new FormControl(null),
      oralHygiene: new FormControl(null),
      stain: new FormControl(null),
      subGlac: new FormControl(null),
      supraClac: new FormControl(null),
      bleeding: new FormControl(null),
      prioCase: new FormControl(null),
      perioScreeningTxt1: new FormControl(null),
      perioScreeningTxt2: new FormControl(null),
      perioScreeningTxt3: new FormControl(null),
      perioScreeningTxt4: new FormControl(null),
      perioScreeningTxt5: new FormControl(null),
      perioScreeningTxt6: new FormControl(null),
      recallInterval: new FormControl(null),
      due: new FormControl(null),
      time: new FormControl(null),
      cheifComplaint: new FormControl(null),
      lips: new FormControl(null),
      buccal: new FormControl(null),
      vestibules: new FormControl(null),
      tongue: new FormControl(null),
      floorOfMouth: new FormControl(null),
      palate: new FormControl(null),
      gingiva: new FormControl(null),
      torus: new FormControl(null),
      tmjPain: new FormControl(null),
      crepitus: new FormControl(null),
      snap: new FormControl(null),
      deviate: new FormControl(null),
      maxOpening: new FormControl(null),
    });

    this.recallFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateRecallDto) => {
        if(this.validateConsult() === false) return of(null);
        return this.clinicalNoteService.updateRecall(formValue, this.patientId).pipe(
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
    this.checkRecall();
  }

  private checkRecall() {
    if(this.patientId) {
      this.clinicalNoteService.getRecall(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.recallFormGroup.patchValue(res);
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validateConsult(): boolean {
    const { hygieneProvider, examProvider, medication } = this.recallFormGroup.getRawValue();
    if(!hygieneProvider || !examProvider || !medication) return false;

    return true;
  }
}
