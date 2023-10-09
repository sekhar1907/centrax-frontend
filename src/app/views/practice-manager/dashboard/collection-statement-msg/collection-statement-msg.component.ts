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
  selector: 'app-collection-statement-msg',
  templateUrl: './collection-statement-msg.component.html',
  styleUrls: ['./collection-statement-msg.component.scss'],
})
export class CollectionStatementMsgComponent {
  collectionStatementMsgFormGroup: FormGroup;
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
    this.collectionStatementMsgFormGroup = new UntypedFormGroup({
      insurance: new FormControl(null),
      nonInsurance: new FormControl(null),
      financialArrangment: new FormControl(null),
      quickStatement: new FormControl(null),
      financeCharge: new FormControl(null),
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

      this.collectionStatementMsgFormGroup.patchValue(
        practiceInfo.collectionMessageStatement
      );
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.collectionStatementMsgFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.collectionStatementMsgFormGroup.invalid) return;
    const practiceFormValue = this.collectionStatementMsgFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      collectionMessage: {
        // ...this.practiceInfo.collectionMessage,
        insurance: this.collectionStatementMsgFormGroup.get('insurance').value,
        nonInsurance:
          this.collectionStatementMsgFormGroup.get('nonInsurance').value,
        financialArrangment: this.collectionStatementMsgFormGroup.get(
          'financialArrangment'
        ).value,
        quickStatement:
          this.collectionStatementMsgFormGroup.get('quickStatement').value,
        financeCharge:
          this.collectionStatementMsgFormGroup.get('financeCharge').value,
      },
    };
    console.log('value 2 :', value);

    const saveCollectionStatMessage = {
      insurance: this.collectionStatementMsgFormGroup.get('insurance').value || '',
      nonInsurance: this.collectionStatementMsgFormGroup.get('nonInsurance').value || '',
      financialArrangment:
        this.collectionStatementMsgFormGroup.get('financialArrangment').value.toString() || '',
      quickStatement:
        this.collectionStatementMsgFormGroup.get('quickStatement').value.toString() || '',
      financeCharge:
        this.collectionStatementMsgFormGroup.get('financeCharge').value.toString() || '',
    };

    this.sessionStorageService.set('practice-detail-data', value);
    this.PracticeManagerService.createCollectionStatMessages(
      saveCollectionStatMessage
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/practice-billing`]);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // console.log("practiceFormValuepracticeFormValue :", practiceFormValue)
    // console.log("practiceInfo: any; :",this.practiceInfo)
  }
}
