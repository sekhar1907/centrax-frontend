import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { getCurrentUser } from 'src/app/state/app.actions';
import { userSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-email-verification-sent',
  templateUrl: './email-verification-sent.component.html',
  styleUrls: ['./email-verification-sent.component.scss']
})
export class EmailVerificationSentComponent implements OnInit {
  user: IUser;
  emailResent: boolean = false;
  resendEmailLabel: string = 'Resend Email';

  constructor(
    private auth: AuthService,
    private store: Store
  ) {
    // this.store.select(userSelector).pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (error) => {}
    })
  }

  onResendEmailLink() {
    if(!this.user.email) return;

    this.auth.resendEmailLink(this.user.email).subscribe({
      next: (res) => {
        this.emailResent = true;
        this.resendEmailLabel = 'Email resent'
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private getCurrentUser() {
    return this.store.select(userSelector).pipe(
      tap(user => this.prefetch(user)), // check store for logged in user
      filter(user => !!user),
      take(1)
    );
  }

  // call current user endpoint if there are no user in store
  private prefetch(user: IUser) {
    if (!user) this.store.dispatch(getCurrentUser());
  }
}
