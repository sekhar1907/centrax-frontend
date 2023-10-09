import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioFieldComponent } from './form-radio-field.component';

describe('FormRadioFieldComponent', () => {
  let component: FormRadioFieldComponent;
  let fixture: ComponentFixture<FormRadioFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRadioFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRadioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
