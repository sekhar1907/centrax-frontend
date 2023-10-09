import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATIENT_REGISTRATION_STEPS } from '../patient-registration.component';

@Component({
  selector: 'app-patient-registration-accordion',
  templateUrl: './patient-registration-accordion.component.html',
  styleUrls: ['./patient-registration-accordion.component.scss']
})
export class PatientRegistrationAccordionComponent implements OnInit, OnChanges {
  public panelOpenState: boolean[] = [false, false, false, false, false];
  public patientRegistrationSteps = PATIENT_REGISTRATION_STEPS;
  public patientRegistrationActiveStep: number = 0;
  @Input() patientid: string;
  @Input() stepIndex: number;

  constructor(
    private router: Router,
    ) {
    }

  ngOnInit(): void {
    console.log(this.patientid)
    const stepIndex = this.patientRegistrationSteps?.findIndex(prs => prs.link == this.router.url);
    this.patientRegistrationActiveStep = stepIndex != -1 ? stepIndex : 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['stepIndex']) {
      this.patientRegistrationActiveStep = (this.stepIndex === null || this.stepIndex === undefined) ? this.stepIndex : 0;
    console.log(this.patientRegistrationActiveStep)
    }
  }

  public onSelectStep(index: number) {
    this.patientRegistrationActiveStep = index;
    if (this.patientRegistrationSteps[index]?.link) {
      this.router.navigateByUrl(this.patientRegistrationSteps[index]?.link);
    }
  }
}
