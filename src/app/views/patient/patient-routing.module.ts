import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '', component: DashboardLayoutComponent,
    children: [
      {
        path: '', component: PatientComponent,
        children: [
        ]
      }
    ]
  },
  { path: 'registration', loadChildren: () => import('./patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule) },
  { path: 'clinical-notes', loadChildren: () => import('./patient-clinical-notes/patient-clinical-notes.module').then(m => m.PatientClinicalNotesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
