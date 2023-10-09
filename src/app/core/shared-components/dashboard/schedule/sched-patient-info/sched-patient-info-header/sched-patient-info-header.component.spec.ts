import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoHeaderComponent } from './sched-patient-info-header.component';

describe('SchedPatientInfoHeaderComponent', () => {
  let component: SchedPatientInfoHeaderComponent;
  let fixture: ComponentFixture<SchedPatientInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
