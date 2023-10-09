import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  passwordResetForm: FormGroup;
  formsubmit!: boolean;

  constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    this.createForm();
  }
  createForm() {
    this.passwordResetForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?!.*[+])[\w\d]{8,}$/)]],
      repeatNewPassword: ['', Validators.required]

    },{ validators: this.matchingPasswords('newPassword', 'repeatNewPassword') });
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
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

  /**
  * Returns form
  */
  get form() {
    return this.passwordResetForm.controls;
  }
  passwordReset() {
    this.formsubmit = true;
    this.settingsService.resetPassword(this.passwordResetForm.value).subscribe({
      next: (res: any) => {
        if(!res.error) {
          Swal.fire({
            title: `password successfully updated`,
            icon: 'success',
          });
          // this.router.navigate(['/auth/email-verification']);
        } else {
          Swal.fire({
            title: `password reset failed`,
            icon: 'error',
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

