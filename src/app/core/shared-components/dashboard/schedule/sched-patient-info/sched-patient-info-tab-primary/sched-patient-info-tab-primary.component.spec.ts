import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoTabPrimaryComponent } from './sched-patient-info-tab-primary.component';

describe('SchedPatientInfoTabPrimaryComponent', () => {
  let component: SchedPatientInfoTabPrimaryComponent;
  let fixture: ComponentFixture<SchedPatientInfoTabPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoTabPrimaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoTabPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
