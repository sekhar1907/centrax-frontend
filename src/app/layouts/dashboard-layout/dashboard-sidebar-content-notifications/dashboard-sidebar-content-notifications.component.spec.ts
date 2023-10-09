import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentNotificationsComponent } from './dashboard-sidebar-content-notifications.component';

describe('DashboardSidebarContentNotificationsComponent', () => {
  let component: DashboardSidebarContentNotificationsComponent;
  let fixture: ComponentFixture<DashboardSidebarContentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
