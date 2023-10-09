import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProfileLayoutComponent } from '../layouts/account-profile-layout/account-profile-layout.component';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { ProviderRegisterComponent } from './provider-register/provider-register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AddRecoveryEmailComponent } from './add-recovery-email/add-recovery-email.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetLinkSentComponent } from './password-reset-link-sent/password-reset-link-sent.component';
import { EmailVerificationSentComponent } from './email-verification-sent/email-verification-sent.component';

const routes: Routes = [
  {

    path: '', component: AccountProfileLayoutComponent,
    children: [
      { path: 'provider-login', component: ProviderLoginComponent },
      { path: 'login',component:ProviderLoginComponent },
      { path: 'register', component: ProviderRegisterComponent },
      { path:'email-verification', component: EmailVerificationSentComponent },
      { path:'email-verify', component:EmailVerifyComponent},
      {path:"email-recovery",component:AddRecoveryEmailComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-link-sent', component: PasswordResetLinkSentComponent },
      { path: 'email-verification-sent', component: EmailVerificationSentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
