import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInitialBoxComponent } from './form-initial-box.component';

describe('FormInitialBoxComponent', () => {
  let component: FormInitialBoxComponent;
  let fixture: ComponentFixture<FormInitialBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInitialBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInitialBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
