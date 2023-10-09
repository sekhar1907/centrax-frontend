import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CreateRecallDto } from 'src/app/core/models/clinical-notes/recall.model';
import { CreatePerioMaintenanceDto } from 'src/app/core/models/perio-maintenance.model';
import { ClinicalNoteService } from 'src/app/core/services/clinical-notes.service';
import { RadioFieldItem } from 'src/app/core/shared-components/form/form-radio-field/form-radio-field.component';
import { formatDate } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-patient-perio-maintenance',
  templateUrl: './patient-perio-maintenance.component.html',
  styleUrls: ['./patient-perio-maintenance.component.scss']
})
export class PatientPerioMaintenanceComponent implements OnInit, OnDestroy {
  public perioMaintenanceFormGroup: FormGroup;
  private patientId: string;
  private unsubscribe = new Subject<void>();

  public oralHygieneRadioItems: RadioFieldItem[] = [
    { text: 'Good', value: 'good' },
    { text: 'Fair', value: 'fair' },
    { text: 'Poor', value: 'poor' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private clinicalNoteService: ClinicalNoteService,
    private route: ActivatedRoute
  ) {
    this.patientId = this.route.snapshot.params['patientId'];
    this.perioMaintenanceFormGroup = this.formBuilder.group({
      hygieneProvider: new FormControl(null, Validators.required),
      periodonitst: new FormControl(null, Validators.required),
      cc: new FormControl(null),
      refferingDoctor: new FormControl(null),
      HhReviewedNoCharges: new FormControl(null),
      HhReviewedUpdated: new FormControl(null),
      parq: new FormControl(null),
      bp: new FormControl(null),
      wnl: new FormControl(null),
      findings: new FormControl(null),
      stageI: new FormControl(null),
      stageII: new FormControl(null),
      stageIII: new FormControl(null),
      stageIV: new FormControl(null),
      gradeA: new FormControl(null),
      gradeB: new FormControl(null),
      gradeC: new FormControl(null),
      noExam: new FormControl(null),
      examType: new FormControl(null),
      examNotes: new FormControl(null),
      perioChartUpdate: new FormControl(null),
      ultrasonic: new FormControl(null),
      handInstrumentation: new FormControl(null),
      implantInstrument: new FormControl(null),
      sensitivityNote: new FormControl(null),
      oralSedation: new FormControl(null),
      n202: new FormControl(null),
      informedConsentTxt: new FormControl(null),
      localAnesthetic: new FormControl(null),
      amt: new FormControl(null),
      injections: new FormControl(null),
      informedConsent: new FormControl(null),
      fmx: new FormControl(null),
      bwx: new FormControl(null),
      stable: new FormControl(null),
      unstable: new FormControl(null),
      patientStatusNote: new FormControl(null),
      oralHygiene: new FormControl(null),
      electricTb: new FormControl(null),
      floss: new FormControl(null),
      flRx: new FormControl(null),
      endTuft: new FormControl(null),
      manualTb: new FormControl(null),
      proxyBrush: new FormControl(null),
      rinse: new FormControl(null),
      softPicks: new FormControl(null),
      homeCareNote: new FormControl(null),
      supraPlaqueGen: new FormControl(null),
      supraPlaqueLoc: new FormControl(null),
      supraPlaqueS: new FormControl(null),
      supraPlaqueM: new FormControl(null),
      supraPlaqueH: new FormControl(null),
      flossGen: new FormControl(null),
      flossLoc: new FormControl(null),
      flossS: new FormControl(null),
      flossM: new FormControl(null),
      flossH: new FormControl(null),
      subPlaqueGen: new FormControl(null),
      subPlaqueLoc: new FormControl(null),
      subPlaqueS: new FormControl(null),
      subPlaqueM: new FormControl(null),
      subPlaqueH: new FormControl(null),
      subCalculasGen: new FormControl(null),
      subCalculasLoc: new FormControl(null),
      subCalculasS: new FormControl(null),
      subCalculasM: new FormControl(null),
      subCalculasH: new FormControl(null),
      inflammationGen: new FormControl(null),
      inflammationLoc: new FormControl(null),
      inflammationS: new FormControl(null),
      inflammationM: new FormControl(null),
      inflammationH: new FormControl(null),
      bleedingGen: new FormControl(null),
      bleedingLoc: new FormControl(null),
      bleedingS: new FormControl(null),
      bleedingM: new FormControl(null),
      bleedingH: new FormControl(null),
      healthy: new FormControl(null),
      stipled: new FormControl(null),
      rolled: new FormControl(null),
      spongy: new FormControl(null),
      pink: new FormControl(null),
      smooth: new FormControl(null),
      red: new FormControl(null),
      fibrotic: new FormControl(null),
      presentsWithNote: new FormControl(null),
    });

    this.perioMaintenanceFormGroup.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((formValue: CreatePerioMaintenanceDto) => {
        if(this.validatePerio() === false) return of(null);
        return this.clinicalNoteService.updatePerioMaintenance(formValue, this.patientId).pipe(
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
    this.checkPerio();
  }

  private checkPerio() {
    if(this.patientId) {
      this.clinicalNoteService.getPerioMaintenance(this.patientId).subscribe({
        next: (res: any) => {
          if (res) {
            this.perioMaintenanceFormGroup.patchValue(res);
            this.clinicalNoteService.entryDate.next(formatDate(res?.createdAt));
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  private validatePerio(): boolean {
    const { hygieneProvider, periodonitst } = this.perioMaintenanceFormGroup.getRawValue();
    if(!hygieneProvider || !periodonitst) return false;

    return true;
  }
}
