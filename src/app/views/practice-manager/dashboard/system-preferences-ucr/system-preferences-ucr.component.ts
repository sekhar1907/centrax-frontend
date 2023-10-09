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
  selector: 'app-system-preferences-ucr',
  templateUrl: './system-preferences-ucr.component.html',
  styleUrls: ['./system-preferences-ucr.component.scss'],
})
export class SystemPreferencesUcrComponent {
  systemPreferencesUcrFormGroup: FormGroup;
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
    this.systemPreferencesUcrFormGroup = new UntypedFormGroup({
      promptUCRUpdatesWhenPostingInsurancePayments: new FormControl(false),
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
      this.systemPreferencesUcrFormGroup.patchValue(
        practiceInfo.systemPreference
      );
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.systemPreferencesUcrFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.systemPreferencesUcrFormGroup.invalid) return;
    const practiceFormValue = this.systemPreferencesUcrFormGroup.value;

    console.log('practiceFormValue :', practiceFormValue);
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      systemPreference: {
        ...this.practiceInfo.systemPreference,
        promptUCRUpdatesWhenPostingInsurancePayments:
          (this.systemPreferencesUcrFormGroup.get(
            'promptUCRUpdatesWhenPostingInsurancePayments'
          ).value as boolean) || false,
      },
    };

    console.log('value 2 :', value);
    const saveSystemPrefValue = {
      promptUCRUpdatesWhenPostingInsurancePayments:
        (this.systemPreferencesUcrFormGroup.get(
          'promptUCRUpdatesWhenPostingInsurancePayments'
        ).value as boolean) || false,
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
      defaulProvider:
        value.systemPreference.defaulProvider !== undefined
          ? value.systemPreference.defaulProvider
          : '',
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
      feeSchedule:
        value.systemPreference.feeSchedule !== undefined
          ? value.systemPreference.feeSchedule
          : '',
      sendStatement:
        value.systemPreference.sendStatement !== undefined
          ? value.systemPreference.sendStatement
          : '',
      financeCharges:
        value.systemPreference.financeCharges !== undefined
          ? value.systemPreference.financeCharges
          : '',
      collectionMessages:
        value.systemPreference.collectionMessages !== undefined
          ? value.systemPreference.collectionMessages
          : '',
      printStatementEstimates:
        value.systemPreference.printStatementEstimates !== undefined
          ? value.systemPreference.printStatementEstimates
          : '',
      hideAccountsYearsOlderThan:
        value.systemPreference.hideAccountsYearsOlderThan !== undefined
          ? value.systemPreference.hideAccountsYearsOlderThan
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
        this.router.navigate([`practice-manager/system-preference-cutoff`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
