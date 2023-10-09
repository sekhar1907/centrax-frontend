import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full'
  },
  {
    path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuard],
    data: { role: [1, 5, 7] }
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: [2] }
  },
  {
    path: 'dental-assistant', loadChildren: () => import('./dental-assistant/dental-assistant.module').then(m => m.DentalAssistantModule),
    canActivate: [AuthGuard],
    data: { role: [3] }
  },
  {
    path: 'dentist', loadChildren: () => import('./dentist/dentist.module').then(m => m.DentistModule),
    canActivate: [AuthGuard],
    data: { role: [4] }
  },
  {
    path: 'front-office-manager', loadChildren: () => import('./front-office-manager/front-office-manager.module').then(m => m.FrontOfficeManagerModule),
    canActivate: [AuthGuard],
    data: { role: [5] }
  },
  {
    path: 'hygienist', loadChildren: () => import('./hygienist/hygienist.module').then(m => m.HygienistModule),
    canActivate: [AuthGuard],
    data: { role: [6] }
  },
  {
    path: 'practice-manager', loadChildren: () => import('./practice-manager/practice-manager.module').then(m => m.PracticeManagerModule),
    canActivate: [AuthGuard],
    data: { role: [7] }
  },
  {
    path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AuthGuard],
    data: { role: [8] }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
