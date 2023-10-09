import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-masked-input-field',
  templateUrl: './form-masked-input-field.component.html',
  styleUrls: ['./form-masked-input-field.component.scss']
})
export class FormMaskedInputFieldComponent {
  @Input() labelText: string = '';
  @Input() labelTextSecondary: string = '';
  @Input() control!: FormControl;
  @Input() mask: string = '';
  @Input() showMaskTyped: boolean = true;
  @Input() dropSpecialCharacters: boolean = false;
  @Input() appearance: string;
  @Input() slotChar: string;
  @Input() placeholder: string;
  @Input() floatingLabel: boolean = false;
  @Input() isInvalid: boolean = false;
  @Input() isHorizontal: boolean = true;
}
