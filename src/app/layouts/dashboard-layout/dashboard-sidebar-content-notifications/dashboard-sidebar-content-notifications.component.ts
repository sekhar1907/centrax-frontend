import { Component, OnInit } from '@angular/core';
import { PracticeNotification } from 'src/app/core/models/practice-notification.model';
import { PracticeNotificationService } from 'src/app/core/services/practice-notifications.service';

@Component({
  selector: 'dashboard-sidebar-content-notifications',
  templateUrl: './dashboard-sidebar-content-notifications.component.html',
  styleUrls: ['./dashboard-sidebar-content-notifications.component.scss']
})
export class DashboardSidebarContentNotificationsComponent implements OnInit {
  makeAnnouncementActive: boolean = false;
  notifications: PracticeNotification[] = [];

  constructor(
    private notificationService: PracticeNotificationService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  private getNotifications() {
    this.notificationService.getAll().subscribe((res) => {
      this.notifications = res;
    })
  }

  toggleMakeAnnouncement() {
    this.makeAnnouncementActive = !this.makeAnnouncementActive;
  }

  onAnnouncementCreated(annountment: PracticeNotification) {
    this.getNotifications();
  }
}
