import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimProfileResult } from 'src/app/core/models/claim-profile.model';
import { OnboardingService } from 'src/app/core/services/onboarding.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  keyword: string;
  type: string;
  results: ClaimProfileResult[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private onboardingService: OnboardingService) {
    this.keyword = this.route.snapshot.queryParams['keyword'];
    this.type = this.route.snapshot.queryParams['type'];
    if(!this.keyword && !this.type) {
      this.router.navigate(['/shared/onboarding']);
    }
  }

  ngOnInit(): void {
    this.onboardingService.claimProfileManual({type: this.type, keyword: this.keyword}).subscribe({
      next: (res) => {
        if(res?.length) {
          this.results = res;
        }
      },
      error: (error) => {
        Swal.fire({ title: 'Failed to search providers', icon: 'error' });
      }
    })
  }

  onClaimProfile(providerId: number) {
    this.onboardingService.claimProfileLink(providerId).subscribe({
      next: (res) => {

      },
      error: () => {}
    })
  }
}
