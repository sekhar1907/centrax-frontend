import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoTabSecondaryComponent } from './sched-patient-info-tab-secondary.component';

describe('SchedPatientInfoTabSecondaryComponent', () => {
  let component: SchedPatientInfoTabSecondaryComponent;
  let fixture: ComponentFixture<SchedPatientInfoTabSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoTabSecondaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoTabSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
