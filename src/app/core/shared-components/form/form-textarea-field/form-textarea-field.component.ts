import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-textarea-field',
  templateUrl: './form-textarea-field.component.html',
  styleUrls: ['./form-textarea-field.component.scss']
})
export class FormTextareaFieldComponent {
  @Input() noLabel: boolean = false;
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() cols = 30;
  @Input() rows = 3;
  @Input() appearance: string = '';
}
