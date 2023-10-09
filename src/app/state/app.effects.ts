import { Injectable } from "@angular/core";
import { Actions, EffectNotification, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../core/services/auth.service";
import * as AppActions from "../state/app.actions";
import { Observable, catchError, exhaustMap, map, mergeMap, of, takeUntil } from "rxjs";
import { AppService } from "../core/services/app.service";
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private appService: AppService,
    public sessionStorageService: SessionStorageService

  ) { }

  //get logged in user data
  getLoggedinUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getCurrentUser),
      mergeMap(() =>
        this.auth.getLoggedinUser().pipe(
          map(
            (loggedInUser) => {

              this.sessionStorageService.set('loggedInUser', loggedInUser);
              this.sessionStorageService.set('practiceId', loggedInUser.practiceId);

              return AppActions.getCurrentUserSuccess({ loggedInUser });
            },
            catchError((error) => of(AppActions.getCurrentUserFail({ error })))
          )
        )
      )
    );
  });

  //get specialties list
  getSpecialties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getSpecialties),
      mergeMap(() =>
        this.appService.getSpecialties().pipe(
          map(
            (specialties) => AppActions.getSpecialtiesSuccess({ specialties }),
            catchError((error) => of(AppActions.getSpecialtiesFail({ error })))
          )
        )
      )
    );
  });

  // ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
  //   return this.actions$
  //     .pipe(
  //       ofType(AppActions.startAppInitializer),
  //       exhaustMap(() => resolvedEffects$.pipe(
  //         takeUntil(this.actions$.pipe(
  //           ofType(AppActions.finishAppInitializer)))
  //       ))
  //     );
  // }
}
