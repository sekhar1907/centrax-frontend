import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMaskedInputFieldComponent } from './form-masked-input-field.component';

describe('FormMaskedInputFieldComponent', () => {
  let component: FormMaskedInputFieldComponent;
  let fixture: ComponentFixture<FormMaskedInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMaskedInputFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMaskedInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
