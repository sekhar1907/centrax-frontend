import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/core/services/onboarding.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  onboardingLinkFormGroup: UntypedFormGroup;
  manualClaimFormGroup: UntypedFormGroup;
  manualClaimSubmit!: boolean;
  onboardingSubmit!: boolean;

  searchTypeOptions = [
    { label: 'Full Name', value: 'fullName' },
    { label: 'Provider ID', value: 'externalProviderId' },
    { label: 'Practice Name', value: 'practiceName' },
    { label: 'Zip Code', value: 'zipcode' },
  ];

  constructor(private onboardingService: OnboardingService, private router: Router) {
    this.onboardingLinkFormGroup = new UntypedFormGroup({
      onboardingLink: new FormControl(null, Validators.required),
    });

    this.manualClaimFormGroup = new UntypedFormGroup({
      type: new FormControl(this.searchTypeOptions[0].value, Validators.required),
      keyword: new FormControl(null, Validators.required)
    });
  }

  get onboardingLinkForm() {
    return <{ [key: string]: FormControl }>this.onboardingLinkFormGroup.controls;
  }

  get manualClaimForm(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.manualClaimFormGroup.controls;
  }

  onClaimLink() {
    if (this.onboardingLinkFormGroup.invalid) {
      this.onboardingLinkFormGroup.markAllAsTouched();
      return;
    }

    const { onboardingLink } = this.onboardingLinkFormGroup.value;
    this.onboardingService.claimProfileOnboarding(onboardingLink).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        // Swal.fire({ title: 'Add recovery email failed.', icon: 'error', text: error?.error?.error });
      }
    })
  }

  onManualClaim() {
    const { type, keyword } = this.manualClaimFormGroup.value;
    if (this.manualClaimFormGroup.invalid) {
      this.manualClaimFormGroup.markAllAsTouched();
      return;
    }
    this.router.navigate(['/shared/complete-profile'], { queryParams: { type, keyword }});
  }
}
