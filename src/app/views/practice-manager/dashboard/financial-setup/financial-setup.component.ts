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
  selector: 'app-financial-setup',
  templateUrl: './financial-setup.component.html',
  styleUrls: ['./financial-setup.component.scss'],
})
export class FinancialSetupComponent {
  financialSetupFormGroup: FormGroup;
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
    this.financialSetupFormGroup = new UntypedFormGroup({
      financialCharge: new FormControl(false),
      annualInterestPercent: new FormControl(null),
      minimumFinanceCharge: new FormControl(null),
      rebillFreeAmount: new FormControl(null),
      minimumBalanceToIncur: new FormControl(null),
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

      this.financialSetupFormGroup.patchValue(practiceInfo.financialSetup);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.financialSetupFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.financialSetupFormGroup.invalid) return;
    const practiceFormValue = this.financialSetupFormGroup.value;

    console.log('practiceFormValue :', practiceFormValue);
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      financialSetup: practiceValue,
    };
    value.financialSetup = {};
    value.financialSetup = {
      financialCharge:
        this.financialSetupFormGroup.get('financialCharge').value,
      annualInterestPercent: this.financialSetupFormGroup.get(
        'annualInterestPercent'
      ).value,
      minimumFinanceCharge:
        this.financialSetupFormGroup
          .get('minimumFinanceCharge')
          .value.toString() || '',
      rebillFreeAmount:
        this.financialSetupFormGroup.get('rebillFreeAmount').value,
      minimumBalanceToIncur:
        this.financialSetupFormGroup
          .get('minimumBalanceToIncur')
          .value.toString() || '',
    };
    console.log('value 2 :', value);
    const saveFinancialSetupValue = {
      financialCharge:
        this.financialSetupFormGroup.get('financialCharge').value,
      annualInterestPercent: this.financialSetupFormGroup.get(
        'annualInterestPercent'
      ).value,
      minimumFinanceCharge:
        this.financialSetupFormGroup
          .get('minimumFinanceCharge')
          .value.toString() || '',
      rebillFreeAmount:
        this.financialSetupFormGroup.get('rebillFreeAmount').value,
      minimumBalanceToIncur:
        this.financialSetupFormGroup
          .get('minimumBalanceToIncur')
          .value.toString() || '',
    };

    console.log('saveFinancialSetupValue :', saveFinancialSetupValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createFinancialSetup(
      saveFinancialSetupValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/statement-options`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
