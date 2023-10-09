import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent,
    children: [
      { path: '', component: SuperAdminComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
