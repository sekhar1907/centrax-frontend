import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedCalendarRescheduleDialogComponent } from './sched-calendar-reschedule-dialog.component';

describe('SchedCalendarRescheduleDialogComponent', () => {
  let component: SchedCalendarRescheduleDialogComponent;
  let fixture: ComponentFixture<SchedCalendarRescheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedCalendarRescheduleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedCalendarRescheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
