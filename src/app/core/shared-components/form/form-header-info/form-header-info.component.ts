import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-header-info',
  templateUrl: './form-header-info.component.html',
  styleUrls: ['./form-header-info.component.scss']
})
export class FormHeaderInfoComponent {
  @Input() providerName: string = '';
  @Input() practiceName: string = '';
  @Input() practicePhoneNumber: string = '';
  @Input() practiceAddress: string = '';
  @Input() patientName: string = '';
  @Input() patientBirthdate: string = '';
  @Input() entryDate: string = '';
}
