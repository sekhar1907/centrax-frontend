
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RoleRedirectService } from 'src/app/core/services/role-redirect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recovery-email',
  templateUrl: './add-recovery-email.component.html',
  styleUrls: ['./add-recovery-email.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule],
  providers: [RoleRedirectService]
})
export class AddRecoveryEmailComponent {

  recoveryEmailFormGroup: UntypedFormGroup;
  formsubmit!: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService,
    private roleRedirectService: RoleRedirectService) {
    this.recoveryEmailFormGroup = new UntypedFormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void { }

  get form() {
    return this.recoveryEmailFormGroup.controls;
  }

  onAddRecoveryEmail() {
    if (this.recoveryEmailFormGroup.invalid) {
      this.recoveryEmailFormGroup.markAllAsTouched();
      return;
    }

    const { email } = this.recoveryEmailFormGroup.value;
    this.auth.addRecoveryEmail(email).subscribe({
      next: (res: any) => {
        console.log('abm',res)

        Swal.fire({ title: 'Recovery email added.', icon: 'success' }).then(() => {
          const user = this.auth.currentUser();
          if(user) {
            this.roleRedirectService.navigate(user.role);
          } else {
            this.router.navigate(['/']);
          }
        });
      },
      error: (error) => {
        // console.log(error);
        // Swal.fire({ title: 'Add recovery email failed.', icon: 'error', text: error?.error?.error });
      }
    })
  }
}
