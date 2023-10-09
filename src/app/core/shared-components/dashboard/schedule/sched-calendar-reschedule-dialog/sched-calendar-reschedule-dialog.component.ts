import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sched-calendar-reschedule-dialog',
  templateUrl: './sched-calendar-reschedule-dialog.component.html',
  styleUrls: ['./sched-calendar-reschedule-dialog.component.scss']
})
export class SchedCalendarRescheduleDialogComponent {
  reschedFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const dialogData = this.config.data;
    this.reschedFormGroup = this.formBuilder.group({
      date: [new Date(dialogData.startDateTime), Validators.required],
      start: [new Date(dialogData.startDateTime), Validators.required],
      end: [new Date(dialogData.endDateTime), Validators.required],
    })
  }

  onCancel() {
    this.ref.close();
  }

  onReschedule() {
    const { date, start, end } = this.reschedFormGroup.value;
    const startDate = moment(date).format('YYYY-MM-DD');
    const startDateTime = moment(start).format('HH:mm');
    const endDateTime = moment(end).format('HH:mm');
    this.ref.close({
      startDateTime: moment(startDate + ' ' + startDateTime).toISOString(),
      endDateTime: moment(startDate + ' ' + endDateTime).toISOString()
    });
  }
}
