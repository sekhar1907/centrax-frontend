import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFinancialAgreementComponent } from './patient-financial-agreement.component';

describe('PatientFinancialAgreementComponent', () => {
  let component: PatientFinancialAgreementComponent;
  let fixture: ComponentFixture<PatientFinancialAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFinancialAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFinancialAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
