import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IProvider } from 'src/app/core/models/provider.model';
import { PracticeService } from 'src/app/core/services/practice.service';
import { clearCurrentUser } from 'src/app/state/app.actions';

@Component({
  selector: 'app-practice-details',
  templateUrl: './practice-details.component.html',
  styleUrls: ['./practice-details.component.scss']
})
export class PracticeDetailsComponent implements OnInit {
  practiceDetailsFormGroup: FormGroup;
  formsubmit!: boolean;
  providers: IProvider[] = [];

  constructor(
    private practiceService: PracticeService,
    private router: Router,
    private store: Store
  ) {
    this.practiceDetailsFormGroup = new UntypedFormGroup({
      ownerFullname: new FormControl(null, Validators.required),
      ownerEmail: new FormControl(null, Validators.required),
      ownerPhone: new FormControl(null, Validators.required),
      NPI: new FormControl(null, Validators.required),
      dentalLicense: new FormControl(null, Validators.required),
      taxId: new FormControl(null, Validators.required),
      DEANumber: new FormControl(null, Validators.required),
      contactPersonSameAsOwner: new FormControl(),
      contactPerson: new FormGroup({
        fullName: new FormControl(null),
        email: new FormControl(null),
        phone: new FormControl(null),
        jobtitle: new FormControl(null)
      })
    });
  }

  ngOnInit(): void {
    this.getPracticeProviders();
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.practiceDetailsFormGroup.controls;
  }

  get contactPersonForm(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(this.practiceDetailsFormGroup.controls['contactPerson'] as FormGroup).controls;
  }

  private getPracticeProviders() {
    this.practiceService.getPracticeProviders().subscribe({
      next: (res) => {
        console.log(res);
        if(res && res.length) {
          this.providers = res;
        }
      }
    })
  }

  onSavePracticeDetails() {
    this.formsubmit = true;
    console.log(this.practiceDetailsFormGroup);
    this.practiceDetailsFormGroup.markAllAsTouched();
    if(this.practiceDetailsFormGroup.invalid) return;

    let { contactPersonSameAsOwner, ...formValue } = this.practiceDetailsFormGroup.value;

    if(contactPersonSameAsOwner) {
      formValue.contactPersonSameAsOwner = false;
    } else {
      formValue.contactPersonSameAsOwner = true;
      formValue.contactPerson = {};
    }

    this.practiceService.createOwner(formValue).subscribe({
      next: (res) => {
        this.store.dispatch(clearCurrentUser());
        this.router.navigate(['/shared/billing']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onAddNewProvider() {
    this.router.navigate(['/shared/public-directory'], { queryParams: { add: true }});
  }
}
