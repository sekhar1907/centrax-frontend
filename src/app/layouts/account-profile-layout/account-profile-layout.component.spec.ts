import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileLayoutComponent } from './account-profile-layout.component';

describe('AccountProfileLayoutComponent', () => {
  let component: AccountProfileLayoutComponent;
  let fixture: ComponentFixture<AccountProfileLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfileLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
