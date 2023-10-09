import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-contact-persone',
  templateUrl: './contact-persone.component.html',
  styleUrls: ['./contact-persone.component.scss'],
})
export class ContactPersoneComponent {
  practiceDetailsFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store,
    private PracticeManagerService: PracticeManagerService,
    public sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.practiceDetailsFormGroup = new UntypedFormGroup({
      cfullname: new FormControl(null),
      cemail: new FormControl(null, Validators.email),
      cphone: new FormControl(null),
      cjobTitle: new FormControl(null),
    });

    this.PracticeManagerService.getSoftwareConfig().subscribe({
      next: (res: ISoftwareConfig) => {
        this.initPatientInfoForm(res);
      },
      error: (error) => {
        if (this.sessionStorageService.get('practice-detail-data')) {
          const data = this.sessionStorageService.get('practice-detail-data');
          this.initPatientInfoForm(data);
        }
      },
    });
  }

  private initPatientInfoForm(practiceInfo?: any) {
    console.log('practiceInfo :', practiceInfo);

    if (practiceInfo) {
      this.practiceInfo = practiceInfo;

      this.practiceDetailsFormGroup.patchValue({
        cfullname: practiceInfo.contactPerson?.fullname,
        cemail: practiceInfo.contactPerson?.email,
        cphone: practiceInfo.contactPerson?.phone,
        cjobTitle: practiceInfo.contactPerson?.jobTitle,
      });
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.practiceDetailsFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    console.log('value 2 :', this.practiceDetailsFormGroup);
    if (this.practiceDetailsFormGroup.invalid) return;
    const practiceFormValue = this.practiceDetailsFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      contactPerson: practiceValue,
    };
    value.contactPerson = {};
    value.contactPerson = {
      cfullname: this.practiceDetailsFormGroup.get('cfullname').value,
      cemail: this.practiceDetailsFormGroup.get('cemail').value,
      cphone: this.practiceDetailsFormGroup.get('cphone').value.toString(),
      cjobTitle: this.practiceDetailsFormGroup.get('cjobTitle').value,
    };

    const contactPersonValue = {
      fullname: this.practiceDetailsFormGroup.get('cfullname').value || "",
      email: this.practiceDetailsFormGroup.get('cemail').value || "",
      phone: this.practiceDetailsFormGroup.get('cphone').value.toString() || "",
      jobTitle: this.practiceDetailsFormGroup.get('cjobTitle').value || "",
    };
    console.log('value 2 :', value);

    this.sessionStorageService.set('practice-detail-data', value);
    this.PracticeManagerService.createContactPerson(
      contactPersonValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/practice-info`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
