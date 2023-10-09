import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../models/login.response.model';
import { IUser } from '../models/user.model';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { IRegisterResponse } from '../models/register.response.model';
import { Store } from '@ngrx/store';
import { clearCurrentUser } from 'src/app/state/app.actions';

const baseUrl = `${environment.apiUrl}/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient, private localStore: LocalStoreService, private router: Router, private store: Store) {
  }

   /**
  * Performs the auth
  * @param email email of user
  * @param password password of user
  */
   login(username: string, password: string): Observable<ILoginResponse> { // add types later
    return this.http.post<ILoginResponse>(`${baseUrl}login`, {
      username,
      password
    }).pipe((tap((res: ILoginResponse) => {
      if(!res.emailVerified) {
        this.router.navigate(['/auth/email-verification-sent']);
      }

      this.localStore.setItem('is-logged-in', true, 'session');
    })));
  }

  /**
  * Send password link
  * @param data {email: string, securityQuestion: string, securityQuestionAnswer: string} send password param of user
  */
  sendPasswordLink(data: {email: string, securityQuestion: string, securityQuestionAnswer: string}): Observable<{success: boolean}> { // add types later
    return this.http.post<{success: boolean}>(`${baseUrl}users/send-password-reset-link`, data);
  }

  /**
  * Verify password link
  * @param token token for verifying reset password
  */
  verifyPasswordLink(token: string): Observable<{ success: boolean }> { // add types later
    return this.http.get<{ success: boolean }>(`${baseUrl}users/reset-password/${token}`);
  }

  /**
  * Verify email link
  * @param token token for verifying reset password
  */
  verifyEmailLink(token: string): Observable<{ verified: boolean }> { // add types later
    return this.http.get<{ verified: boolean }>(`${baseUrl}users/email/verify/${token}`);
  }

    /**
  * Resend email link
  * @param email email for resending verification
  */
  resendEmailLink(email: string): Observable<{ verified: boolean }> { // add types later
    return this.http.post<{ verified: boolean }>(`${baseUrl}users/email/resend-verification/`, { email });
  }

  /**
  * Reset password
  * @param token token for verifying reset password
  * @param password new password to set
  */
  resetPassword(newPassword: string, token: string): Observable<{ changed: boolean }> { // add types later
    return this.http.post<{ changed: boolean }>(`${baseUrl}users/reset-password`, { newPassword, token });
  }

  /**
  * Add Recovery email
  * @param email email for recovery
  */
  addRecoveryEmail(email: string): Observable<{ changed: boolean }> {
    return this.http.post<{ changed: boolean }>(`${baseUrl}users/add-recovery-email`, { email });
  }

  /**
  * Performs registration
  * @param email email of user
  * @param password password of user
  * @param userRole role of user
  * @param securityQuestion security question of user
  * @param securityQuestionAnswer answer to security question of user
  */
  register(data: {email: string, password: string, userRole: number, securityQuestion: number, securityQuestionAnswer: string}): Observable<IRegisterResponse> { // add types later
    return this.http.post<IRegisterResponse>(`${baseUrl}users`, data);
  }

  /**
  * Get User by id
  * @param id id of user
  */
  getUser(id: number | string): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}users${id}`);
  }

  /**
  * Get current logged in user
  */
  getLoggedinUser(): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}users/getData`);
  }

  /**
  * Returns the current user
  */
   public currentUser(): any { // add types later
    return this.currentUserSubject.value;
  }

  /**
  * Logout the user
  */
   logout() {
    this.store.dispatch(clearCurrentUser());
    if(this.localStore.getItem('is-logged-in', 'session')) {
      // logout the user
      this.http.get(`${baseUrl}users/logout`).subscribe({
        next: () => {
          this.localStore.clear('session');
          this.currentUserSubject.next(null!);
        },
        error: (error) => {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.localStore.clear('session');
      this.currentUserSubject.next(null!);
    }
  }
}
