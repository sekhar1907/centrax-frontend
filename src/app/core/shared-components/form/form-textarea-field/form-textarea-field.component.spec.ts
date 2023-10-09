import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextareaFieldComponent } from './form-textarea-field.component';

describe('FormTextareaFieldComponent', () => {
  let component: FormTextareaFieldComponent;
  let fixture: ComponentFixture<FormTextareaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTextareaFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
