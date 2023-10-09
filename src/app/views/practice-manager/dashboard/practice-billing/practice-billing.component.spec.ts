import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeBillingComponent } from './practice-billing.component';

describe('PracticeBillingComponent', () => {
  let component: PracticeBillingComponent;
  let fixture: ComponentFixture<PracticeBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
