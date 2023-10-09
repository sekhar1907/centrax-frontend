import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError, takeUntil } from 'rxjs';
import { CreateRootCanalDto } from 'src/app/core/models/clinical-notes/root-canal.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { removeEmptyFormArrays, parseFormArrays, formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-root-canal',
  templateUrl: './patient-root-canal.component.html',
  styleUrls: ['./patient-root-canal.component.scss']
})
export class PatientRootCanalComponent implements OnInit {
  public rootCanalFormGroup: FormGroup;
  private patientId: string;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.rootCanalFormGroup = this.formBuilder.group({
      treatmentProvider: new FormControl(null, Validators.required),
      treatmentAssistant1: new FormControl(null, Validators.required),
      parq: new FormControl(null),
      medicalHxReviewed: new FormControl(null),
      preOpBp: new FormControl(null),
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
      tooth: new FormControl(null),
      rootList: new FormArray([
        this.initRootCanal(), this.initRootCanal(), this.initRootCanal(), this.initRootCanal(),
        this.initRootCanal(), this.initRootCanal(), this.initRootCanal(), this.initRootCanal()]),
      pulpalDiagnosis: new FormControl(null),
      irrigation: new FormControl(null),
      fillingMaterial: new FormControl(null),
      sealer: new FormControl(null),
      temporaryMaterial: new FormControl(null),
      postOpBp: new FormControl(null),
      radiographsTaken: new FormControl(null),
      treatmentNotes: new FormControl(null),
    });
  }


  ngOnInit(): void {
    this.checkRootCanal();
  }

  private cleanupFormArrays(formValue: any) {
    return removeEmptyFormArrays(formValue, ['rootList']);
  }

  private parseFormArrays(formValue: any) {
    return parseFormArrays(formValue, ['rootList']);
  }

  initRootCanal() {
    return new FormGroup({
      text: new FormControl(null, Validators.required),
      text1: new FormControl(null, Validators.required),
      text2: new FormControl(null, Validators.required),
    })
  }

  get rootList() {
    return this.rootCanalFormGroup.get('rootList') as FormArray;
  }

  private checkRootCanal() {
    if(this.patientId) {
      this.clinicalNoteService.getRootCanal(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.rootCanalFormGroup.patchValue(this.parseFormArrays(res));
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
    this.rootCanalFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateRootCanalDto) => {
        const cleanFormValue = this.cleanupFormArrays(formValue)
        if(this.validateRootCanal() === false) return of(null);
        return this.clinicalNoteService.updateRootCanal(cleanFormValue, this.patientId).pipe(
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
    const { treatmentProvider, treatmentAssistant1 } = this.rootCanalFormGroup.getRawValue();
    if(!treatmentProvider || !treatmentAssistant1) return false;

    return true;
  }
}
