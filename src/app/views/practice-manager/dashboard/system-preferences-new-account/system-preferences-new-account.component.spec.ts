import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPreferencesNewAccountComponent } from './system-preferences-new-account.component';

describe('SystemPreferencesNewAccountComponent', () => {
  let component: SystemPreferencesNewAccountComponent;
  let fixture: ComponentFixture<SystemPreferencesNewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPreferencesNewAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPreferencesNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
