import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateSealantDto } from 'src/app/core/models/clinical-notes/sealant.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-sealant',
  templateUrl: './patient-sealant.component.html',
  styleUrls: ['./patient-sealant.component.scss']
})
export class PatientSealantComponent implements OnInit {
  public sealantFormGroup: FormGroup;
  public yesNoRadio: RadioFieldItem[] = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];
  private patientId: string;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.sealantFormGroup = this.formBuilder.group({
      treatmentProvider: new FormControl(null, Validators.required),
      doctor: new FormControl(null, Validators.required),
      dentalAssistant: new FormControl(null),
      hygienist: new FormControl(null),
      healthHistoryReviewed: new FormControl(null),
      noChange: new FormControl(null),
      change: new FormControl(null),
      changeTxt: new FormControl(null),
      consentAndEPO: new FormControl(null),
      sealants: new FormControl(null),
      deepOclusalGrooves: new FormControl(null),
      other: new FormControl(null),
      otherTxt: new FormControl(null),
      highRisk: new FormControl(null),
      preventOclusal: new FormControl(null),
      etch: new FormControl(null),
      flossed: new FormControl(null),
      ultraseal: new FormControl(null),
      biteCheck: new FormControl(null),
      notes: new FormControl(null),
      ohiReviewed: new FormControl(null),
      parqAddressed: new FormControl(null),
      nextApptHygiene: new FormControl(null),
      nextApptDoctor: new FormControl(null),
      socialHistory: new FormControl(null),
    });

    this.sealantFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateSealantDto) => {
        if(this.validateSealant() === false) return of(null);
        return this.clinicalNoteService.updateSealant(formValue, this.patientId).pipe(
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
    this.checkSealant();
  }


  private checkSealant() {
    if(this.patientId) {
      this.clinicalNoteService.getSealant(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.sealantFormGroup.patchValue(res);
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validateSealant(): boolean {
    const { treatmentProvider, doctor } = this.sealantFormGroup.getRawValue();
    if(!treatmentProvider || !doctor) return false;

    return true;
  }
}
