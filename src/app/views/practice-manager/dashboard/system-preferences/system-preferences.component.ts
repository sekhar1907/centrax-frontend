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
import { removeNullAndEmptyValues } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-system-preferences',
  templateUrl: './system-preferences.component.html',
  styleUrls: ['./system-preferences.component.scss'],
})
export class SystemPreferencesComponent {
  systemPreferencesFormGroup: FormGroup;
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
    this.systemPreferencesFormGroup = new UntypedFormGroup({
      showPopupReminder: new FormControl(false),
      changePasswordHowManyDays: new FormControl(null),
      usePermanentDentitionOlderThan: new FormControl(null),
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
      this.systemPreferencesFormGroup.patchValue(practiceInfo.systemPreference);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.systemPreferencesFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.systemPreferencesFormGroup.invalid) return;
    const practiceFormValue = this.systemPreferencesFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      systemPreference: practiceValue,
    };
    value.systemPreference = {};
    value.systemPreference = {
      showPopupReminder:
        (this.systemPreferencesFormGroup.get('showPopupReminder')
          .value as boolean) || false,
      changePasswordHowManyDays:
        Number(
          this.systemPreferencesFormGroup.get('changePasswordHowManyDays').value
        ) || 0,
      usePermanentDentitionOlderThan:
        Number(
          this.systemPreferencesFormGroup.get('usePermanentDentitionOlderThan')
            .value
        ) || 0,
    };
    console.log('value 2 :', value);

    const saveSystemPrefValue = {
      showPopupReminder:
        (this.systemPreferencesFormGroup.get('showPopupReminder')
          .value as boolean) || false,
      changePasswordHowManyDays:
        Number(
          this.systemPreferencesFormGroup.get('changePasswordHowManyDays').value
        ) || 0,
      usePermanentDentitionOlderThan:
        Number(
          this.systemPreferencesFormGroup.get('usePermanentDentitionOlderThan')
            .value
        ) || 0,

      defaulProvider:
        value.systemPreference.defaulProvider !== undefined
          ? value.systemPreference.defaulProvider
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
      removeNullAndEmptyValues(saveSystemPrefValue)
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/system-preference-claims`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
