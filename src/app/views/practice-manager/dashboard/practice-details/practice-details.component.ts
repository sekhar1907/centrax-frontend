import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPracticeManager } from 'src/app/core/models/practice-manager.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-practice-details',
  templateUrl: './practice-details.component.html',
  styleUrls: ['./practice-details.component.scss'],
})
export class PracticeDetailsComponent {
  practiceDetailsFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;
  getpracticeInfo: any;
  @Input() control!: FormControl;
  @Input() mask: string = '';
  @Input() slotChar: string;
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
    this.PracticeManagerService.getPractice().subscribe({
      next: (res) => {
        this.initPracticeInfoForm(res);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.practiceDetailsFormGroup = new UntypedFormGroup({
      name: new FormControl(null),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(null),
    });

    // this.getPracticeInfo();

    if (this.sessionStorageService.get('practice-detail-data')) {
      const data = this.sessionStorageService.get('practice-detail-data');
      this.initPracticeInfoForm(data);
    }
  }

  // private getPracticeInfo() {
  //   this.PracticeManagerService.get("8").subscribe({ next: (res) => {
  //     this.getpracticeInfo = res;
  //     this.initPracticeInfoForm(res);
  //   },
  //   error: (error) => {
  //     console.log(error)
  //     // this.snackbarService.openSnackBar('Failed to fetch patient info', 'Dismiss', 'error');
  //     this.router.navigate(['/dashboard/']);
  //   }});
  // }
  private initPracticeInfoForm(practiceInfo?: any) {
    console.log('practiceInfo :', practiceInfo);
    this.practiceInfo = practiceInfo
    this.practiceDetailsFormGroup.patchValue({
      name: practiceInfo.name
        ? practiceInfo?.name
        : practiceInfo?.practice?.name,
      email: practiceInfo.email
        ? practiceInfo?.email
        : practiceInfo?.practice?.email,
      phone: practiceInfo.phone
        ? practiceInfo?.phone
        : practiceInfo?.practice?.phone,
    });
    // if (practiceInfo.practice) {
    //   this.practiceInfo = practiceInfo;
    //   this.practiceDetailsFormGroup.patchValue(practiceInfo.practice);
    // } else {
    //   this.practiceDetailsFormGroup.patchValue(practiceInfo);
    // }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.practiceDetailsFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.practiceDetailsFormGroup.invalid) return;
    const { ...practiceFormValue } = this.practiceDetailsFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      practice: practiceValue,
    };
    value.practice = {};
    value.practice = {
      name: this.practiceDetailsFormGroup.get('name').value,
      email: this.practiceDetailsFormGroup.get('email').value,
      phone: this.practiceDetailsFormGroup.get('phone').value.toString(),
    };

    console.log('value 1 :', value);
    const savePracticeValue = {
      name: this.practiceDetailsFormGroup.get('name').value || '',
      email: this.practiceDetailsFormGroup.get('email').value || '',
      phone: this.practiceDetailsFormGroup.get('phone').value.toString() || '',
      NPI: (this.practiceInfo.NPI !== undefined || this.practiceInfo.NPI !== '') ? this.practiceInfo.NPI : value.practiceInfo.NPI,
      dentalLicense:
        (this.practiceInfo.dentalLicense !== undefined || this.practiceInfo.dentalLicense !== '')
          ? this.practiceInfo.dentalLicense
          : value.practiceInfo.NPI,
      taxId: (this.practiceInfo.taxId !== undefined || this.practiceInfo.taxId !== '') ? this.practiceInfo.taxId : value.practiceInfo.NPI,
      DEANumber:
        (this.practiceInfo.DEANumber !== undefined || this.practiceInfo.DEANumber !== '') ? this.practiceInfo.DEANumber : value.practiceInfo.NPI,
    };

    console.log('savePracticeValue :', savePracticeValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createPracticeDetail(
      savePracticeValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/contact-person`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
