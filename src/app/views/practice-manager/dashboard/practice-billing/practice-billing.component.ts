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
  selector: 'app-practice-billing',
  templateUrl: './practice-billing.component.html',
  styleUrls: ['./practice-billing.component.scss'],
})
export class PracticeBillingComponent {
  practiceBillingFormGroup: FormGroup;
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
    this.practiceBillingFormGroup = new UntypedFormGroup({
      changeHealthCare: new FormControl(false),
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
      this.practiceBillingFormGroup.patchValue(practiceInfo.practiceBilling);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.practiceBillingFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.practiceBillingFormGroup.invalid) return;
    const practiceFormValue = this.practiceBillingFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      practice: {
        ...this.practiceInfo?.practice,
        changeHealthCare:
          this.practiceBillingFormGroup.get('changeHealthCare').value,
      },
    };

    console.log('value 2 :', value);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createPracticeBilling(
      practiceFormValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/all-done`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
