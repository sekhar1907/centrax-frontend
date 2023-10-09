import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: '', component: PatientClinicalNotesComponent, children: [
      { path: '', redirectTo: '/patient/clinical-notes/consult', pathMatch: 'full' },
      { path: 'consult/:patientId', component: PatientConsultComponent },
      { path: 'operative-progress/:patientId', component: PatientOperativeProgressComponent },
      { path: 'recall/:patientId', component: PatientRecallComponent },
      { path: 'perio-maintenance/:patientId', component: PatientPerioMaintenanceComponent },
      { path: 'extraction/:patientId', component: PatientExtractionComponent },
      { path: 'fillings/:patientId', component: PatientFillingComponent },
      { path: 'root-canal/:patientId', component: PatientRootCanalComponent },
      { path: 'sealant/:patientId', component: PatientSealantComponent },
      { path: 'spt-hygiene/:patientId', component: PatientSptHygieneComponent },
      { path: 'srp/:patientId', component: PatientSrpComponent },
      { path: '**', redirectTo: 'error/404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientClinicalNotesRoutingModule { }
