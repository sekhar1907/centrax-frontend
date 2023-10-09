import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISpecialty } from 'src/app/core/models/specialty.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeService } from 'src/app/core/services/practice.service';
import { clearCurrentUser } from 'src/app/state/app.actions';
import { specialtiesSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-create-practice',
  templateUrl: './create-practice.component.html',
  styleUrls: ['./create-practice.component.scss']
})
export class CreatePracticeComponent {
  createProfileFormGroup: FormGroup;
  formsubmit!: boolean;
  specialtyOptions$: Observable<ISpecialty[]>;


  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private store: Store,
    private practiceService: PracticeService) {
    this.specialtyOptions$ = this.store.select(specialtiesSelector);
    this.createProfileFormGroup = new UntypedFormGroup({
      name: new FormControl(null, Validators.required),
      specialty: new FormControl(null, Validators.required),
      address: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null, Validators.email),
      fromPracticeOnboarding: new FormControl(true, Validators.required),
    });
  }

  ngOnInit(): void { }

  /**
* Returns form
*/
  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.createProfileFormGroup.controls;
  }

  onCreateProfile() {
    this.formsubmit = true;
    this.createProfileFormGroup.markAllAsTouched();
    if(this.createProfileFormGroup.invalid) return;

    this.practiceService.createPractice(this.createProfileFormGroup.value).subscribe({
      next: (res) => {
        this.store.dispatch(clearCurrentUser());
        this.router.navigate(['/shared/baa']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
