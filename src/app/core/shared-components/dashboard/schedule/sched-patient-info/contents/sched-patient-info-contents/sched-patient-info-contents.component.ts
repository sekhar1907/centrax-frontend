import { Component } from '@angular/core';

@Component({
  selector: 'sched-patient-info-contents',
  templateUrl: './sched-patient-info-contents.component.html',
  styleUrls: ['./sched-patient-info-contents.component.scss']
})
export class SchedPatientInfoContentsComponent {
  // pageActive = 'gen-info'
  pageActive = 'med-hist';
}
