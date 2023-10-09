import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeManagerRoutingModule } from './front-office-manager-routing.module';
import { FrontOfficeManagerComponent } from './front-office-manager.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    FrontOfficeManagerComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeManagerRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class FrontOfficeManagerModule { }
