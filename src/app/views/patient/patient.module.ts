import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { PatientRegistrationModule } from './patient-registration/patient-registration.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    PatientComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    PatientRegistrationModule,
    PrimengModule,
    NgxPermissionsModule.forChild()
  ]
})
export class PatientModule { }
