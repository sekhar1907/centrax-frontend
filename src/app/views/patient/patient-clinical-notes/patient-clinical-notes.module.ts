import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientClinicalNotesRoutingModule } from './patient-clinical-notes-routing.module';
import { PatientClinicalNotesComponent } from './patient-clinical-notes.component';
import { PatientConsultComponent } from './patient-consult/patient-consult.component';
import { PatientExtractionComponent } from './patient-extraction/patient-extraction.component';
import { PatientFillingComponent } from './patient-filling/patient-filling.component';
import { PatientOperativeProgressComponent } from './patient-operative-progress/patient-operative-progress.component';
import { PatientPerioMaintenanceComponent } from './patient-perio-maintenance/patient-perio-maintenance.component';
import { PatientRecallComponent } from './patient-recall/patient-recall.component';
import { PatientRootCanalComponent } from './patient-root-canal/patient-root-canal.component';
import { PatientSealantComponent } from './patient-sealant/patient-sealant.component';
import { PatientSptHygieneComponent } from './patient-spt-hygiene/patient-spt-hygiene.component';
import { PatientSrpComponent } from './patient-srp/patient-srp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/primeng/primeng.module';
import { SharedComponentsModule } from 'src/app/core/shared-components/shared-components.module';


@NgModule({
  declarations: [
    PatientClinicalNotesComponent,
    PatientConsultComponent,
    PatientOperativeProgressComponent,
    PatientRecallComponent,
    PatientPerioMaintenanceComponent,
    PatientExtractionComponent,
    PatientFillingComponent,
    PatientRootCanalComponent,
    PatientSealantComponent,
    PatientSptHygieneComponent,
    PatientSrpComponent
  ],
  imports: [
    CommonModule,
    PatientClinicalNotesRoutingModule,
    SharedComponentsModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PatientClinicalNotesModule { }
