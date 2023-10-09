import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { PrimengModule } from '../core/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleRedirectService } from '../core/services/role-redirect.service';
import { ProviderRegisterComponent } from './provider-register/provider-register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AddRecoveryEmailComponent } from './add-recovery-email/add-recovery-email.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';


import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetLinkSentComponent } from './password-reset-link-sent/password-reset-link-sent.component';
import { EmailVerificationSentComponent } from './email-verification-sent/email-verification-sent.component';
import { SharedComponentsModule } from '../core/shared-components/shared-components.module';
@NgModule({
  declarations: [
    ProviderLoginComponent,
    LoginComponent,
    ProviderRegisterComponent,
    EmailVerificationComponent,
    EmailVerifyComponent,
    ForgotPasswordComponent,
    PasswordResetLinkSentComponent,
    EmailVerificationSentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    PrimengModule,
    SharedComponentsModule
  ],
  providers: [RoleRedirectService]
})
export class AuthModule { }
