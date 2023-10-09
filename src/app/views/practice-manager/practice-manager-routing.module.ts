import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeManagerComponent } from './practice-manager.component';
import { OnbordingLinkComponent } from './onbording-link/onbording-link.component';
import { OnboardingAnotherLinkComponent } from './onboarding-another-link/onboarding-another-link.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { AddStaffDentalComponent } from './dashboard/add-staff-dental/add-staff-dental.component';
import { AddStaffListComponent } from './dashboard/add-staff-list/add-staff-list.component';
import { AddStaffComponent } from './dashboard/add-staff/add-staff.component';
import { ContactPersoneComponent } from './dashboard/contact-persone/contact-persone.component';
import { HalfWayDoneComponent } from './dashboard/half-way-done/half-way-done.component';
import { PracticeDetailsComponent } from './dashboard/practice-details/practice-details.component';
import { PracticeInfoComponent } from './dashboard/practice-info/practice-info.component';
import { StatementOptComponent } from './dashboard/statement-opt/statement-opt.component';
import { SystemPreferencesClaimsComponent } from './dashboard/system-preferences-claims/system-preferences-claims.component';
import { SystemPreferencesCutoffComponent } from './dashboard/system-preferences-cutoff/system-preferences-cutoff.component';
import { SystemPreferencesNewAccountComponent } from './dashboard/system-preferences-new-account/system-preferences-new-account.component';
import { SystemPreferencesRecallComponent } from './dashboard/system-preferences-recall/system-preferences-recall.component';
import { SystemPreferencesUcrComponent } from './dashboard/system-preferences-ucr/system-preferences-ucr.component';
import { SystemPreferencesComponent } from './dashboard/system-preferences/system-preferences.component';
import { FinancialSetupComponent } from './dashboard/financial-setup/financial-setup.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
import { CollectionMsgComponent } from './dashboard/collection-msg/collection-msg.component';
import { FeeScheduleDentalComponent } from './dashboard/fee-schedule-dental/fee-schedule-dental.component';
import { CollectionMsgNonInsuranceComponent } from './dashboard/collection-msg-non-insurance/collection-msg-non-insurance.component';
import { CollectionStatementMsgComponent } from './dashboard/collection-statement-msg/collection-statement-msg.component';
import { PracticeBillingComponent } from './dashboard/practice-billing/practice-billing.component';
import { AllDoneComponent } from './dashboard/all-done/all-done.component';
import { SoftwareConfigLayoutComponent } from 'src/app/layouts/software-config-layout/software-config-layout.component';
import { AddStaffDentalListComponent } from './dashboard/add-staff-dental-list/add-staff-dental-list.component';
import { ScheduleComponent } from 'src/app/core/shared-components/dashboard/schedule/schedule.component';


const routes: Routes = [
  {
    path: '', component: DashboardLayoutComponent,
    children: [
      { path: '', component: ScheduleComponent }
    ]
  },
  {
    path: "onbording-link", component: OnbordingLinkComponent
  },
  {
    path: 'onbording-another-link', component: OnboardingAnotherLinkComponent
  },
  {
    path: '', component: SoftwareConfigLayoutComponent,
    children: [
      {path:'welcome',component:WelcomeComponent},
      {path:'practice-detail',component:PracticeDetailsComponent},
      {path:'practice-info',component:PracticeInfoComponent},
      {path:'contact-person',component:ContactPersoneComponent},
      {path:'add-staff',component:AddStaffComponent},
      {path:'add-staff-dental',component:AddStaffDentalComponent},
      {path:'add-staff-dental-list',component:AddStaffDentalListComponent},
      {path:'add-staff-list',component:AddStaffListComponent},
      {path:'system-preference',component:SystemPreferencesComponent},
      {path:'system-preference-claims',component:SystemPreferencesClaimsComponent},
      {path:'system-preference-account',component:SystemPreferencesNewAccountComponent},
      {path:'system-preference-recall',component:SystemPreferencesRecallComponent},
      {path:'system-preference-ucr',component:SystemPreferencesUcrComponent},
      {path:'system-preference-cutoff',component:SystemPreferencesCutoffComponent},
      {path:'half-way-done',component:HalfWayDoneComponent},
      {path:'financial-setup',component:FinancialSetupComponent},
      {path:'statement-options',component:StatementOptComponent},
      {path:'fee-schedule',component:FeeScheduleDentalComponent},
      {path:'collection-messages-insurance',component:CollectionMsgComponent},
      {path:'collection-messages-non-insurance',component:CollectionMsgNonInsuranceComponent},
      {path:'collection-statement-messages',component:CollectionStatementMsgComponent},
      {path:'practice-billing',component:PracticeBillingComponent},
      {path:'all-done',component:AllDoneComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeManagerRoutingModule { }
