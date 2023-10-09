import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecoveryEmailComponent } from './add-recovery-email/add-recovery-email.component';
import { AccountProfileLayoutComponent } from '../layouts/account-profile-layout/account-profile-layout.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { BaaComponent } from './profile-creation/baa/baa.component';
import { PracticeDetailsComponent } from './profile-creation/practice-details/practice-details.component';
import { PublicDirectoryComponent } from './profile-creation/public-directory/public-directory.component';
import { CreatePracticeComponent } from './profile-creation/create-practice/create-practice.component';
import { BillingComponent } from './profile-creation/billing/billing.component';
import { ProfileCreationWelcomeComponent } from './profile-creation/profile-creation-welcome/profile-creation-welcome.component';
import { OnboardingGuard } from '../core/guards/onboarding.guard';

const routes: Routes = [
  {
    path: '', component: AccountProfileLayoutComponent,
    children: [
      { path: 'add-recovery-email', component: AddRecoveryEmailComponent },
      { path: 'onboarding', component: OnboardingComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'complete-profile', component: CompleteProfileComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'create-practice', component: CreatePracticeComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'baa', component: BaaComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'practice-details', component: PracticeDetailsComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'billing', component: BillingComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'public-directory', component: PublicDirectoryComponent, canActivate: [OnboardingGuard], data: { role: [5, 7] } },
      { path: 'welcome', component: ProfileCreationWelcomeComponent, data: { role: [5, 7] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedPagesRoutingModule { }
