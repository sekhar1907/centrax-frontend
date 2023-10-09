import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPreferencesUcrComponent } from './system-preferences-ucr.component';

describe('SystemPreferencesUcrComponent', () => {
  let component: SystemPreferencesUcrComponent;
  let fixture: ComponentFixture<SystemPreferencesUcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPreferencesUcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPreferencesUcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
