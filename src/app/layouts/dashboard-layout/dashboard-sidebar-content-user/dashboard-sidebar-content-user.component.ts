import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { userSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'dashboard-sidebar-content-user',
  templateUrl: './dashboard-sidebar-content-user.component.html',
  styleUrls: ['./dashboard-sidebar-content-user.component.scss']
})
export class DashboardSidebarContentUserComponent implements OnDestroy {
  userData$: Observable<IUser>;
  updateStatusActive: boolean = false
  currentStatus: string;
  statusKey: string;
  userDataSubs: Subscription;

  constructor(
    private store: Store,
    private auth: AuthService,
    private router: Router,
  ) {
    this.userData$ = this.store.select(userSelector);

    this.userDataSubs = this.store.select(userSelector).subscribe((user: IUser) => {
      this.statusKey = `${user.id}_${user.practiceId}_userstatus`;
      this.currentStatus = localStorage.getItem(this.statusKey);
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleSetStatus() {
    this.updateStatusActive = !this.updateStatusActive;
  }

  onSaveStatus(status: string) {
    localStorage.setItem(this.statusKey, status);
    this.currentStatus = status;
    this.toggleSetStatus();
  }

  ngOnDestroy(): void {
    this.userDataSubs.unsubscribe();
  }
}
