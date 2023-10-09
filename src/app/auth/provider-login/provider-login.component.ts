import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse } from 'src/app/core/models/login.response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import { RoleRedirectService } from 'src/app/core/services/role-redirect.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.scss']
})
export class ProviderLoginComponent {
  loginFormGroup: UntypedFormGroup;
  formsubmit!: boolean;

  constructor(
    private auth: AuthService,
    private roleRedirectService: RoleRedirectService,
    private router: Router,
    private localStore: LocalStoreService
  ) {
    this.loginFormGroup = new UntypedFormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.localStore.clear('session');
  }

  /**
  * Returns form
  */
  get form() {
    return this.loginFormGroup.controls;
  }

  onLogin() {
    this.formsubmit = true;

    if(this.loginFormGroup.invalid) return;

    const { email, password } = this.loginFormGroup.value;
    this.auth.login(email, password).subscribe({
      next: (res: ILoginResponse) => {
        if(res.role) this.roleRedirectService.navigate(res.role);
      },
      error: (error) => {
        Swal.fire({
          title: `Login failed`,
          icon: 'error',
        });
      }
    })
  }
}
