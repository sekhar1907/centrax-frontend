import { Component } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SECURITY_QUESTIONS } from 'src/app/core/constants/security-questions';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordFormGroup: UntypedFormGroup;
  formsubmit!: boolean;
  securityQuestions = SECURITY_QUESTIONS;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.forgotPasswordFormGroup = new UntypedFormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      securityQuestion: new FormControl(null, Validators.required),
      securityQuestionAnswer: new FormControl(null, Validators.required),
    });
  }

  /**
  * Returns form
  */
  get form() {
    return this.forgotPasswordFormGroup.controls;
  }

  onSendResetLink() {
    this.formsubmit = true;

    if(this.forgotPasswordFormGroup.invalid) return;

    const { email, securityQuestion, securityQuestionAnswer } = this.forgotPasswordFormGroup.value;
    this.auth.sendPasswordLink({ email, securityQuestion: securityQuestion.value, securityQuestionAnswer }).subscribe({
      next: (res: {success: boolean}) => {
        this.router.navigate(['/auth/reset-link-sent']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
