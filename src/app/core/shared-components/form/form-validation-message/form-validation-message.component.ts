import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ErrorFieldItem {
  errorMessage: string;
  fieldId?: string;
}

@Component({
  selector: 'form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.scss']
})
export class FormValidationMessageComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() errorItems: ErrorFieldItem[] = [];
  @Input() submitted: boolean = false;

  errorSubs: Subscription;

  ngOnInit(): void {
    this.errorSubs = this.formGroup.statusChanges.subscribe(changes => this.getFormValidationErrors());
  }

  onErrorFieldClick(errorItem: ErrorFieldItem) {
    let el = document.getElementById(errorItem.fieldId);
    el.scrollIntoView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['submitted']?.currentValue) {
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    this.errorItems = [];
    Object.keys(this.formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          let errorMessage = '';
          if(keyError === 'required') errorMessage = `Enter "${key}"`;
          else errorMessage = `Enter valid "${key}"`;

          this.errorItems.push({
            errorMessage: errorMessage
          })
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSubs.unsubscribe();
  }
}
