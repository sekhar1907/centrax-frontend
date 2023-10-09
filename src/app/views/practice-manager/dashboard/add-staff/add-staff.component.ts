import { Component } from '@angular/core';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import Papa from 'papaparse';
import { IStaffList } from 'src/app/core/models/practice-manager.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent {
  practiceDetailsFormGroup: FormGroup;
  practiceInfo: any;
  urlfile: any = '';
  files: File[] = [];
  parsedStaffs: IStaffList[] = [];
  responseArray: any[] = [];
  constructor(
    private PracticeManagerService: PracticeManagerService,
    public sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.sessionStorageService.get('practice-detail-data')) {
      const data = this.sessionStorageService.get('practice-detail-data');
      console.log('data :', data);
      this.initPracticeInfoForm(data);
    }
  }
  private initPracticeInfoForm(practiceInfo?: any) {
    this.practiceInfo = practiceInfo;
    console.log('practiceInfo :', practiceInfo);

    // this.practiceDetailsFormGroup.patchValue(practiceInfo.staffs);
  }
  onSelect(event: any) {
    const files: File[] = event.addedFiles || event.target.images;
    Papa.parse(files[0], {
      header: true,
      complete: (results) => {
        this.parsedStaffs = results?.data;
      },
      error: () => {
        Swal.fire({title: 'Failed to read csv file', icon: 'error'});
      }
    });
    this.files.push(...files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  addfile(event: any) {
    if (!event.target.images[0] || event.target.images[0].length === 0) {
      return;
    }
    const mimetype = event.target.images[0].type;
    if (mimetype.match(/image\/*/) === null) {
      return;
    }
    const readimg = new FileReader();
    readimg.readAsDataURL(event.target.images[0]);
    readimg.onload = (_event) => {
      this.urlfile = readimg.result;
    };
  }
  // uploadStaffFile(file: File) {
  //   this.PracticeManagerService.uploadStaffFile(file).subscribe(
  //     (response) => {
  //       // Handle successful upload
  //       console.log('File uploaded successfully:', response);
  //       this.responseArray.push(response);

  //       this.responseCounter++; // Increment the response counter

  //       // Check if all responses have been received
  //       if (this.responseCounter === this.images.length) {
  //         this.logResponseArray(); // Call the function to log the array values
  //       }
  //     },
  //     (error) => {
  //       // Handle upload error
  //       console.error('File upload error:', error);
  //     }
  //   );
  // }

  logResponseArray = () => {
    console.log('Combined responses:', this.responseArray);
    const flattenedImages = this.responseArray.flatMap((images) => images);

    console.log('flattenedImages :', flattenedImages);

    // Check if this.practiceInfo.staffs is defined or not
    // if (this.practiceInfo && this.practiceInfo.staffs) {
    let value: any = {
      ...this.practiceInfo,
      staffs: {
        ...this.practiceInfo.staffs,
        images: flattenedImages,
      },
    };

    console.log('value 1 :', value);
    this.sessionStorageService.set('practice-detail-data', value);
    this.router.navigate([`practice-manager/add-staff-list`]);
    // }
  };

  responseCounter = 0;

  // uploadaddStaffFiles() {
  //   this.responseCounter = 0; // Reset the response counter

  //   for (const file of this.files) {
  //     this.uploadStaffFile(file);
  //   }
  // }

  onCreateStaffs() {
    this.PracticeManagerService.createStaffList(
      this.parsedStaffs
    ).subscribe({
      next: (res) => {
        this.router.navigate(['/practice-manager/add-staff-list'])
      },
      error: (error) => {
        console.log(error);
        Swal.fire({title: 'Failed to create staff data', icon: 'error'});
      },
    });
  }
}
