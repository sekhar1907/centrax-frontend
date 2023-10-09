import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-sign-section',
  templateUrl: './form-sign-section.component.html',
  styleUrls: ['./form-sign-section.component.scss']
})
export class FormSignSectionComponent {
  @Input() signControl!: FormControl;
  @Input() signDateControl!: FormControl;

}
