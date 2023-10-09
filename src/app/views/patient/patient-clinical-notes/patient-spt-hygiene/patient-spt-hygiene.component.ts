import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, of, catchError, takeUntil, Subject } from 'rxjs';
import { CreateSptHygieneDto } from 'src/app/core/models/clinical-notes/spt-hygiene.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { formatDate, parseFormArrays, removeEmptyFormArrays } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-spt-hygiene',
  templateUrl: './patient-spt-hygiene.component.html',
  styleUrls: ['./patient-spt-hygiene.component.scss']
})
export class PatientSptHygieneComponent implements OnInit {
  public sptHygieneFormGroup: FormGroup;
  public homeCareRadio: RadioFieldItem[] = [
    { text: 'Poor', value: 'poor' },
    { text: 'Okay', value: 'okay' },
    { text: 'Excellent', value: 'excellent' },
    { text: 'Fair', value: 'fair' },
    { text: 'Good', value: 'good' },
  ];
  public perioHealthRadio: RadioFieldItem[] = [
    { text: 'Stable', value: 'stable' },
    { text: 'Not Stable', value: 'not-stable' },
  ];
  public treatmentNames = [
    { field: 'subDev', label: 'Sub Dev' },
    { field: 'cavitron', label: 'Cavitron' },
    { field: 'polish', label: 'Polish' },
    { field: 'iodineIrrig', label: 'Iodine Irrig.' },
    { field: 'bleachIrrig', label: 'Bleach Irrig.' },
  ]
  private patientId: string;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.sptHygieneFormGroup = this.formBuilder.group({
      provider: new FormControl(null, Validators.required),
      units: new FormControl(null, Validators.required),
      treatmentCompleted: new FormControl(null, Validators.required),
      perioHealth: new FormControl(null),
      preBp: new FormControl(null),
      postBp: new FormControl(null),
      treatment: new FormControl(null),
      oralSedation: new FormControl(null),
      hemoDebride: this.initIssueDetail(),
      inflammation: this.initIssueDetail(),
      consistency: this.initIssueDetail(),
      necroticTissue: this.initIssueDetail(),
      subCalc: this.initIssueDetail(),
      supraCalc: this.initIssueDetail(),
      stain: this.initIssueDetail(),
      comments: new FormControl(null),
      treatmentList: this.initTreatment(),
      arestinLocation: new FormControl(null),
      flourideLocation: new FormControl(null),
      painMedDisp: new FormControl(null),
      homeCare: new FormControl(null),
      anestheticList: new FormArray([this.initAnethetic(), this.initAnethetic()]),
      anestheticNote: new FormControl(null),
      n2o: new FormControl(null),
      totalLiterVolumn: new FormControl(null),
      duration: new FormControl(null),
      o2Fluse: new FormControl(null),
      durationO2: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.checkSptHygiene();
  }


  private checkSptHygiene() {
    if(this.patientId) {
      this.clinicalNoteService.getSptHygiene(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.sptHygieneFormGroup.patchValue(this.parseFormArrays(res));
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
    this.sptHygieneFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateSptHygieneDto) => {
        const cleanFormValue = this.cleanupFormArrays(formValue)
        if(this.validateSptHygiene() === false) return of(null);
        return this.clinicalNoteService.updateSptHygiene(cleanFormValue, this.patientId).pipe(
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

  private validateSptHygiene(): boolean {
    const { provider, units, treatmentCompleted } = this.sptHygieneFormGroup.getRawValue();
    if(!provider || !units || !treatmentCompleted) return false;

    return true;
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['anestheticList', 'treatmentList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['anestheticList', 'treatmentList', 'consistency', 'hemoDebride', 'necroticTissue', 'stain', 'subCalc', 'supraCalc', 'inflammation']);
  }

  get hemoDebride() {
    return this.sptHygieneFormGroup.get('hemoDebride') as FormGroup;
  }

  get inflammation() {
    return this.sptHygieneFormGroup.get('inflammation') as FormGroup;
  }

  get consistency() {
    return this.sptHygieneFormGroup.get('consistency') as FormGroup;
  }

  get necroticTissue() {
    return this.sptHygieneFormGroup.get('necroticTissue') as FormGroup;
  }

  get subCalc() {
    return this.sptHygieneFormGroup.get('subCalc') as FormGroup;
  }

  get supraCalc() {
    return this.sptHygieneFormGroup.get('supraCalc') as FormGroup;
  }


  get stain() {
    return this.sptHygieneFormGroup.get('stain') as FormGroup;
  }

  get treatmentList() {
    return this.sptHygieneFormGroup.get('treatmentList') as FormArray;
  }

  get anestheticList() {
    return this.sptHygieneFormGroup.get('anestheticList') as FormArray;
  }

  initIssueDetail() {
    return new FormGroup({
      location: new FormControl(null, Validators.required),
      serverity: new FormControl(null, Validators.required),
      site: new FormControl(null, Validators.required),
    })
  }

  initTreatment() {
    return new FormArray(this.treatmentNames.map((name) => {
      return new FormGroup({
        location: this.initLocationsTreatment(),
        name: new FormControl(name.field, Validators.required)
      });
    }))
  }

  initAnethetic() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      locations: this.initLocationsAnesthetic(),
    })
  }

  initLocationsTreatment() {
    return new FormGroup({
      fm: new FormControl(null),
      ur: new FormControl(null),
      lr: new FormControl(null),
      ll: new FormControl(null),
      other: new FormControl(null),
    })
  }

  initLocationsAnesthetic() {
    return new FormGroup({
      ial: new FormControl(null),
      b: new FormControl(null),
      mental: new FormControl(null),
      psa: new FormControl(null),
      msa: new FormControl(null),
      np: new FormControl(null),
      gp: new FormControl(null),
      amsa: new FormControl(null),
      infiltrate: new FormControl(null),
    })
  }
}
