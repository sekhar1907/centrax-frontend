import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { PatientConsentComponent } from './patient-consent/patient-consent.component';
import { PatientFinancialAgreementComponent } from './patient-financial-agreement/patient-financial-agreement.component';
import { PatientHipaaComponent } from './patient-hipaa/patient-hipaa.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientMedicalHistoryComponent } from './patient-medical-history/patient-medical-history.component';
import { PatientRegistrationAccordionComponent } from './patient-registration-accordion/patient-registration-accordion.component';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { PatientRegistrationComponent } from './patient-registration.component';
import { MessageService } from 'primeng/api';
import { SharedComponentsModule } from 'src/app/core/shared-components/shared-components.module';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientConsentComponent,
    PatientFinancialAgreementComponent,
    PatientHipaaComponent,
    PatientInfoComponent,
    PatientMedicalHistoryComponent,
    PatientRegistrationAccordionComponent,
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    SharedComponentsModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MessageService, SessionStorageService]
})
export class PatientRegistrationModule { }
