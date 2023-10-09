import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface RadioFieldItem {
  text: string;
  value: any;
}

@Component({
  selector: 'app-form-radio-field',
  templateUrl: './form-radio-field.component.html',
  styleUrls: ['./form-radio-field.component.scss']
})
export class FormRadioFieldComponent {
  @Input() items: RadioFieldItem[] = [];
  @Input() control!: FormControl;
  @Input() isVertical: boolean = false;
  @Input() checkboxAppearance: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputIDPrefix: string = '';
}
