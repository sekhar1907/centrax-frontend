import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreationWelcomeComponent } from './profile-creation-welcome.component';

describe('ProfileCreationWelcomeComponent', () => {
  let component: ProfileCreationWelcomeComponent;
  let fixture: ComponentFixture<ProfileCreationWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreationWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCreationWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
