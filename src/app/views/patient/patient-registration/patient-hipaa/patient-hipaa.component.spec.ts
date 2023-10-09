import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHipaaComponent } from './patient-hipaa.component';

describe('PatientHipaaComponent', () => {
  let component: PatientHipaaComponent;
  let fixture: ComponentFixture<PatientHipaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHipaaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHipaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
