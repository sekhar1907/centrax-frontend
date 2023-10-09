import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() statementOption: any;
  @Output() reFreshConfigData = new EventEmitter<any>();
  statementOptionsForm: FormGroup;
  constructor(private fb: FormBuilder, private SettingsService: SettingsService) {
    this.createForm();
  }
  ngOnInit() {
    this.statementOptionsForm.patchValue(this.statementOption);
  }
  createForm() {
    this.statementOptionsForm = this.fb.group({
      categoryType: ['', Validators.required],
    });
  }

  createCategoryType() {
    this.SettingsService.createStatementOptions(this.statementOptionsForm.value).subscribe({
      next: (res) => {
        // this.statementOptionsForm.reset();
        this.reFreshConfigData.emit();
      },
      error: () => {}
    });
  }
  
}
