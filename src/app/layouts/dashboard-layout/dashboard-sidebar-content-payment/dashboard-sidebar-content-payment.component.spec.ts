import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentPaymentComponent } from './dashboard-sidebar-content-payment.component';

describe('DashboardSidebarContentPaymentComponent', () => {
  let component: DashboardSidebarContentPaymentComponent;
  let fixture: ComponentFixture<DashboardSidebarContentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
