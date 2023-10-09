import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalendarFieldComponent } from './form-calendar-field.component';

describe('FormCalendarFieldComponent', () => {
  let component: FormCalendarFieldComponent;
  let fixture: ComponentFixture<FormCalendarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCalendarFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCalendarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
