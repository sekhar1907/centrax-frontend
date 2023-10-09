import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPasswordResetLinkComponent } from './verify-password-reset-link.component';

describe('VerifyPasswordResetLinkComponent', () => {
  let component: VerifyPasswordResetLinkComponent;
  let fixture: ComponentFixture<VerifyPasswordResetLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPasswordResetLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPasswordResetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
