import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SettingsService } from './../../../../core/services/settings.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffUpdateForm: FormGroup;

  visible: boolean = false;
  showStaffDetails: boolean = false;
  position: string = 'center';
  staffs: string[] = [];
  dentatStaffs: string[] = [];

  firstSectionEdit: boolean = false;
  secondSectionEdit: boolean = false;
  thirdSectionEdit: boolean = false;
  
  staffObject:any = {};
  staffType:string = 'staff';
  idx:number = 0;
  @Input() medicalStaffs: any;
  @Input() administrativeStaffs: any;
  @Output() reFreshConfigData = new EventEmitter<any>();


  constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    this.dentatStaffs = this.medicalStaffs;
    this.staffs = this.administrativeStaffs;
    this.createForm();
  }

  createForm() {
    this.staffUpdateForm = this.fb.group({
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      title: ['', Validators.required],
      hireDate: ['', Validators.required],
      permissions: ['', Validators.required],
      NPI: ['', Validators.required],
      dentalLicense: ['', Validators.required],
      DEANumber: ['', Validators.required]

    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.dentatStaffs = this.medicalStaffs;
      this.staffs = this.administrativeStaffs;
    }, 200);
  }

  staffUpdateProcess(){
    this.settingsService.staffUpdateProcess(this.staffObject.id ,this.staffUpdateForm.value).subscribe({
      next: (res) => {
        if(!res.error) {
          // this.staffUpdateForm.reset();
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

  toggleProfileInfo(){
    this.firstSectionEdit = !this.firstSectionEdit;
  }

  toggleDesignationInfo(){
    this.secondSectionEdit = !this.secondSectionEdit;
  }
  toggleThirdSection(){
    this.thirdSectionEdit = !this.thirdSectionEdit;
  }
  showDialog(position: string) {
      this.position = position;
      this.visible = true;
  }
  toggleStaffDetailsModal(staffObj: any, type? :string){
    this.showStaffDetails = !this.showStaffDetails;
    if(Object.keys(staffObj).length === 0)
    return;
    staffObj.birthDate = formatDate(staffObj?.birthDate,'yyyy-MM-dd','en');
    staffObj.hireDate = formatDate((staffObj?.hireDate),'yyyy-MM-dd','en');
    this.staffType = type;
    this.staffObject = staffObj;
    this.staffUpdateForm.patchValue(this.staffObject);
  }

  getNextIdx(idx, direction): number{
      var length:number;
      length = this.dentatStaffs.length;
      if(this.staffType == 'staff'){
        length = this.staffs.length;
      }
      switch (direction) {
        case 'next': return (idx + 1) % length;
        case 'prev': return (idx == 0) && length - 1 || idx - 1;
        default: return idx;
      }
  }
  
  navigateStaffObject(direction: string){
    this.idx = this.getNextIdx(this.idx, direction);
    if(this.staffType == 'staff'){
      this.staffObject = this.staffs[this.idx];
    }
    if(this.staffType == 'dentatStaff'){
      this.staffObject = this.dentatStaffs[this.idx];
    }
    let staffObj:any = { ...this.staffObject };
    staffObj.birthDate = formatDate(staffObj?.birthDate,'yyyy-MM-dd','en');
    staffObj.hireDate = formatDate((staffObj?.hireDate),'yyyy-MM-dd','en');
    this.staffObject = staffObj;
    this.staffUpdateForm.patchValue(this.staffObject);
  }
}
