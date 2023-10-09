import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputFieldComponent } from './form/form-input-field/form-input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { FormDropdownFieldComponent } from './form/form-dropdown-field/form-dropdown-field.component';
import { BlankSignatureLineComponent } from './form/blank-signature-line/blank-signature-line.component';
import { FormCheckboxFieldComponent } from './form/form-checkbox-field/form-checkbox-field.component';
import { FormHeaderInfoComponent } from './form/form-header-info/form-header-info.component';
import { FormHeaderComponent } from './form/form-header/form-header.component';
import { FormInitialBoxComponent } from './form/form-initial-box/form-initial-box.component';
import { FormMaskedInputFieldComponent } from './form/form-masked-input-field/form-masked-input-field.component';
import { FormRadioFieldComponent } from './form/form-radio-field/form-radio-field.component';
import { FormSideMenuComponent } from './form/form-side-menu/form-side-menu.component';
import { FormSignSectionComponent } from './form/form-sign-section/form-sign-section.component';
import { FormSignatureComponent } from './form/form-signature/form-signature.component';
import { FormStepsComponent } from './form/form-steps/form-steps.component';
import { FormTextareaFieldComponent } from './form/form-textarea-field/form-textarea-field.component';
import { FormValidationMessageComponent } from './form/form-validation-message/form-validation-message.component';
import { ScheduleComponent } from './dashboard/schedule/schedule.component';
import { SchedCalendarComponent } from './dashboard/schedule/sched-calendar/sched-calendar.component';
import { SchedControlsComponent } from './dashboard/schedule/sched-controls/sched-controls.component';
import { SchedPatientInfoComponent } from './dashboard/schedule/sched-patient-info/sched-patient-info.component';
import { SchedTabsComponent } from './dashboard/schedule/sched-tabs/sched-tabs.component';
import { SchedPatientSearchComponent } from './dashboard/schedule/sched-patient-search/sched-patient-search.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SchedViewDropdownComponent } from './sched-view-dropdown/sched-view-dropdown.component';
import { SchedPatientInfoHeaderComponent } from './dashboard/schedule/sched-patient-info/sched-patient-info-header/sched-patient-info-header.component';
import { SchedPatientInfoTabPrimaryComponent } from './dashboard/schedule/sched-patient-info/sched-patient-info-tab-primary/sched-patient-info-tab-primary.component';
import { SchedPatientInfoTabSecondaryComponent } from './dashboard/schedule/sched-patient-info/sched-patient-info-tab-secondary/sched-patient-info-tab-secondary.component';
import { SchedPatientInfoApptComponent } from './dashboard/schedule/sched-patient-info/contents/admin/sched-patient-info-appt/sched-patient-info-appt.component';
import { SchedPatientInfoBillComponent } from './dashboard/schedule/sched-patient-info/contents/admin/sched-patient-info-bill/sched-patient-info-bill.component';
import { SchedPatientInfoInsComponent } from './dashboard/schedule/sched-patient-info/contents/admin/sched-patient-info-ins/sched-patient-info-ins.component';
import { SchedPatientInfoMedHistComponent } from './dashboard/schedule/sched-patient-info/contents/admin/sched-patient-info-med-hist/sched-patient-info-med-hist.component';
import { SchedPatientInfoContentsComponent } from './dashboard/schedule/sched-patient-info/contents/sched-patient-info-contents/sched-patient-info-contents.component';
import { ListTreeComponent } from './list-tree/list-tree.component';
import { SchedPatientInfoGenInfoComponent } from './dashboard/schedule/sched-patient-info/contents/admin/sched-patient-info-gen-info/sched-patient-info-gen-info.component';
import { SchedNewPatientComponent } from './dashboard/schedule/sched-new-patient/sched-new-patient.component';
import { SchedCalendarRescheduleDialogComponent } from './dashboard/schedule/sched-calendar-reschedule-dialog/sched-calendar-reschedule-dialog.component';
import { FormCalendarFieldComponent } from './form/form-calendar-field/form-calendar-field.component';

const components = [
  BlankSignatureLineComponent,
  FormCheckboxFieldComponent,
  FormDropdownFieldComponent,
  FormHeaderComponent,
  FormHeaderInfoComponent,
  FormInitialBoxComponent,
  FormInputFieldComponent,
  FormMaskedInputFieldComponent,
  FormRadioFieldComponent,
  FormSideMenuComponent,
  FormSignSectionComponent,
  FormSignatureComponent,
  FormStepsComponent,
  FormTextareaFieldComponent,
  FormValidationMessageComponent,
  FormCalendarFieldComponent,
  ScheduleComponent,
  SchedCalendarComponent,
  SchedControlsComponent,
  SchedPatientInfoComponent,
  SchedTabsComponent,
  SchedPatientSearchComponent,
  SchedViewDropdownComponent,
  SchedPatientInfoHeaderComponent,
  SchedPatientInfoTabPrimaryComponent,
  SchedPatientInfoContentsComponent,
  SchedPatientInfoTabSecondaryComponent,
  SchedPatientInfoApptComponent,
  SchedPatientInfoBillComponent,
  SchedPatientInfoInsComponent,
  SchedPatientInfoMedHistComponent,
  SchedPatientInfoGenInfoComponent,
  ListTreeComponent,
  SchedNewPatientComponent,
  SchedCalendarRescheduleDialogComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    FullCalendarModule,
    SharedPipesModule
  ],
  exports: components
})
export class SharedComponentsModule { }
