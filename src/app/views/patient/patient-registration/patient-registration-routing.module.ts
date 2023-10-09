import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientFinancialAgreementComponent } from './patient-financial-agreement/patient-financial-agreement.component';
import { PatientHipaaComponent } from './patient-hipaa/patient-hipaa.component';
import { PatientMedicalHistoryComponent } from './patient-medical-history/patient-medical-history.component';
import { PatientConsentComponent } from './patient-consent/patient-consent.component';
import { PatientRegistrationComponent } from './patient-registration.component';

const routes: Routes = [
  { path: '', component: PatientRegistrationComponent,
    children: [
      { path: 'info', component: PatientInfoComponent },
      { path: 'info/:patient_id', component: PatientInfoComponent },
      { path: 'medical-history', component: PatientMedicalHistoryComponent },
      { path: 'medical-history/:patient_id', component: PatientMedicalHistoryComponent },
      { path: 'hipaa', component: PatientHipaaComponent },
      { path: 'hipaa/:patient_id', component: PatientHipaaComponent },
      { path: 'financial-agreement', component: PatientFinancialAgreementComponent },
      { path: 'financial-agreement/:patient_id', component: PatientFinancialAgreementComponent },
      { path: 'consent-form', component: PatientConsentComponent },
      { path: 'consent-form/:patient_id', component: PatientConsentComponent },
      { path: '', redirectTo: '/patient/registration/info', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/patient/registration/info', pathMatch: 'full' },
  { path: '**', redirectTo: 'others/not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRegistrationRoutingModule { }
