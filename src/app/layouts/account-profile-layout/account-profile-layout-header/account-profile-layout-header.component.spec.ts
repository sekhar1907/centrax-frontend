import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileLayoutHeaderComponent } from './account-profile-layout-header.component';

describe('AccountProfileLayoutHeaderComponent', () => {
  let component: AccountProfileLayoutHeaderComponent;
  let fixture: ComponentFixture<AccountProfileLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfileLayoutHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
