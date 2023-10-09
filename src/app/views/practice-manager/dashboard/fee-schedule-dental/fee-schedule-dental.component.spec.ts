import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeScheduleDentalComponent } from './fee-schedule-dental.component';

describe('FeeScheduleDentalComponent', () => {
  let component: FeeScheduleDentalComponent;
  let fixture: ComponentFixture<FeeScheduleDentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeScheduleDentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeScheduleDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
