import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingLinkComponent } from './onbording-link.component';

describe('OnbordingLinkComponent', () => {
  let component: OnbordingLinkComponent;
  let fixture: ComponentFixture<OnbordingLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnbordingLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnbordingLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
