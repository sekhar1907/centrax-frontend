import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { StepItem } from 'src/app/core/shared-components/form/form-steps/form-steps.component';

export const PATIENT_REGISTRATION_STEPS: StepItem[] = [
  {
    stepTitle: 'Patient Info', stepLongTitle: 'Patient Information', isActive: false, link: '/patient/registration/info',
    icon: 'assets/images/patient-registration-icons/patient-info.svg', activeIicon: 'fa fa-user', pageId: 'info'
  },
  {
    stepTitle: 'Medical History', stepLongTitle: 'Medical History', isActive: false, link: '/patient/registration/medical-history',
    icon: 'assets/images/patient-registration-icons/medical-history.svg', activeIicon: 'fa fa-user', pageId: 'medical-history' },
  {
    stepTitle: 'HIPAA', stepLongTitle: 'HIPAA', isActive: false, link: '/patient/registration/hipaa',
    icon: 'assets/images/patient-registration-icons/hipaa.svg', activeIicon: 'fa fa-user', pageId: 'hipaa' },
  {
    stepTitle: 'Financial Agreement', stepLongTitle: 'Financial Agreement', isActive: false, link: '/patient/registration/financial-agreement',
    icon: 'assets/images/patient-registration-icons/financial-agreement.svg', activeIicon: 'fa fa-user', pageId: 'financial-agreement' },
  {
    stepTitle: 'Consent Form', stepLongTitle: 'Consent Form', isActive: false, link: '/patient/registration/consent-form',
    icon: 'assets/images/patient-registration-icons/consent-form.svg', activeIicon: 'fa fa-user', pageId: 'consent-form'
  },
]

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {

  public scrollDownForm: boolean = false;
  public panelOpenState: boolean[] = [false, false, false, false, false];

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollDownForm = window.scrollY > 160;
  }

  public patientRegistrationSteps = PATIENT_REGISTRATION_STEPS;
  public patientRegistrationActiveStep: number = 0;
  public patientId;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sidebarService: SidebarService
  ) {

    if (this.sidebarService.sideNavOpen.value) {
      this.sidebarService.sideNavOpen.next(false);
    }

    const navigationSubs = this.sidebarService.stepNavigation.subscribe(({ navIndex, patientId }) => {
      this.onSelectStep({ index: navIndex, patientId });
    });
    this.subscriptions.push(navigationSubs);
  }

  ngOnInit(): void {
    this.patientId = this.route.children[0]?.snapshot?.params['patient_id'];
    const stepIndex = this.patientRegistrationSteps?.findIndex(prs => this.router.url.includes(prs.link));
    console.log(stepIndex, this.router.url);
    this.patientRegistrationActiveStep = stepIndex != -1 ? stepIndex : 0;
  }

  public onSelectStep(details) {
    this.patientRegistrationActiveStep = details?.index ?? 0;
    if (this.patientRegistrationSteps[details?.index]?.link) {
      this.router.navigateByUrl(`${this.patientRegistrationSteps[details?.index]?.link}/${this.patientId ?? ''}`);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
