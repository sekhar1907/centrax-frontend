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
  selector: 'app-system-preferences-claims',
  templateUrl: './system-preferences-claims.component.html',
  styleUrls: ['./system-preferences-claims.component.scss'],
})
export class SystemPreferencesClaimsComponent {
  systemPreferencesClaimFormGroup: FormGroup;
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
    this.systemPreferencesClaimFormGroup = new UntypedFormGroup({
      defaultToBenefitsAssigned: new FormControl(false),
      defaultToReleaseInsuranceInfo: new FormControl(false),
      alwaysHoldSecondaryClains: new FormControl(false),
      defaulMedicalClaimAssignment: new FormControl(false),
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
      this.systemPreferencesClaimFormGroup.patchValue(
        practiceInfo.systemPreference
      );
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.systemPreferencesClaimFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.systemPreferencesClaimFormGroup.invalid) return;
    const practiceFormValue = this.systemPreferencesClaimFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      systemPreference: {
        ...this.practiceInfo.systemPreference,
        defaultToBenefitsAssigned: this.systemPreferencesClaimFormGroup.get(
          'defaultToBenefitsAssigned'
        ).value,
        defaultToReleaseInsuranceInfo: this.systemPreferencesClaimFormGroup.get(
          'defaultToReleaseInsuranceInfo'
        ).value,
        alwaysHoldSecondaryClains: this.systemPreferencesClaimFormGroup.get(
          'alwaysHoldSecondaryClains'
        ).value,
        defaulMedicalClaimAssignment: this.systemPreferencesClaimFormGroup.get(
          'defaulMedicalClaimAssignment'
        ).value,
      },
    };

    console.log('value 2 :', value);

    const saveSystemPrefValue = {
      defaultToBenefitsAssigned:
        (this.systemPreferencesClaimFormGroup.get('defaultToBenefitsAssigned')
          .value as boolean) || false,
      defaultToReleaseInsuranceInfo:
        (this.systemPreferencesClaimFormGroup.get(
          'defaultToReleaseInsuranceInfo'
        ).value as boolean) || false,
      alwaysHoldSecondaryClains:
        (this.systemPreferencesClaimFormGroup.get('alwaysHoldSecondaryClains')
          .value as boolean) || false,
      defaulMedicalClaimAssignment:
        (this.systemPreferencesClaimFormGroup.get(
          'defaulMedicalClaimAssignment'
        ).value as boolean) || false,

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
        this.router.navigate([`practice-manager/system-preference-account`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
