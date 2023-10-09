import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentalAssistantComponent } from './dental-assistant.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent,
    children: [
      { path: '', component: DentalAssistantComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentalAssistantRoutingModule { }
