import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PracticeService } from 'src/app/core/services/practice.service';
import { clearCurrentUser } from 'src/app/state/app.actions';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  billingFormGroup: FormGroup;
  paymentMethodFormGroup: FormGroup;
  formsubmit!: boolean;
  selectedPlanIndex: number;
  billingOptions = [
    { planName: 'Plan 1', pricePerMonth: '$00', bgColor: 'rgba(234, 223, 133, 0.7)', description: 'Basic features with up to blah blah gb' },
    { planName: 'Plan 2', pricePerMonth: '$00', bgColor: 'rgba(0, 174, 142, 0.61)', description: '' },
    { planName: 'Plan 3', pricePerMonth: '$00', bgColor: 'rgba(64, 84, 100, 0.5)', description: '' },
    { planName: 'Plan 4', pricePerMonth: '$00', bgColor: 'rgba(234, 234, 228, 0.69)', description: '' },
  ];

  constructor(
    private practiceService: PracticeService,
    private router: Router,
    private store: Store
  ) {
    this.billingFormGroup = new UntypedFormGroup({
      plan: new FormControl(null, Validators.required),
    });

    this.paymentMethodFormGroup = new UntypedFormGroup({
      cardHolder: new FormControl(null, Validators.required),
      cardNumber: new FormControl(null, Validators.required),
      expirationMonthYear: new FormControl(null, Validators.required),
      cvc: new FormControl(null, Validators.required),
    });
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.billingFormGroup.controls;
  }

  onSelectBilling(plan: string, planindex: number) {
    this.selectedPlanIndex = planindex;
    this.billingFormGroup.patchValue({ plan });
  }

  onSavePaymentMethod() {
    console.log(this.billingFormGroup.value);
  }

  onSaveBilling() {
    this.practiceService.createBilling(this.billingFormGroup.value).subscribe({
      next: (res) => {
        this.store.dispatch(clearCurrentUser());
        this.router.navigate(['/shared/public-directory']);
      },
      error: () => {}
    })
  }

  onSkip() {
    this.practiceService.saveSkippedCreationSteps('4').subscribe({
      next: () => {
        this.store.dispatch(clearCurrentUser());
        this.router.navigate(['/shared/public-directory'])
      },
      error: (error) => {}
    })
  }
}
