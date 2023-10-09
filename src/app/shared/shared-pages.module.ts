import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedPagesRoutingModule } from './shared-pages-routing.module';
import { SharedComponent } from './shared.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OnboardingService } from '../core/services/onboarding.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../core/primeng/primeng.module';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { CreatePracticeComponent } from './profile-creation/create-practice/create-practice.component';
import { BaaComponent } from './profile-creation/baa/baa.component';
import { PracticeDetailsComponent } from './profile-creation/practice-details/practice-details.component';
import { BillingComponent } from './profile-creation/billing/billing.component';
import { PublicDirectoryComponent } from './profile-creation/public-directory/public-directory.component';
import { SharedComponentsModule } from '../core/shared-components/shared-components.module';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ProfileCreationWelcomeComponent } from './profile-creation/profile-creation-welcome/profile-creation-welcome.component';
import { ProviderService } from '../core/services/provider.service';
import { PracticeService } from '../core/services/practice.service';

@NgModule({
  declarations: [
    SharedComponent,
    OnboardingComponent,
    CompleteProfileComponent,
    CreatePracticeComponent,
    BaaComponent,
    PracticeDetailsComponent,
    BillingComponent,
    PublicDirectoryComponent,
    ProfileCreationWelcomeComponent,
  ],
  imports: [
    CommonModule,
    SharedPagesRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    AngularSignaturePadModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [
    OnboardingService,
    ProviderService,
    PracticeService,
    provideNgxMask()
  ]
})
export class SharedPagesModule { }
