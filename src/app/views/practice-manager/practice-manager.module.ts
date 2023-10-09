import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeManagerRoutingModule } from './practice-manager-routing.module';
import { PracticeManagerComponent } from './practice-manager.component';
import { OnbordingLinkComponent } from './onbording-link/onbording-link.component';
import { OnboardingAnotherLinkComponent } from './onboarding-another-link/onboarding-another-link.component';
import { AddStaffDentalComponent } from './dashboard/add-staff-dental/add-staff-dental.component';
import { AddStaffListComponent } from './dashboard/add-staff-list/add-staff-list.component';
import { ContactPersoneComponent } from './dashboard/contact-persone/contact-persone.component';
import { HalfWayDoneComponent } from './dashboard/half-way-done/half-way-done.component';
import { PracticeInfoComponent } from './dashboard/practice-info/practice-info.component';
import { StatementOptComponent } from './dashboard/statement-opt/statement-opt.component';
import { SystemPreferencesClaimsComponent } from './dashboard/system-preferences-claims/system-preferences-claims.component';
import { SystemPreferencesCutoffComponent } from './dashboard/system-preferences-cutoff/system-preferences-cutoff.component';
import { SystemPreferencesNewAccountComponent } from './dashboard/system-preferences-new-account/system-preferences-new-account.component';
import { SystemPreferencesRecallComponent } from './dashboard/system-preferences-recall/system-preferences-recall.component';
import { SystemPreferencesUcrComponent } from './dashboard/system-preferences-ucr/system-preferences-ucr.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { AddStaffComponent } from './dashboard/add-staff/add-staff.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FinancialSetupComponent } from './dashboard/financial-setup/financial-setup.component';
import { FeeScheduleDentalComponent } from './dashboard/fee-schedule-dental/fee-schedule-dental.component';
import { CollectionMsgComponent } from './dashboard/collection-msg/collection-msg.component';
import { CollectionMsgNonInsuranceComponent } from './dashboard/collection-msg-non-insurance/collection-msg-non-insurance.component';
import { CollectionStatementMsgComponent } from './dashboard/collection-statement-msg/collection-statement-msg.component';
import { PracticeBillingComponent } from './dashboard/practice-billing/practice-billing.component';
import { AllDoneComponent } from './dashboard/all-done/all-done.component';
import { PracticeDetailsComponent } from './dashboard/practice-details/practice-details.component';
import { SystemPreferencesComponent } from './dashboard/system-preferences/system-preferences.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/core/shared-components/shared-components.module';
import { AddStaffDentalListComponent } from './dashboard/add-staff-dental-list/add-staff-dental-list.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputMaskModule } from 'primeng/inputmask';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
@NgModule({
  declarations: [
    PracticeManagerComponent,
    OnbordingLinkComponent,
    OnboardingAnotherLinkComponent,
    WelcomeComponent,
    PracticeInfoComponent,
    ContactPersoneComponent,
    PracticeDetailsComponent,
    AddStaffComponent,
    AddStaffDentalComponent,
    AddStaffListComponent,
    AddStaffDentalListComponent,
    SystemPreferencesComponent,
    SystemPreferencesClaimsComponent,
    SystemPreferencesNewAccountComponent,
    SystemPreferencesRecallComponent,
    SystemPreferencesUcrComponent,
    SystemPreferencesCutoffComponent,
    HalfWayDoneComponent,
    FinancialSetupComponent,
    StatementOptComponent,
    FeeScheduleDentalComponent,
    CollectionMsgComponent,
    CollectionMsgNonInsuranceComponent,
    CollectionStatementMsgComponent,
    PracticeBillingComponent,
    AllDoneComponent,
  ],
  imports: [
    CommonModule,
    PracticeManagerRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPermissionsModule.forChild(),
    NgxMaskDirective, NgxMaskPipe,
    PrimengModule,
    FormsModule
  ],
  providers: [
    provideNgxMask()
  ],
  exports: [OnbordingLinkComponent, WelcomeComponent, InputMaskModule],
})
export class PracticeManagerModule {}
