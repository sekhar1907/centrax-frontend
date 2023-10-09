import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoGenInfoComponent } from './sched-patient-info-gen-info.component';

describe('SchedPatientInfoGenInfoComponent', () => {
  let component: SchedPatientInfoGenInfoComponent;
  let fixture: ComponentFixture<SchedPatientInfoGenInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoGenInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoGenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
