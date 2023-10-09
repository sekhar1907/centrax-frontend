import { Component, OnInit } from '@angular/core';
import { SettingsService } from "./../../../core/services/settings.service";

@Component({
  selector: 'dashboard-sidebar-content-settings',
  templateUrl: './dashboard-sidebar-content-settings.component.html',
  styleUrls: ['./dashboard-sidebar-content-settings.component.scss']
})
export class DashboardSidebarContentSettingsComponent implements OnInit {
  visible: boolean = true;
  activeTab:string;

  statementOption:any;
  medicalStaffs:any;
  administrativeStaffs:any;
  systemPreference:any;
  practice:any;
  financialSetup:any;
  collectionMessage:any;
  
  constructor(private settingsService: SettingsService){
  settingsService.activeTabChange.subscribe((value) => {
      this.activeTab = value;
  })
  }

  fetchConfigData(){
    this.settingsService.softwareConfigData().subscribe({
      next: (res:any) => {
        this.statementOption = res.statementOption;
        this.medicalStaffs = res.medicalStaffs;
        this.administrativeStaffs = res.administrativeStaffs;
        this.systemPreference = res.systemPreference;
        this.practice = res.practice;
        this.financialSetup = res.financialSetup;
        this.collectionMessage = res.collectionMessage;
      },
      error: () => {}
    });
  }

  ngOnInit(): void {
    this.activeTab = this.settingsService.getActiveTabInModal();
    this.fetchConfigData();
  }
  showDialog() {
      this.visible = false;
  }
}
