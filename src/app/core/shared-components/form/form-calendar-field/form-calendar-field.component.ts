import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-calendar-field',
  templateUrl: './form-calendar-field.component.html',
  styleUrls: ['./form-calendar-field.component.scss']
})
export class FormCalendarFieldComponent {
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() appearance: string;
  @Input() noBackground: boolean = true;
  @Input() isInValid: any;
  @Input() isRequired: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() appendTo: string = '';
  @Input() showClear: boolean = true;
  @Input() timeOnly: boolean = false;
  @Input() panelStyleClass: string = '';
  @Input() showIcon: boolean = false;
}
