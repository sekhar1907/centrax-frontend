import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyPasswordResetLinkComponent } from './verify/verify-password-reset-link/verify-password-reset-link.component';
import { VerifyComponent } from './verify/verify.component';
import { AccountProfileLayoutComponent } from '../layouts/account-profile-layout/account-profile-layout.component';
import { ConfirmRegistrationComponent } from './verify/confirm-registration/confirm-registration.component';

const routes: Routes = [
  { path: '', component: AccountProfileLayoutComponent,
    children: [
      { path: 'verify', component: VerifyComponent,
        children: [
          { path: 'reset-password', component: VerifyPasswordResetLinkComponent },
          { path: 'create-account', component: ConfirmRegistrationComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerifyRoutingModule { }
