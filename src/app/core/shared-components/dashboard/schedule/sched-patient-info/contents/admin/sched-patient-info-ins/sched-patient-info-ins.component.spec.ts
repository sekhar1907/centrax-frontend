import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoInsComponent } from './sched-patient-info-ins.component';

describe('SchedPatientInfoInsComponent', () => {
  let component: SchedPatientInfoInsComponent;
  let fixture: ComponentFixture<SchedPatientInfoInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoInsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
