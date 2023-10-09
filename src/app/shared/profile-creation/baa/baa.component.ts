import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SPECIALTIES } from 'src/app/core/constants/specialties';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Observable } from 'rxjs';
import { ISpecialty } from 'src/app/core/models/specialty.model';
import { Store } from '@ngrx/store';
import { specialtiesSelector } from 'src/app/state/app.reducer';
import { ScrollPanel } from 'primeng/scrollpanel';
import { BaaService } from 'src/app/core/services/baa.service';
import { environment } from 'src/environments/environment';
import { clearCurrentUser } from 'src/app/state/app.actions';
@Component({
  selector: 'app-baa',
  templateUrl: './baa.component.html',
  styleUrls: ['./baa.component.scss']
})
export class BaaComponent implements AfterViewInit {
  baaFormGroup: FormGroup;
  formsubmit!: boolean;
  specialtyOptions$: Observable<ISpecialty[]>;

  @ViewChild('signature')
  signaturePad: SignaturePadComponent;

  @ViewChild('baaScroll')
  baaScroll: ScrollPanel;

  signatureOpen = false;

  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 600,
    canvasHeight: 250,
    backgroundColor: '#FFF',
  };
  currentScroll: number = 0;
  signatureBase64Image: string;
  fileName: string;
  baaFileUploaded: boolean = false;
  baaAgreeControl = new FormControl(null, Validators.required);
  signAgreeControl = new FormControl(null, Validators.required);

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private store: Store,
    private baaService: BaaService) {
    this.specialtyOptions$ = this.store.select(specialtiesSelector);
    this.baaFormGroup = new UntypedFormGroup({
      fullname: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      coveredEntityName: new FormControl(null, Validators.required),
      specialty: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      complyOSHACDC: new FormControl(true, Validators.required),
      profileCreateFinishedStep: new FormControl(2, Validators.required)
    });
  }

  ngAfterViewInit(): void {
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.baaFormGroup.controls;
  }

  onSaveBaa(isDownload?: boolean) {
    this.formsubmit = true;
    this.baaFormGroup.markAllAsTouched();
    if(this.baaFormGroup.invalid) return;

    let formValue = this.baaFormGroup.value;
    if(this.signatureBase64Image && !isDownload) {
      formValue.signature = this.signatureBase64Image;
      formValue.isDownload = false;
    } else {
      formValue.isDownload = isDownload;
    }

    this.baaService.createBAA(formValue).subscribe({
      next: (res) => {
        this.store.dispatch(clearCurrentUser());
        if(isDownload) {
          this.downloadBAAFile(res.token);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSaveAndNext() {
    this.router.navigate(['/shared/practice-details']);
  }

  onSignatureClear() {
    this.signaturePad.clear();
  }

  showSignatureDialog() {
    this.formsubmit = true;
    this.baaFormGroup.markAllAsTouched();
    if(this.baaFormGroup.invalid) return;

    this.signatureOpen = true;
  }

  private downloadBAAFile(token) {
    const url = `${environment.apiUrl}/download-file?token=${token}`;
    window.open(url, '_blank');
  }

  onSubmit() {
    this.signatureBase64Image = this.signaturePad.toDataURL();
    this.onSaveBaa(false);
    this.onSignatureClear();
    this.signatureOpen = false;
  }

  onScrollBaa(direction: boolean) {
    let element = this.baaScroll.el.nativeElement.querySelector(".p-scrollpanel-content");
    const totalHeight = element.scrollHeight;
    let scrollPosition = this.currentScroll;
    if(direction) {
      if(scrollPosition >= totalHeight) scrollPosition = totalHeight;
      else scrollPosition += 50
    } else {
      if(scrollPosition <= 0) scrollPosition = 0;
      else scrollPosition -= 50
    }
    this.currentScroll = scrollPosition;
    this.baaScroll.scrollTop(this.currentScroll);
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file);
        this.baaService.uploadSignedBAA(formData).subscribe({
          next: (res) => {
            this.baaFileUploaded = true;
          },
          error: (error) => {

          }
        })
    }
  }
}
