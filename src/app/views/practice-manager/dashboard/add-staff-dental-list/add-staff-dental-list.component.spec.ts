import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffDentalListComponent } from './add-staff-dental-list.component';

describe('AddStaffDentalListComponent', () => {
  let component: AddStaffDentalListComponent;
  let fixture: ComponentFixture<AddStaffDentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffDentalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffDentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
