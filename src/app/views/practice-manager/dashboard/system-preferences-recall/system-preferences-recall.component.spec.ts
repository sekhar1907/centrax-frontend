import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPreferencesRecallComponent } from './system-preferences-recall.component';

describe('SystemPreferencesRecallComponent', () => {
  let component: SystemPreferencesRecallComponent;
  let fixture: ComponentFixture<SystemPreferencesRecallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPreferencesRecallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPreferencesRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
