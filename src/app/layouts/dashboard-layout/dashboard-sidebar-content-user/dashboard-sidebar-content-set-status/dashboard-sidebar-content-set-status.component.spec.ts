import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentSetStatusComponent } from './dashboard-sidebar-content-set-status.component';

describe('DashboardSidebarContentSetStatusComponent', () => {
  let component: DashboardSidebarContentSetStatusComponent;
  let fixture: ComponentFixture<DashboardSidebarContentSetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentSetStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentSetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
