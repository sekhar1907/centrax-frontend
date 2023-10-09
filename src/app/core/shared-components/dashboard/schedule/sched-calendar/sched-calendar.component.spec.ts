import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedCalendarComponent } from './sched-calendar.component';

describe('SchedCalendarComponent', () => {
  let component: SchedCalendarComponent;
  let fixture: ComponentFixture<SchedCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
