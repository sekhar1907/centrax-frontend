import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoApptComponent } from './sched-patient-info-appt.component';

describe('SchedPatientInfoApptComponent', () => {
  let component: SchedPatientInfoApptComponent;
  let fixture: ComponentFixture<SchedPatientInfoApptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoApptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
