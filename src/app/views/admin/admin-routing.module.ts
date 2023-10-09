import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '', component: DashboardLayoutComponent,
    children: [
      { path: '', component: AdminComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
