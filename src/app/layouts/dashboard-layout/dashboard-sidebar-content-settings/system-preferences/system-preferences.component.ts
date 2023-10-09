import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-system-preferences',
  templateUrl: './system-preferences.component.html',
  styleUrls: ['./system-preferences.component.scss']
})
export class SystemPreferencesComponent implements OnInit {
  systemPreferenceForm: FormGroup;
  @Input() systemPreference: any;
  @Output() reFreshConfigData = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private SettingsService: SettingsService) {
    this.createForm();
  }

  ngOnInit() {
    const { 
      general: { 
          showPopupReminder, changePasswordHowManyDays, usePermanentDentitionOlderThan
      },
      claim: {
        defaultToBenefitsAssigned,
        defaultToReleaseInsuranceInfo,
        alwaysHoldSecondaryClains,
        defaulMedicalClaimAssignment
      },
      ledger:{
        onlyShowTransactionsAfter
      },
      newAccount:{
        defaulProvider,
        feeSchedule,
        sendStatement,
        financeCharges,
        collectionMessages,
        printStatementEstimates,
        hideAccountsYearsOlderThan,
        defaultRecallMonthInterval,
        recallMethod,
        autoCreateRecall
      },
      ucr:{
          promptUCRUpdatesWhenPostingInsurancePayments
      }
     } = this.systemPreference;
     let systemPreference:any = {};
     systemPreference.showPopupReminder = showPopupReminder;
     systemPreference.changePasswordHowManyDays = changePasswordHowManyDays;
     systemPreference.usePermanentDentitionOlderThan = usePermanentDentitionOlderThan;
     systemPreference.defaultToBenefitsAssigned = defaultToBenefitsAssigned;
     systemPreference.defaultToReleaseInsuranceInfo = defaultToReleaseInsuranceInfo;
     systemPreference.alwaysHoldSecondaryClains = alwaysHoldSecondaryClains;
     systemPreference.defaulMedicalClaimAssignment = defaulMedicalClaimAssignment;
     systemPreference.onlyShowTransactionsAfter = formatDate(onlyShowTransactionsAfter,'yyyy-MM-dd','en');
     systemPreference.defaulProvider = defaulProvider;
     systemPreference.feeSchedule = feeSchedule;
     systemPreference.sendStatement = sendStatement;
     systemPreference.financeCharges = financeCharges;
     systemPreference.collectionMessages = collectionMessages;
     systemPreference.printStatementEstimates = printStatementEstimates;
     systemPreference.hideAccountsYearsOlderThan = hideAccountsYearsOlderThan;
     systemPreference.defaultRecallMonthInterval = defaultRecallMonthInterval;
     systemPreference.recallMethod = recallMethod;
     systemPreference.autoCreateRecall = autoCreateRecall;
     systemPreference.promptUCRUpdatesWhenPostingInsurancePayments = promptUCRUpdatesWhenPostingInsurancePayments;
     this.systemPreferenceForm.patchValue(systemPreference);
  }
  createForm() {
    this.systemPreferenceForm = this.fb.group({
      defaulProvider: ['', Validators.required],
      showPopupReminder: ['', Validators.required],
      changePasswordHowManyDays: ['', Validators.required],
      usePermanentDentitionOlderThan: ['', Validators.required],
      defaultToBenefitsAssigned: ['', Validators.required],
      defaultToReleaseInsuranceInfo: ['', Validators.required],
      alwaysHoldSecondaryClains: ['', Validators.required],
      defaulMedicalClaimAssignment: ['', Validators.required],
      feeSchedule: ['', Validators.required],
      sendStatement: ['', Validators.required],
      financeCharges: ['', Validators.required],
      collectionMessages: ['', Validators.required],
      printStatementEstimates: ['', Validators.required],
      hideAccountsYearsOlderThan: ['', Validators.required],
      defaultRecallMonthInterval: ['', Validators.required],
      recallMethod: ['', Validators.required],
      autoCreateRecall: ['', Validators.required],
      promptUCRUpdatesWhenPostingInsurancePayments: ['', Validators.required],
      onlyShowTransactionsAfter: ['', Validators.required]
    }, { validators: this.checkDateRange('onlyShowTransactionsAfter') });
  }
  
  /**
  * Returns form
  */
  get form() {
    return this.systemPreferenceForm.controls;
  }

  checkDateRange(value:any) {
    return (group: any) => {
      const transactionsAfter = group.controls[value];

      var monthfield = transactionsAfter.value.split('-')[2]; //12
      var dayfield = transactionsAfter.value.split('-')[1]; //08
      var yearfield = transactionsAfter.value.split('-')[0]; //2012
      var inputDate = new Date(yearfield, monthfield - 1, dayfield);
      var today = new Date();   
      
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      var endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + 12);
      if(inputDate > today && inputDate < endDate) {
        return transactionsAfter.setErrors({notEquivalent: true});
      } else {
        transactionsAfter.setErrors(null);
      }
    };
  }

  updateSystemPreference() {
    this.SettingsService.updateSystemPreference(this.systemPreferenceForm.value).subscribe({
      next: (res: any) => {
        if(!res.error) {
          // this.systemPreferenceForm.reset();
          this.reFreshConfigData.emit();
          Swal.fire({
            title: `${res?.message}`,
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: `Operation failed!`,
            icon: 'error',
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
