import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersoneComponent } from './contact-persone.component';

describe('ContactPersoneComponent', () => {
  let component: ContactPersoneComponent;
  let fixture: ComponentFixture<ContactPersoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPersoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPersoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
