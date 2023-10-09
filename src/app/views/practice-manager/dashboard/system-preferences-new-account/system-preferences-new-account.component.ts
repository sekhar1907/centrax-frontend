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
  selector: 'app-system-preferences-new-account',
  templateUrl: './system-preferences-new-account.component.html',
  styleUrls: ['./system-preferences-new-account.component.scss'],
})
export class SystemPreferencesNewAccountComponent {
  systemPreferencesAccountFormGroup: FormGroup;
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
    this.systemPreferencesAccountFormGroup = new UntypedFormGroup({
      defaulProvider: new FormControl(null),
      feeSchedule: new FormControl(null),
      sendStatement: new FormControl(false),
      financeCharges: new FormControl(false),
      collectionMessages: new FormControl(false),
      printStatementEstimates: new FormControl(false),
      hideAccountsYearsOlderThan: new FormControl(null),
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
      this.systemPreferencesAccountFormGroup.patchValue(
        practiceInfo.systemPreference
      );
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.systemPreferencesAccountFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.systemPreferencesAccountFormGroup.invalid) return;
    const practiceFormValue = this.systemPreferencesAccountFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      systemPreference: {
        ...this.practiceInfo.systemPreference,
        defaulProvider:
          Number(
            this.systemPreferencesAccountFormGroup.get('defaulProvider').value
          ) || 0,
        feeSchedule:
          this.systemPreferencesAccountFormGroup.get('feeSchedule').value,
        sendStatement:
          (this.systemPreferencesAccountFormGroup.get('sendStatement')
            .value as boolean) || false,
        financeCharges:
          (this.systemPreferencesAccountFormGroup.get('financeCharges')
            .value as boolean) || false,
        collectionMessages:
          (this.systemPreferencesAccountFormGroup.get('collectionMessages')
            .value as boolean) || false,
        printStatementEstimates:
          (this.systemPreferencesAccountFormGroup.get('printStatementEstimates')
            .value as boolean) || false,
        hideAccountsYearsOlderThan:
          Number(
            this.systemPreferencesAccountFormGroup.get(
              'hideAccountsYearsOlderThan'
            ).value
          ) || 0,
      },
    };

    console.log('value 2 :', value);
    const saveSystemPrefValue = {
      defaulProvider:
        Number(
          this.systemPreferencesAccountFormGroup.get('defaulProvider').value
        ) || 0,
      feeSchedule:
        this.systemPreferencesAccountFormGroup.get('feeSchedule').value,
      sendStatement:
        (this.systemPreferencesAccountFormGroup.get('sendStatement')
          .value as boolean) || false,
      financeCharges:
        (this.systemPreferencesAccountFormGroup.get('financeCharges')
          .value as boolean) || false,
      collectionMessages:
        (this.systemPreferencesAccountFormGroup.get('collectionMessages')
          .value as boolean) || false,
      printStatementEstimates:
        (this.systemPreferencesAccountFormGroup.get('printStatementEstimates')
          .value as boolean) || false,
      hideAccountsYearsOlderThan:
        Number(
          this.systemPreferencesAccountFormGroup.get(
            'hideAccountsYearsOlderThan'
          ).value
        ) || 0,
      showPopupReminder:
        value.systemPreference.showPopupReminder !== undefined
          ? value.systemPreference.showPopupReminder
          : '',
      changePasswordHowManyDays:
        value.systemPreference.changePasswordHowManyDays !== undefined
          ? value.systemPreference.changePasswordHowManyDays
          : '',
      usePermanentDentitionOlderThan:
        value.systemPreference.usePermanentDentitionOlderThan !== undefined
          ? value.systemPreference.usePermanentDentitionOlderThan
          : '',
      defaultToBenefitsAssigned:
        value.systemPreference.defaultToBenefitsAssigned !== undefined
          ? value.systemPreference.defaultToBenefitsAssigned
          : '',
      defaultToReleaseInsuranceInfo:
        value.systemPreference.defaultToReleaseInsuranceInfo !== undefined
          ? value.systemPreference.defaultToReleaseInsuranceInfo
          : '',
      alwaysHoldSecondaryClains:
        value.systemPreference.alwaysHoldSecondaryClains !== undefined
          ? value.systemPreference.alwaysHoldSecondaryClains
          : '',
      defaulMedicalClaimAssignment:
        value.systemPreference.defaulMedicalClaimAssignment !== undefined
          ? value.systemPreference.defaulMedicalClaimAssignment
          : '',
      defaultRecallMonthInterval:
        value.systemPreference.defaultRecallMonthInterval !== undefined
          ? value.systemPreference.defaultRecallMonthInterval
          : '',
      recallMethod:
        value.systemPreference.recallMethod !== undefined
          ? value.systemPreference.recallMethod
          : '',
      autoCreateRecall:
        value.systemPreference.autoCreateRecall !== undefined
          ? value.systemPreference.autoCreateRecall
          : '',
      promptUCRUpdatesWhenPostingInsurancePayments:
        value.systemPreference.promptUCRUpdatesWhenPostingInsurancePayments !==
        undefined
          ? value.systemPreference.promptUCRUpdatesWhenPostingInsurancePayments
          : '',
      onlyShowTransactionsAfter:
        value.systemPreference.onlyShowTransactionsAfter !== undefined
          ? value.systemPreference.onlyShowTransactionsAfter
          : '',
    };

    console.log('saveSystemPrefValue :', saveSystemPrefValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.updateSystemPreference(
      saveSystemPrefValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/system-preference-recall`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
