import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentistRoutingModule } from './dentist-routing.module';
import { DentistComponent } from './dentist.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    DentistComponent
  ],
  imports: [
    CommonModule,
    DentistRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class DentistModule { }
