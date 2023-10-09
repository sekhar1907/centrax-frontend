import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sched-patient-info-gen-info',
  templateUrl: './sched-patient-info-gen-info.component.html',
  styleUrls: ['./sched-patient-info-gen-info.component.scss']
})
export class SchedPatientInfoGenInfoComponent {
  generalInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.generalInfoForm = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      phone: [null],
      email: [null],
      altPhone: [null],
      maritalStatus: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      sex: [null],
      pronouns: [null],
      gender: [null],
      emergencyContact: [null],
      emergencyContactPhone: [null],
      emergencyContactRelationship: [null],
    })
  }
}
