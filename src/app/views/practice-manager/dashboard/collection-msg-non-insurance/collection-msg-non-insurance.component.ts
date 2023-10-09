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
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
@Component({
  selector: 'app-collection-msg-non-insurance',
  templateUrl: './collection-msg-non-insurance.component.html',
  styleUrls: ['./collection-msg-non-insurance.component.scss'],
})
export class CollectionMsgNonInsuranceComponent {
  collectionMsgNonFormGroup: FormGroup;
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
    this.collectionMsgNonFormGroup = new UntypedFormGroup({
      days60Non: new FormControl(null),
      days90Non: new FormControl(null),
      days120Non: new FormControl(null),
    });

    if (this.sessionStorageService.get('practice-detail-data')) {
      const data = this.sessionStorageService.get('practice-detail-data');
      this.initPatientInfoForm(data);
    }
  }

  private initPatientInfoForm(practiceInfo?: any) {
    console.log('practiceInfo :', practiceInfo);

    if (practiceInfo) {
      this.practiceInfo = practiceInfo;

      this.collectionMsgNonFormGroup.patchValue(practiceInfo.collectionMessageNonInsurance);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.collectionMsgNonFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.collectionMsgNonFormGroup.invalid) return;
    const practiceFormValue = this.collectionMsgNonFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      collectionMessageNonIns: practiceValue,
    };
    value.collectionMessageNonIns = {};
    value.collectionMessageNonIns = {
      days60Non: this.collectionMsgNonFormGroup.get('days60Non').value,
      days90Non: this.collectionMsgNonFormGroup.get('days90Non').value,
      days120Non: this.collectionMsgNonFormGroup.get('days120Non').value,
    };
    console.log('value 2 :', value);

    const saveCollectionMessageNonIns = {
      days60Non: this.collectionMsgNonFormGroup.get('days60Non').value || '',
      days90Non: this.collectionMsgNonFormGroup.get('days90Non').value || '',
      days120Non:
        this.collectionMsgNonFormGroup.get('days120Non').value.toString() || '',
    };

    this.sessionStorageService.set('practice-detail-data', value);
    this.PracticeManagerService.createCollectionMessagesNonIns(
      saveCollectionMessageNonIns
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([
          `practice-manager/collection-statement-messages`,
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
