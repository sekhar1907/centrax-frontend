import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-collection-messages',
  templateUrl: './collection-messages.component.html',
  styleUrls: ['./collection-messages.component.scss']
})
export class CollectionMessagesComponent implements OnInit {
  @Input() collectionMessage: any;
  @Output() reFreshConfigData = new EventEmitter<any>();

  collectionMessagesForm: FormGroup;
  constructor(private fb: FormBuilder, private SettingsService: SettingsService) {
    this.createForm();
  }

  ngOnInit() {
    this.collectionMessagesForm.patchValue(this.collectionMessage);
  }

  createForm() {
    this.collectionMessagesForm = this.fb.group({
      days60: ['', Validators.required],
      days90: ['', Validators.required],
      days120: ['', Validators.required]
    });
  }

  createCollectionMessage() {
    this.SettingsService.createCollectionMessage(this.collectionMessagesForm.value).subscribe({
      next: (res) => {
        if(!res.error) {
          // this.collectionMessagesForm.reset();
          this.reFreshConfigData.emit();
          Swal.fire({
            title: `${res?.message}`,
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: `Operation failed!`,
            icon: 'error',
          });
        }
      },
      error: () => {}
    });
  }
}