import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'others/maintenance', pathMatch: 'full' },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherPagesRoutingModule { }
