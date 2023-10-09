import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeaderInfoComponent } from './form-header-info.component';

describe('FormHeaderInfoComponent', () => {
  let component: FormHeaderInfoComponent;
  let fixture: ComponentFixture<FormHeaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHeaderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
