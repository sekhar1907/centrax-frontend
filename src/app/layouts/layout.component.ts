import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
