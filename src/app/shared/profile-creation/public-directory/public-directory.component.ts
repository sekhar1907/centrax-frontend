import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TIMEOPTIONS } from 'src/app/core/constants/time-options';
import { PracticeService } from 'src/app/core/services/practice.service';
import { ProviderService } from 'src/app/core/services/provider.service';
import { clearCurrentUser } from 'src/app/state/app.actions';

@Component({
  selector: 'app-public-directory',
  templateUrl: './public-directory.component.html',
  styleUrls: ['./public-directory.component.scss']
})
export class PublicDirectoryComponent {
  publicDirectoryFormGroup: FormGroup;
  formsubmit: boolean = false;
  acceptingNewPatientsOpts = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];
  dentistGenderOpts = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Non-Conforming', value: 'non-conforming' },
  ]

  languagesOpts = [
    { label: 'English', value: 'english' },
    { label: 'Russian', value: 'russian' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'Filipino', value: 'filipino' },
  ];

  timeOpts = [{ label: 'Closed', value: null }, ...TIMEOPTIONS];
  isAddProvider: boolean = false;

  profilePhoto: string;
  profilePhotoDisplay: string;
  officePhotos: string[];
  officePhotosDisplay: string[];
  fileSizeLarge: boolean = false;

  constructor(
    private providerService: ProviderService,
    private practiceService: PracticeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.publicDirectoryFormGroup = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      npi: new FormControl(null, Validators.required),
      dentalSchool: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.pattern(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[^\s]*)?$/i)),
      blog: new FormControl(null, Validators.pattern(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[^\s]*)?$/i)),
      facebook: new FormControl(null, Validators.pattern(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[^\s]*)?$/i)),
      twitter: new FormControl(null, Validators.pattern(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[^\s]*)?$/i)),
      about: new FormControl(null),
      acceptingNewPatients: new FormControl(null, Validators.required),
      dentistGender: new FormControl(null, Validators.required),
      acceptingAppointmentRequestSwitch: new FormControl(true, Validators.required),
      acceptingApptRequests: new FormControl(true, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
      languages: new FormControl([this.languagesOpts[0]], Validators.required),
      weeklySchedule: new FormGroup({
        mon: new FormGroup({from: new FormControl('8:00'), to: new FormControl('17:00')}),
        tue: new FormGroup({from: new FormControl('8:00'), to: new FormControl('17:00')}),
        wed: new FormGroup({from: new FormControl('8:00'), to: new FormControl('17:00')}),
        thu: new FormGroup({from: new FormControl('8:00'), to: new FormControl('17:00')}),
        fri: new FormGroup({from: new FormControl('8:00'), to: new FormControl('17:00')}),
        sat: new FormGroup({from: new FormControl(null), to: new FormControl(null)}),
        sun: new FormGroup({from: new FormControl(null), to: new FormControl(null)})
      }),
      childFriendly: new FormControl(false, Validators.required),
      eveningsAndWeekends: new FormControl(false, Validators.required),
      acceptsMedicaid: new FormControl(false, Validators.required),
      handicapAccess: new FormControl(false, Validators.required),
      seniorFriendly: new FormControl(false, Validators.required),
      holisticDentistry: new FormControl(false, Validators.required),
      sedation: new FormControl(false, Validators.required),
      consiousSedation: new FormControl(false, Validators.required),
      therapyAnimals: new FormControl(false, Validators.required),
      preTreatmentSessions: new FormControl(false, Validators.required),
      distraction: new FormControl(false, Validators.required),
      BehaviorManagement: new FormControl(false, Validators.required)
    });
    this.isAddProvider = this.route.snapshot.queryParams['add'];
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.publicDirectoryFormGroup.controls;
  }

  onSavePublicDirectory() {
    this.formsubmit = true;
    if(this.publicDirectoryFormGroup.invalid || !this.profilePhoto) return;

    const formValue = this.publicDirectoryFormGroup.value;
    formValue.languages = formValue.languages.map(l => l.value);
    if(this.profilePhoto) formValue.profilePhoto = this.profilePhoto;
    if(this.officePhotos?.length) formValue.officePhotos = this.officePhotos;

    this.providerService.createProvider(formValue).subscribe({
      next: (res) => {
        if(this.isAddProvider) {
          this.router.navigate(['/shared/practice-details'])
        } else {
          this.store.dispatch(clearCurrentUser());
          this.router.navigate(['/shared/welcome'])
        }
      },
      error: (error) => {}
    })
  }


  onSkip() {
    if(this.isAddProvider) {
      this.router.navigate(['/shared/practice-details'])
    } else {
      this.practiceService.saveSkippedCreationSteps('5').subscribe({
        next: () => {
          this.store.dispatch(clearCurrentUser());
          this.router.navigate(['/shared/welcome'])
        },
        error: (error) => {}
      })
    }
  }

  onProfilePhotoSelected(event) {
    const file:File = event.target.files[0];
    if(file.size > 2048000) {
      this.fileSizeLarge = true;
      return;
    } else {
      this.fileSizeLarge = false;
    }
    if (file) {
        const formData = new FormData();
        formData.append('profilePhoto', file);
        this.providerService.uploadProviderProfilePhoto(formData).subscribe({
          next: (res) => {
            this.profilePhoto = res.result;
            this.profilePhotoDisplay = `/api/images?key=${res.result}`;
          },
          error: (error) => {
          }
        })
    }
  }

  onOfficePhotosSelected(event) {
    const files:File[] = event.target.files;
    if (files.length) {
        const formData = new FormData();
        for  (var i =  0; i <  files.length; i++)  {
          formData.append("files",  files[i]);
        }
        this.providerService.uploadProviderOfficePhotos(formData).subscribe({
          next: (res) => {
            this.officePhotos = res;
            this.officePhotosDisplay = res.map(photo => `/api/images?key=${photo}`);
          },
          error: (error) => {
          }
        })
    }
  }
}
