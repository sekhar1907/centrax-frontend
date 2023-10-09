import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-practice-information',
  templateUrl: './practice-information.component.html',
  styleUrls: ['./practice-information.component.scss']
})
export class PracticeInformationComponent implements OnInit {
  @Input() practice: any;
  @Output() reFreshConfigData = new EventEmitter<any>();
  practiceInformationForm: FormGroup;
  constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    this.createForm();
  }

  ngOnInit() {
    this.practiceInformationForm.patchValue(this.practice);
  }

  createForm() {
    this.practiceInformationForm = this.fb.group({
      // name: ['', Validators.toString],
      // email: ['', Validators.toString],
      // phone: ['', Validators.toString],
      NPI: ['', Validators.required],
      dentalLicense: ['', Validators.required],
      taxId: ['', Validators.required],
      DEANumber: ['', Validators.required]
    });
  }

  createPracticeInformation() {
    this.settingsService.createPracticeInformation(this.practiceInformationForm.value).subscribe({
      next: (res) => {
        if(!res.error) {
          // this.practiceInformationForm.reset();
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
