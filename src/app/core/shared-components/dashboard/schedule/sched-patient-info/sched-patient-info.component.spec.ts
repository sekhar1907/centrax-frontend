import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoComponent } from './sched-patient-info.component';

describe('SchedPatientInfoComponent', () => {
  let component: SchedPatientInfoComponent;
  let fixture: ComponentFixture<SchedPatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
