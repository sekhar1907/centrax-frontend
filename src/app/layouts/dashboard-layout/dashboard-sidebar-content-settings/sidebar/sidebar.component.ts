import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../../../core/services/settings.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeTab:string;
  
  constructor(private SettingsService:SettingsService){
    this.SettingsService.activeTabChange.subscribe((value) => {
        this.activeTab = value
    })
  }
  changeTab(activeTab){
    this.activeTab = activeTab;
    this.SettingsService.setActiveTabInModal(activeTab);
  }

  ngOnInit() {
  }
}
