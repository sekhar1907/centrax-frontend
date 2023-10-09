import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/views.module').then((m) => m.ViewsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'others',
    loadChildren: () =>
      import('./other-pages/other-pages.module').then(
        (m) => m.OtherPagesModule
      ),
  },
  {
    path: 'email',
    loadChildren: () =>
      import('./email/email.module').then((m) => m.EmailVerifyModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared-pages.module').then((m) => m.SharedPagesModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'others/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
