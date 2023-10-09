import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetLinkSentComponent } from './password-reset-link-sent.component';

describe('PasswordResetLinkSentComponent', () => {
  let component: PasswordResetLinkSentComponent;
  let fixture: ComponentFixture<PasswordResetLinkSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetLinkSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetLinkSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
