import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SECURITY_QUESTIONS } from 'src/app/core/constants/security-questions';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStoreService } from 'src/app/core/services/local-store.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent {
  token: string;
  linkVerified: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private localStore: LocalStoreService) {

    const token = this.route.snapshot.queryParams['token'];
    if(!token) {
      Swal.fire({title: 'Invalid verify email link', icon: 'error'}).then(() => {
        this.router.navigate(['/']);
      })
    } {
      this.token = token;
    }
  }

  ngOnInit(): void {
    this.verifyCreateAccountLink();
  }




  verifyCreateAccountLink() {
    if(!this.token) return;

    this.auth.verifyEmailLink(this.token).subscribe({
      next: (res) => {
        this.linkVerified = true;
      },
      error: () => {
        this.linkVerified = false;
        Swal.fire({title: 'Invalid confirm email link', icon: 'error'}).then(() => {
          this.router.navigate(['/']);
        });
      }
    })
  }


}
