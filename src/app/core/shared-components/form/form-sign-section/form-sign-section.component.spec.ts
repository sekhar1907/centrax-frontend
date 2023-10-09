import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignSectionComponent } from './form-sign-section.component';

describe('FormSignSectionComponent', () => {
  let component: FormSignSectionComponent;
  let fixture: ComponentFixture<FormSignSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSignSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
