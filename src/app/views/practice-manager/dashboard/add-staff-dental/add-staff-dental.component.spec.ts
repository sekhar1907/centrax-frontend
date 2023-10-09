import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffDentalComponent } from './add-staff-dental.component';

describe('AddStaffDentalComponent', () => {
  let component: AddStaffDentalComponent;
  let fixture: ComponentFixture<AddStaffDentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffDentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
