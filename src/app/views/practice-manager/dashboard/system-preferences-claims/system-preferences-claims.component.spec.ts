import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPreferencesClaimsComponent } from './system-preferences-claims.component';

describe('SystemPreferencesClaimsComponent', () => {
  let component: SystemPreferencesClaimsComponent;
  let fixture: ComponentFixture<SystemPreferencesClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPreferencesClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPreferencesClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
