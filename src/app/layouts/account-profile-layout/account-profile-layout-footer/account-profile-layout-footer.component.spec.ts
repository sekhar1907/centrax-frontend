import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileLayoutFooterComponent } from './account-profile-layout-footer.component';

describe('AccountProfileLayoutFooterComponent', () => {
  let component: AccountProfileLayoutFooterComponent;
  let fixture: ComponentFixture<AccountProfileLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfileLayoutFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
