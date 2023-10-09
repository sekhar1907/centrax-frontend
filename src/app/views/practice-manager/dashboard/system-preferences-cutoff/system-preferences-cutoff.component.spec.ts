import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPreferencesCutoffComponent } from './system-preferences-cutoff.component';

describe('SystemPreferencesCutoffComponent', () => {
  let component: SystemPreferencesCutoffComponent;
  let fixture: ComponentFixture<SystemPreferencesCutoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPreferencesCutoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPreferencesCutoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
