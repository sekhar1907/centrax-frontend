import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { USER_ROLES } from 'src/app/core/constants/user-roles';
import { GlobalService } from 'src/app/core/services/global.service';
import { PracticeNotificationService } from 'src/app/core/services/practice-notifications.service';

@Component({
  selector: 'app-dashboard-sidebar-content-make-announcement',
  templateUrl: './dashboard-sidebar-content-make-announcement.component.html',
  styleUrls: ['./dashboard-sidebar-content-make-announcement.component.scss']
})
export class DashboardSidebarContentMakeAnnouncementComponent {
  locationItems = [
    { value: null, label: 'Select Location' },
    { value: 1, label: 'Plaza Practice' }
  ]
  userGroupItems = USER_ROLES
  announcementFormgroup: FormGroup;

  @Output() closeMakeAnnouncement = new EventEmitter();
  @Output() announcementCreated = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: PracticeNotificationService,
    private globalService: GlobalService
  ) {
    this.announcementFormgroup = this.formBuilder.group({
      recepientLocation: [null, Validators.required],
      recepientRole: [null, Validators.required],
      message: [null, Validators.required]
    })
  }

  onCloseSetStatus() {
    this.closeMakeAnnouncement.emit()
  }

  onSubmitMakeAnnouncement() {
    this.notificationService.create(this.announcementFormgroup.value).subscribe({
      next: (res) => {
        this.announcementCreated.emit(res);
        this.announcementFormgroup.reset();
        this.closeMakeAnnouncement.emit();
      },
      error: (error) => this.globalService.handleError(error)
    })
  }
}
