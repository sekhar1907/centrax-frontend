import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input-field',
  templateUrl: './form-input-field.component.html',
  styleUrls: ['./form-input-field.component.scss']
})
export class FormInputFieldComponent {
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() appearance: string;
  @Input() noBackground: boolean = true;
  @Input() isInValid: any;
  @Input() inputType: string = 'text';
  @Input() isRequired: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() floatingLabel: boolean = false;
}
