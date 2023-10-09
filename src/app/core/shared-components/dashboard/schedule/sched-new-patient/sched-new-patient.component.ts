import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sched-new-patient',
  templateUrl: './sched-new-patient.component.html',
  styleUrls: ['./sched-new-patient.component.scss']
})
export class SchedNewPatientComponent {
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
