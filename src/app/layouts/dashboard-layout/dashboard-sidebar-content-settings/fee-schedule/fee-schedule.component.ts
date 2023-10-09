import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../../../core/services/settings.service';

@Component({
  selector: 'app-fee-schedule',
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.scss']
})


export class FeeScheduleComponent implements OnInit {
  products:[];
  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.getFeeSchedule('Basic');
  }

  getFeeSchedule(type) {
    this.settingsService.getFeeSchedule(type).subscribe({
      next: (res:any) => {
        this.products = res;
      },
      error: () => {}
    });
  }
}