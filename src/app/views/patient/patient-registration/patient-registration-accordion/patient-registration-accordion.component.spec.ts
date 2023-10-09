import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationAccordionComponent } from './patient-registration-accordion.component';

describe('PatientRegistrationAccordionComponent', () => {
  let component: PatientRegistrationAccordionComponent;
  let fixture: ComponentFixture<PatientRegistrationAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegistrationAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
