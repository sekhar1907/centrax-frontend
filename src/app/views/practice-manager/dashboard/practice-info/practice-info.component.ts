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
  selector: 'app-practice-info',
  templateUrl: './practice-info.component.html',
  styleUrls: ['./practice-info.component.scss'],
})
export class PracticeInfoComponent {
  practiceDetailsFormGroup: FormGroup;
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
    this.PracticeManagerService.getPractice().subscribe({
      next: (res) => {
        this.initPatientInfoForm(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.practiceDetailsFormGroup = new UntypedFormGroup({
      NPI: new FormControl(null),
      dentalLicense: new FormControl(null),
      taxId: new FormControl(null),
      DEANumber: new FormControl(null),
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
    this.practiceInfo = practiceInfo;
    this.practiceDetailsFormGroup.patchValue({
      NPI: practiceInfo.NPI ? practiceInfo?.NPI : practiceInfo.practice?.NPI,
      dentalLicense: practiceInfo.dentalLicense
        ? practiceInfo?.dentalLicense
        : practiceInfo.practice?.dentalLicense,
      taxId: practiceInfo.taxId
        ? practiceInfo?.taxId
        : practiceInfo.practice?.taxId,
      DEANumber: practiceInfo.DEANumber
        ? practiceInfo?.DEANumber
        : practiceInfo.practice?.DEANumber,
    });
    // console.log('practiceInfo :', practiceInfo);
    // if (practiceInfo) {
    //   this.practiceInfo = practiceInfo;
    //   this.practiceDetailsFormGroup.patchValue(practiceInfo.practice);
    // }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.practiceDetailsFormGroup.controls
    );
  }

  openPdf(): void {
    const pdfUrl = '/assets/pdf/sample.pdf';
    window.open(pdfUrl, '_blank');
  }

  onSave() {
    this.formsubmit = true;
    if (this.practiceDetailsFormGroup.invalid) return;
    const practiceFormValue = this.practiceDetailsFormGroup.value;

    const practiceValue = {
      ...practiceFormValue,
    };
    let value: any = {};

    if (this.practiceInfo && this.practiceInfo.practice) {
      value = {
        ...this.practiceInfo,
        practice: {
          ...this.practiceInfo.practice,
          NPI: this.practiceDetailsFormGroup.get('NPI').value,
          dentalLicense:
            this.practiceDetailsFormGroup.get('dentalLicense').value,
          taxId: this.practiceDetailsFormGroup.get('taxId').value,
          DEANumber: this.practiceDetailsFormGroup.get('DEANumber').value,
          feeSchedule: 'free-schedule-1683533697664.txt',
        },
      };
    }

    console.log('value 3 :', value);
    console.log('practiceFormValue.practice :', this.practiceInfo);

    this.sessionStorageService.set('practice-detail-data', value);
    const savePracticeValue = {
      NPI: this.practiceDetailsFormGroup.get('NPI')?.value?.toString() || '',
      dentalLicense:
        this.practiceDetailsFormGroup.get('dentalLicense')?.value?.toString() ||
        '',
      taxId:
        this.practiceDetailsFormGroup.get('taxId')?.value?.toString() || '',
      DEANumber:
        this.practiceDetailsFormGroup.get('DEANumber')?.value?.toString() || '',
      name:
        this.practiceInfo.name !== undefined || this.practiceInfo.name !== ''
          ? this.practiceInfo.name
          : this.practiceInfo.practice.name,
      email:
        this.practiceInfo.email !== undefined || this.practiceInfo.email !== ''
          ? this.practiceInfo.email
          : this.practiceInfo.practice.email,
      phone:
        this.practiceInfo.phone !== undefined || this.practiceInfo.phone !== ''
          ? this.practiceInfo.phone
          : this.practiceInfo.practice.phone,
    };

    console.log('savePracticeValue :', savePracticeValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createPracticeDetail(
      savePracticeValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/add-staff`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
