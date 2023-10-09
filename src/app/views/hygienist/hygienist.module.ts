import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HygienistRoutingModule } from './hygienist-routing.module';
import { HygienistComponent } from './hygienist.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    HygienistComponent
  ],
  imports: [
    CommonModule,
    HygienistRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class HygienistModule { }
