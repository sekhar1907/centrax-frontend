import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateSrpDto } from 'src/app/core/models/clinical-notes/srp.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-srp',
  templateUrl: './patient-srp.component.html',
  styleUrls: ['./patient-srp.component.scss']
})
export class PatientSrpComponent implements OnInit {
  public srpFormGroup: FormGroup;
  public healthHistoryRadio: RadioFieldItem[] = [
    { text: 'No Changes', value: 'no-changes' },
    { text: 'Changes', value: 'changes' },
  ];

  private patientId: string;
  private unsubscribe = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.srpFormGroup = this.formBuilder.group({
      srpUr: new FormControl(null),
      srpLr: new FormControl(null),
      ohi: new FormControl(null),
      nutritionalCounsel: new FormControl(null),
      srpUl: new FormControl(null),
      srpLl: new FormControl(null),
      moreTeethSrp: new FormControl(null),
      moreTeethSrpTxt: new FormControl(null),
      specifyTeeth: new FormControl(null),
      tobaccoCounsel: new FormControl(null),
      probing: new FormControl(null),
      other1: new FormControl(null),
      other1Txt: new FormControl(null),
      healthHistory: new FormControl(null),
      change: new FormControl(null),
      changeTxt: new FormControl(null),
      ccConcerns: new FormControl(null),
      bp: new FormControl(null),
      pulse: new FormControl(null),
      nextVisit: new FormControl(null),
      provider1: new FormControl(null),
      dispensedHome: new FormControl(null),
      toothBrush: new FormControl(null),
      floss: new FormControl(null),
      toothpaste: new FormControl(null),
      other2: new FormControl(null),
      other2Txt: new FormControl(null),
      perioDx: new FormControl(null),
      gen: new FormControl(null),
      loc: new FormControl(null),
      plaque: new FormControl(null),
      tissueColor: new FormControl(null),
      stain: new FormControl(null),
      calculus: new FormControl(null),
      bleeding: new FormControl(null),
      inflammation: new FormControl(null),
      notes: new FormControl(null),
      provider2: new FormControl(null),
    });

    this.srpFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreateSrpDto) => {
        return this.clinicalNoteService.updateSrp(formValue, this.patientId).pipe(
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
    this.checkSrp();
  }

  private checkSrp() {
    if(this.patientId) {
      this.clinicalNoteService.getSrp(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.srpFormGroup.patchValue(res);
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }


  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validateSrp(): boolean {
    const { hygieneProvider, examProvider, medication } = this.srpFormGroup.getRawValue();
    if(!hygieneProvider || !examProvider || !medication) return false;

    return true;
  }
}
