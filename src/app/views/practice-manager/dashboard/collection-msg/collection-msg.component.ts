import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-collection-msg',
  templateUrl: './collection-msg.component.html',
  styleUrls: ['./collection-msg.component.scss'],
})
export class CollectionMsgComponent {
  collectionMsgFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store,
    private PracticeManagerService: PracticeManagerService,
    public sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.collectionMsgFormGroup = new UntypedFormGroup({
      days60: new FormControl(null),
      days90: new FormControl(null),
      days120: new FormControl(null),
    });

    this.PracticeManagerService.getSoftwareConfig().subscribe({
      next: (res: ISoftwareConfig) => {
        this.initPatientInfoForm(res);
      },
      error: (error) => {
        if (this.sessionStorageService.get('practice-detail-data')) {
          const data = this.sessionStorageService.get('practice-detail-data');
          this.initPatientInfoForm(data);
        }
      },
    });
  }

  private initPatientInfoForm(practiceInfo?: any) {
    console.log('practiceInfo :', practiceInfo);

    if (practiceInfo) {
      this.practiceInfo = practiceInfo;

      this.collectionMsgFormGroup.patchValue(practiceInfo.collectionMessageInsurance);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.collectionMsgFormGroup.controls;
  }

  onSave() {
    this.formsubmit = true;
    if (this.collectionMsgFormGroup.invalid) return;
    const practiceFormValue = this.collectionMsgFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      collectionMessage: practiceValue,
    };
    value.collectionMessage = {};
    value.collectionMessage = {
      days60: this.collectionMsgFormGroup.get('days60').value,
      days90: this.collectionMsgFormGroup.get('days90').value,
      days120: this.collectionMsgFormGroup.get('days120').value,
    };
    console.log('value 2 :', value);
    const saveCollectionMessage = {
      days60: this.collectionMsgFormGroup.get('days60').value || '',
      days90: this.collectionMsgFormGroup.get('days90').value || '',
      days120:
        this.collectionMsgFormGroup.get('days120').value.toString() || '',
    };

    this.sessionStorageService.set('practice-detail-data', value);
    this.PracticeManagerService.createCollectionMessagesIns(
      saveCollectionMessage
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([
          `practice-manager/collection-messages-non-insurance`,
        ]);
      },
      error: (error) => {
        console.log(error);
      },
    });
    // console.log("practiceFormValuepracticeFormValue :", practiceFormValue)
    // console.log("practiceInfo: any; :",this.practiceInfo)
  }
}
