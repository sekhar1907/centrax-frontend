import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SECURITY_QUESTIONS } from 'src/app/core/constants/security-questions';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-verify-password-reset-link',
  templateUrl: './verify-password-reset-link.component.html',
  styleUrls: ['./verify-password-reset-link.component.scss']
})
export class VerifyPasswordResetLinkComponent implements OnInit {
  token: string;
  linkVerified: boolean = false;
  forgotPasswordFormGroup: UntypedFormGroup;
  formsubmit!: boolean;
  securityQuestions = SECURITY_QUESTIONS;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.forgotPasswordFormGroup = new UntypedFormGroup({
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    }, { validators: matchingPasswords('newPassword', 'confirmPassword') });
    const token = this.route.snapshot.queryParams['token'];
    if(!token) {
      Swal.fire({title: 'Invalid reset password link', icon: 'error'}).then(() => {
        this.router.navigate(['/']);
      })
    } {
      this.token = token;
    }
  }

  ngOnInit(): void {
    this.verifyResetLink();
  }

  /**
  * Returns form
  */
  get form() {
    return this.forgotPasswordFormGroup.controls;
  }

  onResetPassword() {
    this.formsubmit = true;

    if(this.forgotPasswordFormGroup.invalid) return;

    const { newPassword, confirmPassword } = this.forgotPasswordFormGroup.value;
    this.auth.resetPassword(newPassword, this.token).subscribe({
      next: (res: {changed: boolean}) => {
        Swal.fire({title: 'Password reset success', icon: 'success'}).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  verifyResetLink() {
    if(!this.token) return;

    this.auth.verifyPasswordLink(this.token).subscribe({
      next: () => {
        this.linkVerified = true;
      },
      error: () => {
        this.linkVerified = false;
        Swal.fire({title: 'Invalid reset password link', icon: 'error'}).then(() => {
          this.router.navigate(['/']);
        });
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
