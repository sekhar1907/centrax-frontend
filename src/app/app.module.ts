import { APP_INITIALIZER, Inject, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './core/primeng/primeng.module';
import { LayoutsModule } from './layouts/layouts.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ViewsModule } from './views/views.module'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, specialtiesSelector } from './state/app.reducer';
import { AppEffects } from './state/app.effects';
import { AppService } from './core/services/app.service';
import { getSpecialties } from './state/app.actions';
import { LocalStoreService } from './core/services/local-store.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RoleRedirectService } from './core/services/role-redirect.service';
import { ScheduleService } from './core/services/schedule.service';
import { SidebarService } from './core/services/sidebar.service';
import { DialogService } from 'primeng/dynamicdialog';

function appInitializer(store: Store, localStore: LocalStoreService) {
  return () => new Promise((resolve) => {
    const isLoggedin = localStore.getItem('is-logged-in', 'session');

    if(!isLoggedin) {
      resolve(true);
    }

    store.dispatch(getSpecialties());
    resolve(true);
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutsModule,
    PrimengModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forRoot([AppEffects]),
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    RoleRedirectService,
    SidebarService,
    DialogService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [[new Inject(Store)], LocalStoreService],
    },
    [CookieService],
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    AppService,
    ScheduleService
  ],
  bootstrap: [AppComponent]
});
export class AppModule {
  
}
