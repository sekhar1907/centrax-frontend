import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    SuperAdminComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class SuperAdminModule { }
