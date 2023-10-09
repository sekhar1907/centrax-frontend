import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { LocalStoreService } from '../services/local-store.service';
import { Observable, catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { clearCurrentUser, getCurrentUser } from 'src/app/state/app.actions';
import { userSelector } from 'src/app/state/app.reducer';
import { IUser } from '../models/user.model';
import { RoleRedirectService } from '../services/role-redirect.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private roleRedirectService: RoleRedirectService,
        private store: Store,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.getCurrentUser().pipe(
        switchMap((loggedInUser: IUser) => {
          // check if user can open the route
          let role = this.getStaticData(route);
          if(role && !role.includes(loggedInUser.userRole)) {
            this.roleRedirectService.navigate(loggedInUser.userRole);
          }

          // check if logged in user has recovery email if not redirect to add recovery email page
          if(loggedInUser.emailVerified === false && (state.url !== '/auth/email-verification')) {
            this.router.navigate(['/auth/email-verification']);
          }

          // check if logged in user has recovery email if not redirect to add recovery email page
          if((loggedInUser.recoveryEmail === null || loggedInUser.recoveryEmail === '') && (state.url !== '/shared/add-recovery-email')) {
            this.router.navigate(['/shared/add-recovery-email']);
          }

          // check if user has already finished the onboarding steps
          if(((loggedInUser.userRole === 5 || loggedInUser.userRole === 7)) && !this.checkOnboarding(loggedInUser) && loggedInUser.recoveryEmail && !state.url.includes('shared')) {
            this.router.navigate(['/shared/create-practice']);
          }
          return of(true);
        }),
        catchError(() => {
          // any errors we redirect to login
          this.store.dispatch(clearCurrentUser());
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return of(false)
        })
      );
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

    private getStaticData(route: ActivatedRouteSnapshot): any {
      // Check if the route has static data
      if (route.data && route.data['role']) {
        return route.data['role'];
      }

      // Recursively check child routes for static data
      for (const childRoute of route.children) {
        const staticData = this.getStaticData(childRoute);
        if (staticData) {
          return staticData;
        }
      }

      return null; // Return null if no static data found
    }

    private checkOnboarding(loggedInUser: IUser) {
      const billingSkipped = loggedInUser.profileCreateSkippedSteps?.includes('4');
      const publicDirectorySkipped = loggedInUser.profileCreateSkippedSteps?.includes('5');
      const steps = loggedInUser.profileCreateFinishedSteps;
      if(loggedInUser.practiceOnboardingCompleted) return true;
      if(steps.length === 3 && billingSkipped && publicDirectorySkipped) return true; // if 3 steps have been completed and 2 steps skipped
      if(steps.length === 4 && (billingSkipped || publicDirectorySkipped)) return true; // if 4 steps have been completed and one skipped

      return false;
    }
}
