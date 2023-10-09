import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignatureComponent } from './form-signature.component';

describe('FormSignatureComponent', () => {
  let component: FormSignatureComponent;
  let fixture: ComponentFixture<FormSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
