import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
@Component({
  selector: 'app-system-preferences-cutoff',
  templateUrl: './system-preferences-cutoff.component.html',
  styleUrls: ['./system-preferences-cutoff.component.scss'],
})
export class SystemPreferencesCutoffComponent {
  // @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();

  // onDateSelected(date: string) {
  //   this.dateSelected.emit(date);
  // }

  systemPreferencesCuttOffFormGroup: FormGroup;
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
    this.systemPreferencesCuttOffFormGroup = new UntypedFormGroup({
      onlyShowTransactionsAfter: new FormControl(''),
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

  onDateSelected(date: string) {
    console.log('Selected date:', date);
    // Perform any further actions with the selected date
  }
  private initPatientInfoForm(practiceInfo?: any) {
    if (practiceInfo) {
      practiceInfo.systemPreference.onlyShowTransactionsAfter = practiceInfo.systemPreference?.onlyShowTransactionsAfter ? moment(practiceInfo.systemPreference?.onlyShowTransactionsAfter).format('MM/DD/yyyy') : ''
    this.practiceInfo = practiceInfo;
      this.systemPreferencesCuttOffFormGroup.patchValue(
        practiceInfo.systemPreference
      );
    console.log('practiceInfo :', this.systemPreferencesCuttOffFormGroup.value);
  }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.systemPreferencesCuttOffFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.systemPreferencesCuttOffFormGroup.invalid) return;
    const practiceFormValue = this.systemPreferencesCuttOffFormGroup.value;

    console.log('practiceFormValue :', practiceFormValue);
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      systemPreference: {
        ...this.practiceInfo.systemPreference,
        onlyShowTransactionsAfter: this.systemPreferencesCuttOffFormGroup.get(
          'onlyShowTransactionsAfter'
        ).value,
      },
    };

    console.log('value 2 :', value);
    const saveSystemPrefValue = {
      onlyShowTransactionsAfter: this.systemPreferencesCuttOffFormGroup.get(
        'onlyShowTransactionsAfter'
      ).value,
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
      promptUCRUpdatesWhenPostingInsurancePayments:
        value.systemPreference.promptUCRUpdatesWhenPostingInsurancePayments !==
        undefined
          ? value.systemPreference.promptUCRUpdatesWhenPostingInsurancePayments
          : '',
    };

    console.log('saveSystemPrefValue :', saveSystemPrefValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.updateSystemPreference(
      saveSystemPrefValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/half-way-done`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
