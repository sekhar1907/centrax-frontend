import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoveryEmailComponent } from './add-recovery-email.component';

describe('AddRecoveryEmailComponent', () => {
  let component: AddRecoveryEmailComponent;
  let fixture: ComponentFixture<AddRecoveryEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecoveryEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecoveryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
