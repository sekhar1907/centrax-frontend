import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { InputTextModule } from 'primeng/inputtext';
import { RoleRedirectService } from 'src/app/core/services/role-redirect.service';
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/state/app.reducer';
import { map, take } from 'rxjs';
import { getCurrentUser } from 'src/app/state/app.actions';

@Component({
  selector: 'app-add-recovery-email',
  templateUrl: './add-recovery-email.component.html',
  styleUrls: ['./add-recovery-email.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule],
  providers: [RoleRedirectService]
})
export class AddRecoveryEmailComponent implements OnInit {
  recoveryEmailFormGroup: UntypedFormGroup;
  formsubmit!: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService,
    private roleRedirectService: RoleRedirectService, private store: Store) {
    this.recoveryEmailFormGroup = new UntypedFormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void { }

  /**
* Returns form
*/
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
          this.store.dispatch(getCurrentUser());
          Swal.fire({ title: 'Recovery email added.', icon: 'success' }).then(() => {
          this.store.select(userSelector).pipe(
            take(1)
          ).subscribe(user => {
            if(user) {
              this.roleRedirectService.navigate(user.userRole);
            } else {
              this.router.navigate(['/']);
            }
          });

        });
      },
      error: (error) => {
        // console.log(error);
        // Swal.fire({ title: 'Add recovery email failed.', icon: 'error', text: error?.error?.error });
      }
    })
  }
}
