import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalAssistantRoutingModule } from './dental-assistant-routing.module';
import { DentalAssistantComponent } from './dental-assistant.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    DentalAssistantComponent
  ],
  imports: [
    CommonModule,
    DentalAssistantRoutingModule,
    NgxPermissionsModule.forChild()
  ]
})
export class DentalAssistantModule { }
