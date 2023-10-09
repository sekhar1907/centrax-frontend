import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffListComponent } from './add-staff-list.component';

describe('AddStaffListComponent', () => {
  let component: AddStaffListComponent;
  let fixture: ComponentFixture<AddStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
