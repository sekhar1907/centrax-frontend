import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from '../services/local-store.service';
import { Observable, catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentUser } from 'src/app/state/app.actions';
import { userSelector } from 'src/app/state/app.reducer';
import { IUser } from '../models/user.model';
import { ERoles, Roles } from '../enums/roles.enum';
import { RoleRedirectService } from '../services/role-redirect.service';

@Injectable({ providedIn: 'root' })
export class OnboardingGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store,
        private roleRedirectService: RoleRedirectService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.getCurrentUser().pipe(
        switchMap((loggedInUser: IUser) => {
          // console.log(loggedInUser);
          if(loggedInUser.userRole !== ERoles.FRONT_OFFICE_MANAGER && loggedInUser.userRole !== ERoles.PRACTICE_MANAGER) {
            console.log('not allowed: ', loggedInUser.userRole);
            this.roleRedirectService.navigate(loggedInUser.userRole)
          }

          if(loggedInUser.practiceOnboardingCompleted) {
            this.router.navigate(['/practice-manager/welcome']);
          }

          const navigate = this.checkFinishedSteps(loggedInUser.profileCreateFinishedSteps, loggedInUser.profileCreateSkippedSteps, state);
          if(navigate !== false && !loggedInUser.practiceOnboardingCompleted) {
            this.router.navigateByUrl(navigate as string);
          }

          return of(true);
        }),
        catchError((error) => {
          // any errors we redirect to login
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

    private checkFinishedSteps(steps: string[], skippedSteps: string[], state: RouterStateSnapshot): string | boolean {
      if(!steps.length &&
        !(state.url.includes('/onboarding')) &&
        !(state.url.includes('/complete-profile')) &&
        !(state.url.includes('/create-practice'))) {
        return '/shared/create-practice';
      }

      // redirect to BAA
      if(steps.length && steps.includes('1') && !steps.includes('2') && !(state.url.includes('baa'))) {
        console.log('1');
        return '/shared/baa';
      }

      // redirect to to create owner page
      if(steps.includes('1') && steps.includes('2') && !steps.includes('3') && !(state.url.includes('/practice-details')) && !(state.url.includes('/public-directory?add=true'))) {
        console.log('2');
        return '/shared/practice-details';
      }

      // redirect to to billing page
      const billingSkipped = skippedSteps?.includes('4');
      if(steps.includes('1') && steps.includes('2') && steps.includes('3') && !steps.includes('4') && !billingSkipped && !(state.url.includes('/billing'))) {
        console.log('3b');
        return '/shared/billing';
      }

      // redirect to to create public directory
      const publicDirectorySkipped = skippedSteps?.includes('5');
      if(steps.includes('1') && steps.includes('2') && steps.includes('3') && !steps.includes('4') && billingSkipped && !publicDirectorySkipped && !(state.url.includes('/public-directory'))) {
        console.log('4a');
        return '/shared/public-directory';
      }

      if(steps.includes('1') && steps.includes('2') && steps.includes('3') && steps.includes('4') && !steps.includes('5') && !publicDirectorySkipped && !(state.url.includes('/public-directory'))) {
        console.log('4b');
        return '/shared/public-directory';
      }

      return false;
    }
}
