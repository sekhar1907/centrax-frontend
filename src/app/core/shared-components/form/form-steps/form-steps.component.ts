import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
export interface StepItem {
  stepTitle: string;
  stepLongTitle?: string;
  stepDescription?: string;
  isActive: boolean;
  link?: string;
  icon?: string;
  activeIicon?: string;
  pageId?: string;
}

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss']
})
export class FormStepsComponent implements OnChanges {
  @Input() steps: StepItem[] = [];
  @Input() activeStep: number = 0;
  @Input() previousActive: boolean = false;
  @Input() patientId: string | number | undefined;

  @Output() selectStep = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['activeStep']) {
      this.steps.forEach(step => {
        step.isActive = false;
      });

      if (this.previousActive) {
        for (let i = 0; i <= this.activeStep; i++) {
          this.steps[0].isActive = true;
        }
      } else {
        this.steps[this.activeStep].isActive = true;
      }
    }
  }

  public onSelectStep(index: number) {
    this.selectStep.emit({index, patientId: this.patientId});
  }
}
