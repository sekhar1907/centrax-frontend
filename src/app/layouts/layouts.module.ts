import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardSidebarComponent } from './dashboard-layout/dashboard-sidebar/dashboard-sidebar.component';
import { PrimengModule } from '../core/primeng/primeng.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SoftwareConfigLayoutComponent } from './software-config-layout/software-config-layout.component';
import { DashboardSidebarMenuComponent } from './dashboard-layout/dashboard-sidebar-menu/dashboard-sidebar-menu.component';
import { DashboardSidebarContentUserComponent } from './dashboard-layout/dashboard-sidebar-content-user/dashboard-sidebar-content-user.component';
import { DashboardSidebarContentNotificationsComponent } from './dashboard-layout/dashboard-sidebar-content-notifications/dashboard-sidebar-content-notifications.component';
import { DashboardSidebarContentTodoComponent } from './dashboard-layout/dashboard-sidebar-content-todo/dashboard-sidebar-content-todo.component';
import { DashboardSidebarContentNewPatientComponent } from './dashboard-layout/dashboard-sidebar-content-new-patient/dashboard-sidebar-content-new-patient.component';
import { DashboardSidebarContentPracticeComponent } from './dashboard-layout/dashboard-sidebar-content-practice/dashboard-sidebar-content-practice.component';
import { DashboardSidebarContentFaqComponent } from './dashboard-layout/dashboard-sidebar-content-faq/dashboard-sidebar-content-faq.component';
import { DashboardSidebarContentPaymentComponent } from './dashboard-layout/dashboard-sidebar-content-payment/dashboard-sidebar-content-payment.component';

import { DashboardSidebarContentSettingsComponent } from './dashboard-layout/dashboard-sidebar-content-settings/dashboard-sidebar-content-settings.component';
import { StaffComponent } from './dashboard-layout/dashboard-sidebar-content-settings/staff/staff.component';
import { SystemPreferencesComponent } from './dashboard-layout/dashboard-sidebar-content-settings/system-preferences/system-preferences.component';
import { PasswordComponent } from './dashboard-layout/dashboard-sidebar-content-settings/password/password.component';
import { PracticeInformationComponent } from './dashboard-layout/dashboard-sidebar-content-settings/practice-information/practice-information.component';
import { FinancialSetupComponent } from './dashboard-layout/dashboard-sidebar-content-settings/financial-setup/financial-setup.component';
import { CollectionMessagesComponent } from './dashboard-layout/dashboard-sidebar-content-settings/collection-messages/collection-messages.component';
import { StatementOptionsComponent } from './dashboard-layout/dashboard-sidebar-content-settings/statement-options/statement-options.component';
import { SidebarComponent } from './dashboard-layout/dashboard-sidebar-content-settings/sidebar/sidebar.component';

import { DashboardSidebarContentSetStatusComponent } from './dashboard-layout/dashboard-sidebar-content-user/dashboard-sidebar-content-set-status/dashboard-sidebar-content-set-status.component';
import { DashboardSidebarContentMakeAnnouncementComponent } from './dashboard-layout/dashboard-sidebar-content-notifications/dashboard-sidebar-content-make-announcement/dashboard-sidebar-content-make-announcement.component';
import { SharedComponentsModule } from '../core/shared-components/shared-components.module';
import { DashboardSidebarContentAppointmentComponent } from './dashboard-layout/dashboard-sidebar-content-appointment/dashboard-sidebar-content-appointment.component';
import { FeeScheduleComponent } from './dashboard-layout/dashboard-sidebar-content-settings/fee-schedule/fee-schedule.component';
import { CategoryComponent } from './dashboard-layout/dashboard-sidebar-content-settings/category/category.component';


const components = [
  LayoutComponent,
  DashboardLayoutComponent,
  DashboardSidebarComponent,
  SoftwareConfigLayoutComponent,
  DashboardSidebarMenuComponent,
  DashboardSidebarContentUserComponent,
  DashboardSidebarContentNotificationsComponent,
  DashboardSidebarContentTodoComponent,
  DashboardSidebarContentNewPatientComponent,
  DashboardSidebarContentSettingsComponent,
  DashboardSidebarContentPracticeComponent,
  DashboardSidebarContentFaqComponent,
  DashboardSidebarContentPaymentComponent,
  DashboardSidebarContentSetStatusComponent,
  DashboardSidebarContentMakeAnnouncementComponent,
];

@NgModule({
  declarations:[
    components,
    SoftwareConfigLayoutComponent,
    DashboardSidebarMenuComponent,
    DashboardSidebarContentUserComponent,
    DashboardSidebarContentNotificationsComponent,
    DashboardSidebarContentTodoComponent,
    DashboardSidebarContentNewPatientComponent,
    DashboardSidebarContentPracticeComponent,
    DashboardSidebarContentFaqComponent,
    DashboardSidebarContentPaymentComponent,
    DashboardSidebarContentSettingsComponent,
    StaffComponent,
    SystemPreferencesComponent,
    PasswordComponent,
    PracticeInformationComponent,
    FinancialSetupComponent,
    CollectionMessagesComponent,
    StatementOptionsComponent,
    SidebarComponent,
    DashboardSidebarContentAppointmentComponent,
    FeeScheduleComponent,
    CategoryComponent
  ],
  imports: [CommonModule, RouterModule, PrimengModule, OverlayPanelModule, FormsModule, ReactiveFormsModule, SharedComponentsModule]
})
export class LayoutsModule { }
