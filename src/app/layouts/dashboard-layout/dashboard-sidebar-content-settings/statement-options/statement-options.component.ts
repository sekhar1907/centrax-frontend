import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-statement-options',
  templateUrl: './statement-options.component.html',
  styleUrls: ['./statement-options.component.scss']
})
export class StatementOptionsComponent implements OnInit {
  @Input() statementOption: any;
  @Output() reFreshConfigData = new EventEmitter<any>();
  statementOptionsForm: FormGroup;
  constructor(private fb: FormBuilder, private SettingsService: SettingsService) {
    this.createForm();
  }
  ngOnInit() {
    this.statementOptionsForm.patchValue(this.statementOption);
  }
  createForm() {
    this.statementOptionsForm = this.fb.group({
      insurance: ['', Validators.required],
      nonInsurance: ['', Validators.required],
      financialArrangment: ['', Validators.required],
      quickStatement: ['', Validators.required],
      financeCharge: ['', Validators.required],
    });
  }

  createStatementOptions() {
    this.SettingsService.createStatementOptions(this.statementOptionsForm.value).subscribe({
      next: (res) => {
        if(!res.error) {
          // this.statementOptionsForm.reset();
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
      error: (e) => {
        console.log(e);
      }
    });
  }
  
}
