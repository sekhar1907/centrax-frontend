import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoMedHistComponent } from './sched-patient-info-med-hist.component';

describe('SchedPatientInfoMedHistComponent', () => {
  let component: SchedPatientInfoMedHistComponent;
  let fixture: ComponentFixture<SchedPatientInfoMedHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoMedHistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoMedHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
