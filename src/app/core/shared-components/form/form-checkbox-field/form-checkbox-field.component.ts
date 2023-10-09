import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-checkbox-field',
  templateUrl: './form-checkbox-field.component.html',
  styleUrls: ['./form-checkbox-field.component.scss']
})
export class FormCheckboxFieldComponent {
  @Input() noLabel: boolean = false;
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() rightLabel: boolean = true;
  @Input() selectPrefix: string = '';
}
