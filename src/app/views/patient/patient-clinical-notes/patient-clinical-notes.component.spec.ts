import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientClinicalNotesComponent } from './patient-clinical-notes.component';

describe('PatientClinicalNotesComponent', () => {
  let component: PatientClinicalNotesComponent;
  let fixture: ComponentFixture<PatientClinicalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientClinicalNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientClinicalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
