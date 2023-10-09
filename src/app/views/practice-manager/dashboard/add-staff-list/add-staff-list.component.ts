import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPracticeManager, IStaffList } from 'src/app/core/models/practice-manager.model';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-add-staff-list',
  templateUrl: './add-staff-list.component.html',
  styleUrls: ['./add-staff-list.component.scss'],
})
export class AddStaffListComponent implements OnInit {
  iconshowplus = true;
  iconrightangle = false;

  submitdata() {
    this.iconshowplus = false;
    this.iconrightangle = true;
  }

  addStaffListFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;
  staffList = [];
  @ViewChild('exampleModal', { static: false }) modal!: ElementRef;
  @ViewChild('modalRef') modalRef: ElementRef;
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
    this.addStaffListFormGroup = new UntypedFormGroup({
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
        this.staffList = res.medicalStaffs;
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
      this.addStaffListFormGroup.patchValue(practiceInfo.medicalStaffs);
    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.addStaffListFormGroup.controls;
  }

  onSave() {
    this.formsubmit = true;
    if (this.addStaffListFormGroup.invalid) return;
    const practiceFormValue = this.addStaffListFormGroup.value;
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      staffs: this.practiceInfo?.staffs || [],
    };
    value.staffs.fullname = this.addStaffListFormGroup.get('fullname').value;
    value.staffs.suffix = this.addStaffListFormGroup.get('suffix').value;
    value.staffs.birthDate =
      this.addStaffListFormGroup.get('birthDate').value;
    value.staffs.email = this.addStaffListFormGroup.get('email').value;
    value.staffs.phone = this.addStaffListFormGroup.get('phone').value;
    value.staffs.address = this.addStaffListFormGroup.get('address').value;
    value.staffs.city = this.addStaffListFormGroup.get('city').value;
    value.staffs.state = this.addStaffListFormGroup.get('state').value;
    value.staffs.zip = this.addStaffListFormGroup.get('zip').value;
    value.staffs.title = this.addStaffListFormGroup.get('title').value;
    value.staffs.hireDate = this.addStaffListFormGroup.get('hireDate').value;
    value.staffs.permissions =
      this.addStaffListFormGroup.get('permissions').value;
    value.staffs.NPI = this.addStaffListFormGroup.get('NPI').value;
    value.staffs.dentalLicense =
      this.addStaffListFormGroup.get('dentalLicense').value;
    value.staffs.DEANumber =
      this.addStaffListFormGroup.get('DEANumber').value;

    console.log('value 3 :', value);
    const saveAddStaffListValue:IStaffList[] = [{
      images: this.practiceInfo?.staffs?.images,
      fullname:
        this.addStaffListFormGroup.get('fullname').value?.toString() || '',
      suffix: this.addStaffListFormGroup.get('suffix').value?.toString() || '',
      birthDate:
        this.addStaffListFormGroup.get('birthDate').value?.toString() || '',
      email: this.addStaffListFormGroup.get('email').value?.toString() || '',
      phone: this.addStaffListFormGroup.get('phone').value?.toString() || '',
      address:
        this.addStaffListFormGroup.get('address').value?.toString() || '',
      city: this.addStaffListFormGroup.get('city').value?.toString() || '',
      state: this.addStaffListFormGroup.get('state').value?.toString() || '',
      zip: this.addStaffListFormGroup.get('zip').value?.toString() || '',
      title: this.addStaffListFormGroup.get('title').value?.toString() || '',
      hireDate:
        this.addStaffListFormGroup.get('hireDate').value?.toString() || '',
      permissions:
        this.addStaffListFormGroup.get('permissions').value?.toString() || '',
      NPI: this.addStaffListFormGroup.get('NPI').value?.toString() || '',
      dentalLicense:
        this.addStaffListFormGroup.get('dentalLicense').value?.toString() || '',
      DEANumber:
        this.addStaffListFormGroup.get('DEANumber').value?.toString() || '',
    }];

    console.log('saveAddStaffListValue :', saveAddStaffListValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createStaffList(
      saveAddStaffListValue
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

    // this.router.navigate([`practice-manager/add-staff`]);
  }

  nextPage() {
    this.router.navigate([`practice-manager/add-staff-dental`]);
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
