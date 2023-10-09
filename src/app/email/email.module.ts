import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerifyRoutingModule } from './email-routing.module';
import { VerifyPasswordResetLinkComponent } from './verify/verify-password-reset-link/verify-password-reset-link.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../core/primeng/primeng.module';
import { VerifyComponent } from './verify/verify.component';
import { ConfirmRegistrationComponent } from './verify/confirm-registration/confirm-registration.component';


@NgModule({
  declarations: [
    VerifyPasswordResetLinkComponent,
    VerifyComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    CommonModule,
    EmailVerifyRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class EmailVerifyModule { }
