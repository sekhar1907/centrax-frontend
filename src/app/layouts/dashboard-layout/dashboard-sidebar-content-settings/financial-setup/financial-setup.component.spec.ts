import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSetupComponent } from './financial-setup.component';

describe('FinancialSetupComponent', () => {
  let component: FinancialSetupComponent;
  let fixture: ComponentFixture<FinancialSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
