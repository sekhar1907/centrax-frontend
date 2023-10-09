import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-financial-setup',
  templateUrl: './financial-setup.component.html',
  styleUrls: ['./financial-setup.component.scss']
})
export class FinancialSetupComponent implements OnInit {
  @Input() financialSetup: any;
  @Output() reFreshConfigData = new EventEmitter<any>();
  financialSetupForm: FormGroup;
  constructor(private fb: FormBuilder, private SettingsService: SettingsService) {
    this.createForm();
  }
  createForm() {
    this.financialSetupForm = this.fb.group({
      financialCharge: ['', Validators.required],
      annualInterestPercent: [{value: 0, disabled: true}, Validators.required],
      minimumFinanceCharge: [{value: '', disabled: true}, Validators.required],
      rebillFreeAmount: [{value: 0, disabled: false}, Validators.required],
      minimumBalanceToIncur: [{value: '', disabled: false}, Validators.required]
    });
  }

  financialChargeToggle(financialChargeType:string){

    if(financialChargeType == 'interest'){
      
      this.financialSetupForm.get('annualInterestPercent').enable();
      this.financialSetupForm.get('minimumFinanceCharge').enable();
      
      // this.financialSetupForm.get('rebillFreeAmount').setValue(0);
      // this.financialSetupForm.get('minimumBalanceToIncur').setValue('');
      this.financialSetupForm.get('rebillFreeAmount').disable();
      this.financialSetupForm.get('minimumBalanceToIncur').disable();

    } else {
      this.financialSetupForm.get('rebillFreeAmount').enable();
      this.financialSetupForm.get('minimumBalanceToIncur').enable();

      // this.financialSetupForm.get('annualInterestPercent').setValue(0);
      // this.financialSetupForm.get('minimumFinanceCharge').setValue('');
      this.financialSetupForm.get('annualInterestPercent').disable();
      this.financialSetupForm.get('minimumFinanceCharge').disable();
    }

  }
  
  ngOnInit() {
    console.log(this.financialSetup);
    this.financialSetupForm.patchValue(this.financialSetup);
  }

  createFinancialSetup() {
    this.SettingsService.createFinancialSetup(this.financialSetupForm.value).subscribe({
      next: (res) => {
        if(!res.error) {
          // this.financialSetupForm.reset();
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
      error: () => {}
    });
  }
}
