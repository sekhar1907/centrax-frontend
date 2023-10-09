import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SECURITY_QUESTIONS } from 'src/app/core/constants/security-questions';
import { USER_ROLES } from 'src/app/core/constants/user-roles';
import { Roles } from 'src/app/core/enums/roles.enum';
import { ILoginResponse } from 'src/app/core/models/login.response.model';
import { IRegisterResponse } from 'src/app/core/models/register.response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrls: ['./provider-register.component.scss']
})
export class ProviderRegisterComponent {
  registerFormGroup: UntypedFormGroup;
  formsubmit!: boolean;
  securityQuestions = SECURITY_QUESTIONS;
  userRoles = USER_ROLES;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.registerFormGroup = new UntypedFormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      userRole: new FormControl(7, Validators.required), // default to practice manager
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?!.*[+])[\w\d]{8,}$/)]),
      confirmPassword: new FormControl(null, Validators.required),
      securityQuestion: new FormControl(null, Validators.required),
      securityQuestionAnswer: new FormControl(null, Validators.required),
    }, { validators: matchingPasswords('password', 'confirmPassword') });
  }

  /**
  * Returns form
  */
  get form() {
    return this.registerFormGroup.controls;
  }

  onRegister() {
    this.formsubmit = true;
    this.registerFormGroup.markAllAsTouched();

    if(this.registerFormGroup.invalid) return;

    let { confirmPassword, ...formData } = this.registerFormGroup.value;
    formData.securityQuestion = formData.securityQuestion?.value;
    this.auth.register(formData).subscribe({
      next: (res: IRegisterResponse) => {
        if(res.id && !res.error) {
          Swal.fire({
            title: `Registration success`,
            icon: 'success',
          });
          this.router.navigate(['/auth/email-verification']);
        } else {
          Swal.fire({
            title: `Registration failed`,
            icon: 'error',
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: any) => {
    const passwordInput = group.controls[passwordKey];
    const passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if ((passwordInput.value || passwordConfirmationInput.value) && (passwordInput.value !== passwordConfirmationInput.value)) {
      return passwordConfirmationInput.setErrors({notEquivalent: true});
    } else {
      passwordConfirmationInput.setErrors(null);
    }
  };
}
