import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IPracticeManager,
  IStaffList,
} from 'src/app/core/models/practice-manager.model';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-add-staff-dental-list',
  templateUrl: './add-staff-dental-list.component.html',
  styleUrls: ['./add-staff-dental-list.component.scss'],
})
export class AddStaffDentalListComponent implements OnInit {
  iconshowplus = true;
  iconrightangle = false;

  submitdata() {
    this.iconshowplus = false;
    this.iconrightangle = true;
  }

  addStaffDentalListFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;
  @ViewChild('exampleModal', { static: false }) modal!: ElementRef;
  @ViewChild('modalRef') modalRef: ElementRef;
  staffList = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store,
    private PracticeManagerService: PracticeManagerService,
    public sessionStorageService: SessionStorageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addStaffDentalListFormGroup = new UntypedFormGroup({
      fullname: new FormControl(null),
      suffix: new FormControl(null),
      birthDate: new FormControl(''),
      email: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
      title: new FormControl(null),
      hireDate: new FormControl(''),
      permissions: new FormControl(null),
      NPI: new FormControl(null),
      dentalLicense: new FormControl(null),
      DEANumber: new FormControl(null),
    });

    this.initSoftwareConfigData();
  }

  private initSoftwareConfigData() {
    this.PracticeManagerService.getSoftwareConfig().subscribe({
      next: (res: ISoftwareConfig) => {
        this.initPatientInfoForm(res);
        this.staffList = res.administrativeStaffs;
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
      this.addStaffDentalListFormGroup.patchValue(practiceInfo.staffsDental);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>(
      this.addStaffDentalListFormGroup.controls
    );
  }

  onSave() {
    this.formsubmit = true;
    if (this.addStaffDentalListFormGroup.invalid) return;
    const practiceFormValue = this.addStaffDentalListFormGroup.value;
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      staffsDental: this.practiceInfo.staffsDental || [],
    };

    value.staffsDental.fullname =
      this.addStaffDentalListFormGroup.get('fullname').value;
    value.staffsDental.suffix =
      this.addStaffDentalListFormGroup.get('suffix').value;
    value.staffsDental.birthDate =
      this.addStaffDentalListFormGroup.get('birthDate').value;
    value.staffsDental.email =
      this.addStaffDentalListFormGroup.get('email').value;
    value.staffsDental.phone =
      this.addStaffDentalListFormGroup.get('phone').value;
    value.staffsDental.address =
      this.addStaffDentalListFormGroup.get('address').value;
    value.staffsDental.city =
      this.addStaffDentalListFormGroup.get('city').value;
    value.staffsDental.state =
      this.addStaffDentalListFormGroup.get('state').value;
    value.staffsDental.zip = this.addStaffDentalListFormGroup.get('zip').value;
    value.staffsDental.title =
      this.addStaffDentalListFormGroup.get('title').value;
    value.staffsDental.hireDate =
      this.addStaffDentalListFormGroup.get('hireDate').value;
    value.staffsDental.permissions =
      this.addStaffDentalListFormGroup.get('permissions').value;
    value.staffsDental.NPI = this.addStaffDentalListFormGroup.get('NPI').value;
    value.staffsDental.dentalLicense =
      this.addStaffDentalListFormGroup.get('dentalLicense').value;
    value.staffsDental.DEANumber =
      this.addStaffDentalListFormGroup.get('DEANumber').value;

    console.log('value 3 :', value);

    const saveAddStaffDentalListValue: IStaffList[] = [
      {
        images: this.practiceInfo?.staffsDental?.images,
        fullname:
          this.addStaffDentalListFormGroup.get('fullname').value?.toString() ||
          '',
        suffix:
          this.addStaffDentalListFormGroup.get('suffix').value?.toString() ||
          '',
        birthDate:
          this.addStaffDentalListFormGroup.get('birthDate').value?.toString() ||
          '',
        email:
          this.addStaffDentalListFormGroup.get('email').value?.toString() || '',
        phone:
          this.addStaffDentalListFormGroup.get('phone').value?.toString() || '',
        address:
          this.addStaffDentalListFormGroup.get('address').value?.toString() ||
          '',
        city:
          this.addStaffDentalListFormGroup.get('city').value?.toString() || '',
        state:
          this.addStaffDentalListFormGroup.get('state').value?.toString() || '',
        zip:
          this.addStaffDentalListFormGroup.get('zip').value?.toString() || '',
        title:
          this.addStaffDentalListFormGroup.get('title').value?.toString() || '',
        hireDate:
          this.addStaffDentalListFormGroup.get('hireDate').value?.toString() ||
          '',
        permissions:
          this.addStaffDentalListFormGroup
            .get('permissions')
            .value?.toString() || '',
        NPI:
          this.addStaffDentalListFormGroup.get('NPI').value?.toString() || '',
        dentalLicense:
          this.addStaffDentalListFormGroup
            .get('dentalLicense')
            .value?.toString() || '',
        DEANumber:
          this.addStaffDentalListFormGroup.get('DEANumber').value?.toString() ||
          '',
      },
    ];

    console.log('saveAddStaffDentalListValue :', saveAddStaffDentalListValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createStaffListDental(
      saveAddStaffDentalListValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.initSoftwareConfigData();
        this.closeModal();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  nextPage() {
    this.router.navigate([`practice-manager/system-preference`]);
  }
  closeModal() {
    this.modalRef.nativeElement.style.display = 'none';
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'padding-right');
    this.modalRef.nativeElement.classList.remove( 'show');

    console.log('Close');
  }
}
