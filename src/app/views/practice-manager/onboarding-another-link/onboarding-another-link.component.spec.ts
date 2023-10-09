import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAnotherLinkComponent } from './onboarding-another-link.component';

describe('OnboardingAnotherLinkComponent', () => {
  let component: OnboardingAnotherLinkComponent;
  let fixture: ComponentFixture<OnboardingAnotherLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingAnotherLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingAnotherLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
