import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-field.component.scss']
})
export class FormDropdownFieldComponent {
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() valueField: string = '';
  @Input() textField: string = '';
  @Input() dropdownItems: any[] = [];
  @Input() appearance: string;
  @Input() layout: string = '';
  @Input() isInValid: any;
  @Input() isRequired: boolean = false;
  @Input() scrollHeight: string = '200px';
  @Input() appendTo: string;
  @Input() overlayDirection: string;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
}
