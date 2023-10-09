import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherPagesRoutingModule } from './other-pages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    MaintenanceComponent,
    ComingSoonComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    OtherPagesRoutingModule
  ]
})
export class OtherPagesModule { }
